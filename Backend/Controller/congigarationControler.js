const Configaration = require('../Models/configourationModel');



//adding Configaration details
const addConfigarationDetails = async (req, res) => {
    const { productId, /* other fields */ } = req.body;

    try {
        // Check if a record with the same productId already exists
        const existingData = await Configaration.findOne({ productId });

        if (existingData) {
            // If the record exists, update it
            existingData.productId = productId;
            // Update other fields as needed

            id = existingData._id

            Configaration.findByIdAndUpdate(id,{
                $set : req.body
            },(err) => {
                if(err){
                    return res.status(400).json({
                        error: err
                    });
                }
                return res.status(200).json({
                    status: '2100',
                    message: "updated successfully!"
                });
    
            })
        } else {
            // If the record doesn't exist, create a new one
            const newData = new Configaration(req.body);
            newData.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: err
                    });
                }
                return res.status(200).json({
                    status: '2100',
                    message: "Data added successfully",
                   
                });
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}


//get all Image details
const getProductConfigarationByProductID = async (req, res) => {
    try {
        const id = req.params.id;

        const productData = await Configaration.find({product_id:id});
       
       
        return res.status(200).send({
            data: productData,
            status: 2100
        });
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
}


//get all acount details
const getallConfigarationDetails =  async (req,res) => {
    try{
        const ConfigarationData = await Configaration.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:ConfigarationData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err,
            
        })

    }
}


//get all acount details
const getallConfigarationByID =  async (req,res) => {
    try{
        const id = req.params.id;
        const ConfigarationData = await Configaration.findById(id);
        return res.status(200).send({
            data:ConfigarationData
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//update details
const updateConfigarationDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        Configaration.findByIdAndUpdate(id,{
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

//delete Configaration
const deleteConfigarationDetails = async (req, res) => {
    try{

        Configaration.findByIdAndRemove(req.params.id).exec((err, deletedConfigaration) => {

      
            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedConfigaration
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedConfigaration
            });
        });

    }catch(err){
        return res.status(500).send({
            message:err
        })

    }
    
};



module.exports = {
    addConfigarationDetails,
    getProductConfigarationByProductID,
    getallConfigarationDetails,
    updateConfigarationDetails,
    deleteConfigarationDetails,
    getallConfigarationByID
}