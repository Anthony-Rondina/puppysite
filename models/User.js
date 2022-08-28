const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        // unique: true,
        trim: true,
        lowercase: true,
        required: false

    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: false,
        unique: false,

    },
    firstName: {
        type: String,
        required: false,
        minLength: 1,
        unique: false,

    },
    lastName: {
        type: String,
        required: false,
        minLength: 1,
        unique: false,

    },
    phoneNumber: {
        type: String,
        required: false,
        minLength: 1,
        unique: false,

    },
    admin: {
        type: Boolean
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function (next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

module.exports = mongoose.model('User', userSchema);