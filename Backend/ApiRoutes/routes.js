const express = require('express');
const router = express.Router();
const multer = require('multer');

const { addAcountDetails, getallAccountDetails, updateAccountDetails, deleteAccountDetails, getallAccountByID } = require('../Controller/accountController');

// const { addImageDetails , getallImageDetails ,getallImageByID , updateImageDetails ,deleteImageDetails} = require('../Controller/imageController');

const { addImageDetails , getallImageDetails ,getallImageByID , updateImageDetails ,deleteImageDetails} = require('../Controller/ItemContoller');


const { addConfigarationDetails ,getProductConfigarationByProductID} = require('../Controller/congigarationControler');
const { addBookingDetails, getallBookingDetails } = require('../Controller/bookingController');


const upload = multer(); // Initialize multer for file uploads

//Image detail api post

router.post('/image/addImage', upload.single('image_data'), addImageDetails);
router.get('/image/getallImageDetails', getallImageDetails);
router.get('/image/getallImageByID/:id', getallImageByID);
router.put('/image/updateImageDetails/:id', updateImageDetails);
router.delete('/image/deleteImageDetails/:id', deleteImageDetails);

//Account detail api post
router.post('/account/addAcountDetails', addAcountDetails);
router.get('/account/getallAccountDetails', getallAccountDetails);
router.get('/account/get/:id', getallAccountByID);
router.put('/account/update/:id', updateAccountDetails);
router.delete('/account/delete/:id', deleteAccountDetails);

//Configaration
router.post('/configaration/addConfigarationDetails', addConfigarationDetails);
router.get('/configaration/getConfigDataByID/:id', getProductConfigarationByProductID);

router.post('/booking/addBooking',  addBookingDetails);
router.get('/booking/getAllBookings',  getallBookingDetails);


module.exports = router;