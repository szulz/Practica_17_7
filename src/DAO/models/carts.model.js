const mongoose = require('mongoose');

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    cart: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number
                }
            },
        ],
        default: []
    }
});

cartsSchema.pre('save', function (next) {
    this.populate('cart.product');
    next();
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

class CartsModels {
    async findById(id) {
        return await cartsModel.findById(id).populate('cart.product')
    }

    async addProduct(cartId, productId) {
        //AGREGA LOS PRODUCTOS PERO NO SUMA LA QUANTITY!!
        let existingCart = await this.findById(cartId)
        const existingProduct = existingCart.cart.find((item) => item.product == productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingCart.cart.push({ product: productId, quantity: 1 });
        }
        await existingCart.save();
        return existingCart
    }
}

module.exports = {
    CartsModels: CartsModels,
    cartsModel: cartsModel
}