const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 99999999 },
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

class prodModel {
    async getAll() {
        return productModel.find
    }
}
// tengo que exportar la calse para usarla en el service***********


module.exports = productModel