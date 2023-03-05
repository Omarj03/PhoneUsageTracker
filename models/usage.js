const { Number } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MAX_INT = 1440;




var usageSchemaful = new Schema({
        name: {
        type: String,
        required: true,
    },
    educationUsage: {
        type: Number,
        min: 0,
        max: MAX_INT,
        required: true
    },
    shoppingUsage: {
        type: Number,
        min: 0,
        max: MAX_INT,
        required: true
    },
    browsingUsage: {
        type: Number,
        min: 0,
        max: MAX_INT,
        required: true
    },
    socialMediaUsage: {
        type: Number,
        min: 0,
        max: MAX_INT,
        required: true
    }

},
     {
        timestamps: true
    });
var usages = mongoose.model('usage', usageSchemaful); //initialize a model with a scheme you created. schema gives the layout while the model provides the functions for interacting the database

module.exports = usages;