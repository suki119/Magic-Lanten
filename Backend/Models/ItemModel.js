const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    ItemName: {
        type: String,
        required: true,
        trim: true
    },
    image_data: {
        type: Buffer, // Store image data as a binary buffer
        required: true,
    },


}, { timestamps: true });


const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;