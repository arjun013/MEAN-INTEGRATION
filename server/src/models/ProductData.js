const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://arjunps:arjunps@arjcluster.brhfz.mongodb.net/PRODUCTS?retryWrites=true&w=majority`);

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
	productId:Number,
	productName:String,
	productCode:String,
	releaseDate:String,
	description:String,
	price:Number,
	starRating:Number,
	imageUrl:String
})
const ProductData = mongoose.model('productsData',ProductSchema)
module.exports = ProductData;
