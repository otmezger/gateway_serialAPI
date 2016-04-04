var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dataPointSchema = new Schema({
    value: {
        type: Number
    },
    timestamp: {type: Date},
    sensorID: {type: String},
    parseSync: {type: Boolean, default:false},
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('DataPoint', dataPointSchema);
