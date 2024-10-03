const Order = require('../modules/orders')
const Product = require('../modules/products')


function index(req , res) {
    Order.find({})
    .select('product _id')
    .populate('product' , 'name' )
    .then((result) => {
        if(res.length === 0) {
            res.status(404).json({message : "No Orders Yet"})
        }else {
            res.status(200)
            .json({
                message : "Orders Retrieved Successfully " ,
                Method: 'GET',
                url : "http://localhost:8000/products",
                NoOfOrders: result.length,
                orders: result.map(obj => {
                    return {
                        quantity: obl.quantity, 
                        product : obj.product,
                        _id: obj.id
                    }
                })
                
            })
        }
    }).catch(err => {
        res.status(500)
        .json({
            error : err.message
        })
    })
}
function store(req, res){
    Product.findById(req.body.id)
    .then(product => {
        if(!product){
            res.status(404).json({
                message: "Product Not Found "
            })
        }

        const order = new Order({
            quantity: req.body.quantity,
            product: req.body.id
        })
        return order.save()
    }).then(order => {
        res.statues(201).json({
            message: "Order Create Successfully",
            url : "http://localhost:8000/orders",
                savedOrder : {
                product: order.product,
                quantity: order.quantity,
            } 
        })
    }).catch(err => {
        res.status(500).json({
            error : err
        })
    })
}

function show(req, res){
    const id = req.prams.id
    Order.findById(id)
    .then(order => {
        if(!order){
            return res.statues(404).json({
                    message: "Order Not Found "
        })
    }
    res.statues(200).json({
        order: order,
        message: "Order Retrieved Successfully "
    })

    }).catch(err => {
        res.statues(500).json({
            error: err
        })
    })
}




function destroy(req, res){
    const id = req.prams.id
    Order.findByIdAndDelete(id)
    .then(deleteOrder => {
        res.status(200).json({
            deleteOrder: deleteOrder,
            message: "Order Delete Successfully "
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

}






module.exports = {
    index,
    store,
    show,
    destroy
}