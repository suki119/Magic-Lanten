const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    HolderName :{
        type: String,
        required : true,
        trim:true
    },
    HolPhonenumber :{
        type: String,
        required : true,
        trim:true
    },
    CompanyName: {
        type: String,
        required : true,
        trim:true
    },
    CompanyEmailAddress: {
        type: String,
        required : true,
        trim:true
    },
    CompanyPhonenumber: {
        type: String,
        required : true,
        trim:true
    },
    CompanyAddress: {
        type: String,
        required : true,
        trim:true
    },
    country: {
        type: String,
        required : false,
        trim:true
    },
   

},{timestamps:true});


const Account = mongoose.model('Account',accountSchema);

module.exports = Account;