const mongoose = require("mongoose");
const {data:sampleListings} =require("./data1.js");
const Listing=require("../models/listing.js");
const URL_MONGOOSE="mongodb://127.0.0.1:27017/tourism";

async function main(){
    await mongoose.connect(URL_MONGOOSE);
};



main()
  .then(async () => {
    await Listing.deleteMany({});
    console.log("🗑 Old listings deleted");
    const modifiedListings = sampleListings.map((obj) => ({
  ...obj,
  owner: "68b3ba26883af3720da144bb"
}));

await Listing.insertMany(modifiedListings);

    console.log("New listings inserted");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });