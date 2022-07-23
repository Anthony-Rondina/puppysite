const mongoose = require("../config/database");
const { Schema, model } = mongoose;

const litterSchema = new Schema({
    name: String,
    father: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    mother: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
    puppies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Puppy" }],
    bio: String,
    SplashImg: String,
    imgs: [String],
    videos: [String],
})

const Litter = model("Litter", litterSchema);


module.exports = Litter;