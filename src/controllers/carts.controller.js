const CartService = require("../services/carts.service.js");
const cartService = new CartService
const CartManagerMongoose = require("../services/carts.service.js");
const cartManagerMongoose = new CartManagerMongoose
CartService

class CartsController {

    async userCart(req, res) {
        const products = await cartService.userCart(req.params.cid)
        return res.render("carts", { products })
    }

    async addProduct(req, res) {
        let cartData = await cartService.addToCart(req.session.user.cart[0], req.params.pid);
        return res.status(200).send({
            status: 'success',
            msg: `A new product has been added to the cart with the id ${req.session.user.cart[0]}`,
            data: cartData._id
        });
    }

    async deleteProduct (req, res) {
        try {
            let response = await cartService.deleteProduct(req.params.cid, req.params.pid);
            if (response) {
                return res.status(200).send({ msg: 'The desired product quantity has been decreased by 1', data: response })
            };
            res.status(200).send({ data: 'the product has been removed from the cart successfully!' });
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }
}

module.exports = CartsController