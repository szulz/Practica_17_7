const express = require('express');
const CartsController = require('../controllers/carts.controller.js');
const cartsController = new CartsController
const CartManagerMongoose = require('../services/carts.service.js');
const cartManagerMongoose = new CartManagerMongoose
const cartsRouter = express.Router();

//LOCALHOST8080/CARTS/ ->>>>

//busco el carro x id
cartsRouter.get('/:cid', cartsController.userCart)

//agrego prod al carro
cartsRouter.post('/products/:pid', cartsController.addProduct);

//agregar boton para eliminar prod / decrementar la quantity
cartsRouter.delete('/:cid/products/:pid', cartsController.deleteProduct)

module.exports = cartsRouter