const express = require('express');
const CartsController = require('../controllers/carts.controller.js');
const cartsController = new CartsController
const CartManagerMongoose = require('../services/carts.service.js');
const cartManagerMongoose = new CartManagerMongoose
const cartsRouter = express.Router();

//LOCALHOST8080/CARTS/ ->>>>

cartsRouter.get('/:cid', cartsController.userCart)

cartsRouter.post('/products/:pid', cartsController.addProduct);


// elimino del carrito el prod seleccionado (tambien le agregue que si tiene cantidad > 1 decremente hasta eliminar el prod)
cartsRouter.delete('/products/:pid', async (req, res) => {
    try {
        let response = await cartManagerMongoose.deleteProdById(req.params.cid, req.params.pid);
        if (response) {
            return res.status(200).send({ msg: 'The desired product quantity has been decreased by 1', data: response })
        };
        res.status(200).send({ data: 'the product has been removed from the cart successfully!' });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})




module.exports = cartsRouter