const { ProductModels } = require("../DAO/models/product.model.js");
const productModels = new ProductModels
const { productModel } = require("../DAO/models/product.model");
const ProductService = require("../services/product.service.js");
const productService = new ProductService


class ProductController {

    async createOne(req, res) {
        let newProd = await productModels.createProduct(req.body);
        return res.status(200).send({
            status: 'Product successfully added!',
            msg: `The following product has been added to the list:`,
            data: newProd
        });

    }

    async getAll(req, res) {
        let allProducts = await productService.getAll(req.query, req.originalUrl);
        return res.status(200).json({
            status: 'Success!',
            data: allProducts,
        })

    }

    async modifyProperties(req, res) {
        //cree algunas de las funciones directamente en el modelo ya que no veia necesario usar el service 
        //para llamar unicamente a una funcion que directamente lo puedo hacer acá
        let updatedProduct = await productModels.updateProduct(req.params.id, req.body);
        return res.status(200).send({
            status: 'Product successfully updated!',
            msg: `The following product has been updated:`,
            data: updatedProduct
        });

    }

    async deleteById(req, res) {
        await productModels.deleteProduct(req.params.id)
        return res.status(200).send({
            status: 'Product successfully deleted!',
        });
    }

}

module.exports = ProductController