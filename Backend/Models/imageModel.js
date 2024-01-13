const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    image_name: {
        type: String,
        required: true,
      },
      image_data: {
        type: Buffer, // Store image data as a binary buffer
        required: true,
      },
      product_id: {
        type: String,
        required: true,
      },


},{timestamps:true});


const images = mongoose.model('images',imageSchema);

module.exports = images;