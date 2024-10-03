// get Module
const Product = require('../modules/products')
// Get All products
function index(req, res) {
        Product.find({})
    // .select('name _id')
        .then(product => {
            if(product.length === 0) {
                res.status(404).json({
                    message: 'No products Yet',
                    method: "GET",
                    statusCode: "404",
                })
            }else{
                res.status(200).json({
                    message: "Product Retrieved  Successfully", 
                    statusCode: "200",
                    url: "http://localhost:8000/products",
                    NoOfProduct: product.length,
                    product: product
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
}
// Add Create New Product
function store(req, res){
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        vendor: req.body.vendor
    })
    product.save()
    .then(product => {
        res.status(200).json({
            message : "Product saved successfully",
            method : 'POST',
            url : "http://localhost:5000/products",
            createdProduct : product
        })
    }).catch(err => {
        res.status(500).json({
            message : err.message
        })
    })
}
// Get Single Product
function show(req, res){
    const id = req.params.id
    Product.findById(id)
    .then(product => {
        if(product){
            res.status(200).json({
                message : "Product Retrieved Successfully" , 
                product : product
            })
        }
    }).catch(err=> {
        res.status(500).json({
            error : err.message
        })
    })
}

// Update One Product => PATCH
function update(req , res) {
    const id = req.params.id
    Product.findByIdAndUpdate(id , {$set : req.body})
    .then(product => {
        if(product) {
            res.status(200).json({
                message : "Product Updated Successfully" , 
                product : product
            })
        }else{
            res.status(404).json({message : "Product Not Found"})
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        })
    })
    // const id = req.params.id
    // const product = Product.findById(id)
    // if(req.body.name != null) {
    //     product.name = req.body.name
    // }
    // if(req.body.price != null) {
    //     product.price = req.body.price   
    // }
    // if(req.body.vendor != null) {
    //     product.vendor = req.body.vendor   
    // }
    // product.save().then((product) => {
    //     res.status(200).json({
    //         product : product
    //     })
    // }).catch(err => {
    //     res.json({
    //         error : err
    //     })
    // })
}
// Replace => PUT
function replace(req , res) {
    const id = req.params.id
    const product = Product.findById(id)
    product.name = req.body.name
    product.price = req.body.price
    product.vendor = req.body.vendor

    product.save().then((product) => {
        res.status(200).json({
            product : product
        })
    }).catch(err => {
        res.json({
            error : err
        })
    })
}
// Delete Product
function destroy(req , res) {
    const id = req.params.id
    Product.findByIdAndDelete(id)
    .then((product) => {
        if(product) {
            res.status(200).json({
                message : "Product Deleted Successfully" , 
                deletedProduct : product
            })
        }else{
            res.status(404).json({
                message : "Error 404 Product Not Found"
            })
        }
    }).catch(err => {
        res.status(500)
        .json({
            error : err
        })
    })
}


module.exports = {
    index,
    store,
    show,
    update,
    destroy,
    replace

}