////////////STORE SCHEMA/////////////


const mongoose = require('mongoose');

const floatSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    description:  { type: String, required: true },
    image:  { type: String, required: true },
    price:  { type: Number, required: true },
    quanity:  { type: Number, required: true },

});

const Float = mongoose.model('float', floatSchema);

module.exports = Float;
