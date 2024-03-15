const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const htmlSchema = Schema({
    title: {
        type: String,
        required: true
    },
    subtext: {
        type: String,
    },
    code: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["draft", "scheduled", "published"],
    },
    uid: {
        type: String,
    },
    
    isPublished: {
        type: String,
        default: false
    },
    
    createdBy: {
        type: String,

    },
    createdAt: {
        type: Date,
    },
    modifiedBy: {
        type: String,
    },
    modifiedAt: {
        type: Date
    },
    file: {
        type: String
    },
    publishDate: {
        type: String,
    },
    publishTime: {
        type: String
    }
},
    { timestamps: true })


module.exports = mongoose.model('Html', htmlSchema);