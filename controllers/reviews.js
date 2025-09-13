const Listing=require("../models/listing.js");
const Review=require("../models/review.js");


module.exports.createReview=async(req,res)=>{
  let listing=await Listing.findById(req.params.id);
  let newReview=  new Review(req.body.reviews);
  newReview.author=req.user._id;
  await newReview.save();
  req.flash("success","successfully review created!");
  listing.reviews.push(newReview._id);
  

 await listing.save();
 res.redirect(`/listings/${listing._id}`);
 
};

module.exports.destroyReview=async(req,res)=>{
  let {id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Listing.findByIdAndDelete(reviewId);
  req.flash("success","successfully review deleted!");
  res.redirect(`/listings/${id}`);
};