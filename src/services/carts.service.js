
const { CartsModels } = require("../DAO/models/carts.model.js");
const cartsModels = new CartsModels
const { cartsModel } = require("../DAO/models/carts.model.js");
const productModel = require("../DAO/models/product.model");

class CartService {
    async userCart(id) {
        let cartCountent = await cartsModels.findById(id)
        let products = cartCountent.cart.map((cart) => {
            return { title: cart.product.title, description: cart.product.description, price: cart.product.price, quantity: cart.quantity }
        })
        return products
    }

    async createCart() {
        try {
            let newcart = new cartsModel();
            return newcart.save();
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async getAll() {
        let allCarts = await cartsModel.find()
        return allCarts
    }

    async addToCart(cartId, productId) {
        try {
            let cart = await cartsModels.addProduct(cartId, productId)
            return cart;
        } catch (e) {
            throw new Error('error en addtocart')
        }
    }

    async getById(id) {
        //
        let contenido = await cartsModels.findById(id)
        return contenido;
    }

    async deleteProdById(cartId, productId) {
        try {
            let targetCart = await cartsModel.findById(cartId)
            const targetProduct = targetCart.cart.find((item) => item.product == productId);
            if (targetProduct.quantity > 1) {
                targetProduct.quantity -= 1
                return await targetCart.save();
            }
            await targetCart.cart.pull({ product: targetProduct.product })
            await targetCart.save()
            return
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async deleteCartProducts(cartId) {
        let cartToEmpty = await cartsModel.findById(cartId);
        cartToEmpty.cart = []
        await cartToEmpty.save()
        return
    }

    async updateCart(cartId, newProducts, newQuantity) {
        if (!newQuantity) {
            newQuantity = 1
        }
        let update = { product: newProducts, quantity: newQuantity }
        let targetCart = await cartsModel.findByIdAndUpdate(cartId, { cart: update }, { new: true })
        return await targetCart.save()
    }

    async updateProductQuantity(cartId, productId, quantity) {
        let targetCart = await cartsModel.findById(cartId);
        let targetProduct = targetCart.cart.find((item) => item.product == productId)
        targetProduct.quantity = JSON.parse(quantity)
        if (targetProduct.quantity === 0) {
            throw new Error('please type a number greater than 0')
        }
        return await targetCart.save()
    }
}



module.exports = CartService;