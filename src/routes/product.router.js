const express = require('express');
const productsRouter = express.Router();
const {cartsModel} = require("../DAO/models/carts.model.js");
const ProductManagerMongoose = require("../services/product.service.js");
const productManagerMongoose = new ProductManagerMongoose;

//LIMIT O GET ALL
productsRouter.get('/', async (req, res) => {
    try {
        let allProducts = await productManagerMongoose.getAll(req.query, req.originalUrl);
        res.status(200).json({
            data: allProducts,
        })
    } catch (e) {
        res.status(400).json({
            msg: e.message
        })
    }
});

//by ID
productsRouter.get('/:id', async (req, res) => {
    try {
        let product = await productManagerMongoose.getById(req.params.id);
        res.status(200).json({
            status: "SUCCESS",
            msg: `Product found with the matching id ${req.params.id}.`,
            data: product
        });
    } catch (e) {
        res.status(400).json({ msg: 'something went wrong' })
    }
});

//CREA PROD Y CHECKEAR POR PROPS
productsRouter.post('/', async (req, res) => {
    try {
        let newProd = await productManagerMongoose.createProduct(req.body);
        return res.send({
            status: 'Product successfully added!',
            msg: `The following product has been added to the list:`,
            data: newProd
        });
    } catch (e) {
        res.status(400).json({ msg: 'something went wrong' })
    }
});

//MODIFICAR PROPS
productsRouter.put('/:id', async (req, res) => {
    try {
        let updatedProduct = await productManagerMongoose.updateProduct(req.params.id, req.body);
        return res.send({
            status: 'Product successfully updated!',
            msg: `The following product has been updated:`,
            data: updatedProduct
        });
    } catch (e) {
        res.status(400).send({ msg: e.message })
    }
});

//BORRO POR ID
productsRouter.delete('/:id', async (req, res) => {
    try {
        await productManagerMongoose.deleteProduct(req.params.id)
        return res.status(200).send({
            status: 'Product successfully deleted!',
        });
    } catch (error) {
        res.status(404).send(error.message)
    }
});


module.exports = productsRouter;