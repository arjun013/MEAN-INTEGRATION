const express = require('express');
const mongoose = require('mongoose');
const ProductData = require('../models/ProductData');
const jwt = require('jsonwebtoken');

const addProductRouter = new express.Router();

//for jwt verification

function verifyToken(req,res,next){
	if (!req.headers.authorization) {
		return res.status(401).json('Unauthorized request');
	}
	const token = req.headers.authorization.split(' ')[1];
	if (token==='null') {
		return res.status(401).json('Unauthorized request');
	}
	const payload = jwt.verify(token,'thirteen');
	if (!payload) {
		return res.status(401).json('Unauthorized request');
	}
	req.userId = payload.subject;
	next();
}

//get all the products
addProductRouter.get('/',(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	ProductData.find()
	.then( (products) => res.json(products))
	.catch( (err) => console.log("Error :"+err))
})

//add new product to db
addProductRouter.get('/loadAdd',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	res.send("correctly logged in")
})

addProductRouter.post('/add',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
		const { productId,productName,productCode,releaseDate,
				description,price,starRating,imageUrl } = req.body.product;
		const requestItem = {
			productId,
			productName,
			productCode,
			releaseDate,
			description,
			price,
			starRating,
			imageUrl
		}
		const product = ProductData(requestItem);
		product.save();
		console.log('Added Successfully');
		res.json(product);
})

//retrieve the correct product details on request to update

addProductRouter.get('/edit/:id',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const id = req.params.id;
	ProductData.findOne({ _id : id})
	.then( (product) => res.json(product))
	.catch( (err) => console.log("Error :"+err))
})

//update a product on db

addProductRouter.post('/update',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*"); 
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
		const productUpdated = req.body.product;
		const id = req.body.selectId;		
		ProductData.findOneAndUpdate( { _id : id },productUpdated,(err,result) =>{
					if(err){
						console.log(err)
					}else{
						console.log('updated '+productUpdated.productName)
					}
				})
		res.json(productUpdated);
})

//delete a product from db

addProductRouter.get('/delete/:id',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const id = req.params.id;
	ProductData.findOneAndDelete({ _id : id})
	.then( (product) => {
		res.json(product);
		console.log('deleted '+product.productName)
	})
	.catch( (err) => console.log("Error :"+err))
})



module.exports = addProductRouter;