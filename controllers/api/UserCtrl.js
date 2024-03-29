const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = {
    create,
    login,
    checkToken,
    get,
    put,
    destroy,
    show,
};

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.status(200).json(req.exp);
}

async function get(req, res) {
    try {
        const query = User.find({}).populate()
        query.exec((err, foundUser) => {
            if (!err) {
                res.status(200).json(foundUser)
            } else {
                res.status(400).json({ message: error.message })
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}

async function put(req, res) {
    const { body } = req
    User.findByIdAndUpdate(req.params.id, body, { new: true }, (err, updatedUser) => {
        if (!err) {
            res.status(200).json(updatedUser)
        } else {
            res.status(400).json(err)
        }
    })
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.status(200).json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

// get new token route
async function refreshToken(req, res) {
    try {
        let user
        jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
            // If valid token, decoded will be the token's entire payload
            // If invalid token, err will be set
            user = err ? null : decoded.user;
            // If your app cares... (optional) 
            return next();
        });
        if (!user) throw new Error();
        const foundUser = await User.findOne({ email: user.email });
        res.status(200).json(createJWT(foundUser));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function create(req, res) {
    try {
        // Add the user to the db
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        // Yes, we can serialize a string
        res.status(200).json(token);
    } catch (e) {
        // Probably a dup email
        res.status(400).json({ msg: e.message });
    }
}

async function show(req, res) {

    try {
        User.findById(req.params.id, (err, foundUser) => {
            if (!err) {
                res.status(200).json({ message: "All Good!", foundUser })
            } else {
                res.status(400).json(err)
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}

async function destroy(req, res) {
    try {
        User.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json({ message: "User Deleted" })
            }
        })
    } catch (e) {
        res.status(400).json(e);
    }
}

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}