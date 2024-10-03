// const mongoose = require('mongoose'),
//         { Schema } = mongoose

// const schemaUser = new Schema({
//         userName: { type: String, required: true },
//         password: { type: String, required: true },
//         email: { type: String, required: true }
// })


// module.exports = mongoose.model('User', schemaUser)

const mongoose = require('mongoose'),
        { Schema } = mongoose


const userSchema = new Schema({
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true }
}, {
        timestamp: true
})

module.exports = mongoose.model('User', userSchema)