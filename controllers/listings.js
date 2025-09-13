const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
  const listings = await Listing.find({});
  res.render("./listings/index.ejs", {listings});
};


module.exports.renderNewForm=(req,res)=>{
  res.render("./listings/new.ejs");
};

module.exports.showListing=(async(req,res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id).populate({path:"reviews",populate:{
    path:"author",},}).populate("owner");
    if (!listing) {
       req.flash("error","listing you are requested for does not exist!");
     return  res.redirect("/listings");
  }
  res.render("./listings/show.ejs", {listing});
});

module.exports.createListing=async(req,res)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  req.flash("success","successfully listing created!");
  res.redirect("/listings");
  
};

module.exports.renderEditForm=async(req,res)=>{
   const {id} = req.params;
  const listing = await Listing.findById(id);
  req.flash("success","successfully  listing editted!");
    if (!listing) {
     req.flash("error","listing you are requested for does not exist!");
   return res.redirect("/listings");
  }
  let originalImageUrl=listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_300");
  res.render("./listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing=async(req,res)=>{
   const {id} = req.params;
   const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
   if(typeof req.file !=="undefined"){
        let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();
   }
  
   req.flash("success","successfully listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
   const {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","successfully  listing deleted!");
  res.redirect("/listings");
};