const Image = require('../Models/ItemModel');
const multer = require('multer');
const upload = multer(); // Initialize multer for file uploads

const addImageDetails = (req, res) => {
    // Extract form fields from the request
    const { ItemName } = req.body;

    // Extract the image file data from the multer upload
    const image_data = req.file.buffer;

    // Create a new instance of the Image model
    const newData = new Image({ ItemName, image_data });

    // Save the image data to the database with a callback
    newData.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "Error adding data",
            });
        }

        // If saved successfully, send the response with the document ID
        return res.status(200).json({
            error: false,
            message: "Data added",
            status: '2100',
            data: {
                id: result._id,
            },
        });
    });
};


const fs = require('fs');
const path = require('path');

// Function to convert binary data to Base64
function bufferToBase64(buffer) {
    return buffer.toString('base64');
}

// get all Image details
const getallImageDetails = async (req, res) => {
    try {
        const ImageData = await Image.find().sort({ "createdAt": -1 });

        // Convert binary image_data to Base64
        const imageDetails = ImageData.map((image) => ({
            ...image.toObject(),
            image_data: bufferToBase64(image.image_data)
        }));

        return res.status(200).send({
            data: imageDetails,
            status: 2100
        });
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
}


//get all Image details
const getallImageByID = async (req, res) => {
    try {
        const id = req.params.id;

        const ImageData = await Image.find({product_id:id});
        // Convert binary image_data to Base64
        const imageDetails = ImageData.map((image) => ({
            ...image.toObject(),
            image_data: bufferToBase64(image.image_data)
        }));

        return res.status(200).send({
            data: imageDetails,
            status: 2100
        });
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
}

//update details
const updateImageDetails = async (req, res) => {
    try {


        const id = req.params.id;
        Image.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!"
            });

        })

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//delete Image
const deleteImageDetails = async (req, res) => {
    try {

        Image.findByIdAndRemove(req.params.id).exec((err, deletedImage) => {


            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedImage
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedImage
            });
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        })

    }

};



module.exports = {
    addImageDetails,
    getallImageDetails,
    updateImageDetails,
    deleteImageDetails,
    getallImageByID
}