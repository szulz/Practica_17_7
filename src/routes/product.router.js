const express = require('express');
const ProductController = require('../controllers/product.controller.js');
const productController = new ProductController
const productsRouter = express.Router();

//MODIFICAR / ORGANIZAR UN POCO MAS***********
productsRouter.get('/', productController.getAll);

//CREA PROD Y CHECKEAR POR PROPS
productsRouter.post('/', productController.createOne);

//MODIFICAR PROPS -- crear boton para modificar
productsRouter.put('/:id', productController.modifyProperties);

//BORRO POR ID
productsRouter.delete('/:id', productController.deleteById);


module.exports = productsRouter;