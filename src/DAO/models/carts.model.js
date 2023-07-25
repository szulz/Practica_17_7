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
    async create() {
        let newcart = new cartsModel();
        return newcart.save();
    }

    async findById(id) {
        return await cartsModel.findById(id).populate('cart.product')
    }

    async addProduct(cartId, productId) {
        let existingCart = await this.findById(cartId)
        const existingProduct = existingCart.cart.find((item) => item.product._id == productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingCart.cart.push({ product: productId, quantity: 1 });
        }
        await existingCart.save();
        return existingCart
    }

    async deleteById(cartId, productId) {
        let targetCart = await this.findById(cartId)
        const targetProduct = targetCart.cart.find((item) => item.product._id == productId);
        console.log(targetProduct);
        if (targetProduct.quantity > 1) {
            targetProduct.quantity -= 1
        } else {
            await targetCart.cart.pull({ product: targetProduct.product._id })
        }
        await targetCart.save();
        return targetCart
    }

}

module.exports = {
    CartsModels: CartsModels,
    cartsModel: cartsModel
}