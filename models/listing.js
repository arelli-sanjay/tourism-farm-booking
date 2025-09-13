const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");


const listingschema = new Schema({
    title:{
        type:String,
       
    },
    description:String,
     image: {
    filename: String,
    url:String,
     
  },

    price:Number,
     location:String,
     country:String,
     reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
     }],
     owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
     },
    //  category:{
    //   type:String,
    //   enum:["mountains"]
    //  }
});


listingschema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
});

const Listing=mongoose.model("Listing",listingschema);
module.exports = Listing;