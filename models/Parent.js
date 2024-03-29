const mongoose = require("../config/database");
const { Schema, model } = mongoose;

const parentSchema = new Schema({
    name: String,
    litters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Litter" }],
    bio: String,
    splashImg: String,
    imgs: [String],
    videos: [String],
    retired: Boolean,
    gender: Boolean
})

const Parent = model("Parent", parentSchema);


module.exports = Parent;