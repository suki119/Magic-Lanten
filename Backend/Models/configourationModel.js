const mongoose = require('mongoose');

const congigSchema = new mongoose.Schema({

    gender: {
        type: String,
        required: true,
      },
      language: {
        type: String, // Store image data as a binary buffer
        required: true,
      },
      commandSpeed: {
        type: Number,
        required: true,
      },
      product_id: {
        type: String,
        required: true,
      },
      openApiKey: {
        type: String,
        required: true,
      },


},{timestamps:true});


const configaration = mongoose.model('configaration',congigSchema);

module.exports = configaration;