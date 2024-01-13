const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'colouration',
    api_key:'696678496244496',
    api_secret: 'ALsw_kLG8pn4m53p8ARTat6lcas',
    secure: true
});

module.exports = cloudinary;