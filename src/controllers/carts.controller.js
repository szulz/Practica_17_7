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
        res.status(200).send({
            status: 'success',
            msg: `A new product has been added to the cart with the id ${req.session.user.cart[0]}`,
            data: cartData._id
        });

    }
}

module.exports = CartsController