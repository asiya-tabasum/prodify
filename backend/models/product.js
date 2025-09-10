const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, requires:true},
    category: {type:String, requires:true},
    description: {type:String},
    imageUrl: {type:String},
    imagePublicId: {type:String},
},{timestamps: true});

module.exports=mongoose.model("Product",productSchema)