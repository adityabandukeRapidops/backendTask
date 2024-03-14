const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const htmlSchema = Schema({

    code : {
        type : String,
        required : true
    },
    endPoint : {
        type : String,
        required : true
    },
    uid : {
        type : String,
        required : true
    },
    image : {
        type : String,

    },
    isPublished : {
        type : String,
        default : false
    },
    date : {
        type : Date
    },
    time : {
        type : String
    }
},
{timestamps : true})


module.exports = mongoose.model('Html', htmlSchema);