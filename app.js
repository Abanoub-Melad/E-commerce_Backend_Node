const express = require('express'),
    app = express(),

    mongoose = require('mongoose');


    const cors = require('cors')
    const cookieParser = require('cookie-parser')

// Database Connection 
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connect Success', mongoose.connection.host))
    .catch(err => console.error(err))

// const conn = mongoose.connection
// conn.once('open' , () => console.log('Connection Success'))
// conn.on('error' , () => console.error('connection failed'))

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Start Middleware
/**
 // middleware (action between request , response)
 * request ==> middleware  ==> controller
 */
// Middleware
app.use('/products', require('./routes/products'))
app.use('/orders', require('./routes/orders'))
app.use('/auth' , require('./routes/auth'));
app.use('/users', require('./routes/user'))

app.use((req, res, next) => {
    const error = new Error('Something Wrong....Request URL Not Found ')
    error.status = 404
    next(error)
})  
app.use((error, req, res) => {
    res.status(error.status || 500).json({
        statusCode: error.status,
        message: error.message
    })
})
// End Middleware

module.exports = app;