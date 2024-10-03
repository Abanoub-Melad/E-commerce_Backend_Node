const User = require('../modules/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



async function register(req, res) {

    const { first_name, last_name, password, email } = req.body
    if (!first_name || !last_name || !password || !email) {
        return res.status(400).json({
            message: 'All  fields are required'
        })
    }

    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
        return res.status(401).json({
            message: 'User already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        first_name,
        last_name,
        password: hashedPassword,
        email
    })

    // await user.save()

    const accessToken = jwt.sign(
        {
            UserInfo: {
                id: user._id,
            },
            // },process.env.ACCESS_TOKEN_SECRET_KEY,  {expiresIn : 15s}
        }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_TIME })

    const refreshToken = jwt.sign(
        {
            UserInfo: {
                id: user._id,
            }
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_ACCESS_TOKEN_TIME }
    )


    res.cookie('jwt', refreshToken, {
        httpOnly: true,    //accessible only by web server
        secure: true, // https
        sameSite: 'None', //(domain & subdomain) Only
        // sameSite: 'strict', //domain
        // maxAge:  7 * 24 * 60 * 60 * 1000,
        maxAge: process.env.MAX_AGE_DAY,
    })

    res.json({
        accessToken,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
    });

}

async function login(req, res) {

    const { password, email } = req.body
    if (!password || !email) {
        return res.status(400).json({
            message: 'All  fields are required'
        })
    }

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
        return res.status(401).json({
            message: 'User does not exist'
        })
    }

    const match = await bcrypt.compare(password, foundUser.password)  //return(true || false)
    if (!match) return res.status(401).json({ message: 'Wrong Password' })


    const accessToken = jwt.sign(
        {
            UserInfo: {
                id: foundUser._id,
            },
            // },process.env.ACCESS_TOKEN_SECRET_KEY,  {expiresIn : 15s}
        }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_TIME })

    const refreshToken = jwt.sign(
        {
            UserInfo: {
                id: foundUser._id,
            }
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_ACCESS_TOKEN_TIME }
    )


    res.cookie('jwt', refreshToken, {
        httpOnly: true,    //accessible only by web server
        secure: true, // https
        sameSite: 'None', //domain & subdomain
        // sameSite: 'strict', //domain
        // maxAge:  7 * 24 * 60 * 60 * 1000,
        maxAge: process.env.MAX_AGE_DAY,
    })

    res.json({
        accessToken,
        email: foundUser.email,
        message: "Successfully logged in"
    });

}
function refreshToken(req, res) {
    const cookies = req.cookie
    if (!cookies?.jwt) return res.status(401).jason({ message: "Unauthorized" })

    const refreshToken = cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            const foundUser = await User.findById(decoded.UserInfo.id).exec();
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: foundUser._id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 10 }
            );
            res.json({ accessToken });
        }
    );
};


function logout(req, res) {
    const cookie = req.cookies;

    if (!cookie?.jwt) {
        return res.status(204).json({
            message: " No Content "
        })  //no content
    }

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    })
}
module.exports = {
    register,
    login,
    logout,
    refreshToken,


}