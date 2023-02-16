const mongoose = require('mongoose');

const coupanSchema = new mongoose.Schema({
    name : {
        type : String,
        reuired : true
    },

    code: {
        type: String,
        required: true
    },
    expire_date: {
        type : Date,
        required : true
    },
    discount_percent : {
        type : Number,
        required : true
    },
    start_date : {
        type : Date,
        required : true
    },
    max_amount : {
        type : Number,
        reuired : true,
    }
})

module.exports = mongoose.model("Coupan", coupanSchema);