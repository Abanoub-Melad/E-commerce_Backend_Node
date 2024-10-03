const mongoose = require('mongoose'),
    {Schema} = mongoose

    const OrderSchema = new Schema({
        quantity: {type: Number,   default: 1},
        product: {type : mongoose.Schema.ObjectId, 
            ref: 'Product', required: true}
    })

    module.exports = mongoose.model('Order', OrderSchema)

    // ref: 'Product' ===> model
    // type : mongoose.Schema.ObjectId, ===> object in product 