const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    memberId: mongoose.Types.ObjectId,
    productName: String,
    productDesc: String,
    productPrice: Number,
    productImage: String
}, {
    timestamps: true,
    versionKey: false
})

const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel