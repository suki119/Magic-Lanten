const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

    bookingName: {
        type: String,
        required: true,
        trim: true
    },
    bookingDate: {
        type: String,
        required: true,
        trim: true
    },
    itemList: [{
        label: {
            type: String,
            required: true,
            trim: true
        },
        value: {
            type: String,
            required: true,
            trim: true
        }
    }],



}, { timestamps: true });


const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;