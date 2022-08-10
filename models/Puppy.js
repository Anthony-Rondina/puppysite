const mongoose = require("../config/database");
const { Schema, model } = mongoose;

const puppySchema = new Schema({
    name: String,
    collar: String,
    price: Number,
    sold: Boolean,
    gender: Boolean,
    father: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    mother: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    litter: { type: mongoose.Schema.Types.ObjectId, ref: "Litter" },
    bio: String,
    splashImg: String,
    imgs: [String],
    importantInfo: [String],
    videos: [String],
})

const Puppy = model("Puppy", puppySchema);


module.exports = Puppy;