const User = require('../modules/users')

async function indexUsers(req, res) {
    const users = await User.find().select('-password').lean();
    if(users.length === 0) {
        return res.status(400).json({message: 'No Users found'})
    }
    
    res.status(200).json({
        statusCode: 200,
        noOfUsers: users.length,
        message: "Successfully All Users ",
        users,
    })
}


module.exports = {
    indexUsers
}

