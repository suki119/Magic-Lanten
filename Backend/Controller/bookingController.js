const Booking = require('../Models/BookingModel');



//adding Booking details
const addBookingDetails = async (req,res) => {
    
    let newData = new Booking(req.body);

    const data = req.body

    try{

        newData.save((err)=>{
            if(err){
                return res.status(400).json({
                    message:err
                });
            }
            return res.status(200).json({
                status:'2100',
                message:"data added succsesfull",
               
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}


//get all acount details
const getallBookingDetails =  async (req,res) => {
    try{
        const BookingData = await Booking.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:BookingData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err,
            
        })

    }
}


//get all acount details
const getallBookingByID =  async (req,res) => {
    try{
        const id = req.params.id;
        const BookingData = await Booking.findById(id);
        return res.status(200).send({
            data:BookingData
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//update details
const updateBookingDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        Booking.findByIdAndUpdate(id,{
            $set : req.body
        },(err) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!"
            });

        })
       
    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//delete Booking
const deleteBookingDetails = async (req, res) => {
    try{

        Booking.findByIdAndRemove(req.params.id).exec((err, deletedBooking) => {

      
            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedBooking
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedBooking
            });
        });

    }catch(err){
        return res.status(500).send({
            message:err
        })

    }
    
};



module.exports = {
    addBookingDetails,
    getallBookingDetails,
    updateBookingDetails,
    deleteBookingDetails,
    getallBookingByID
}