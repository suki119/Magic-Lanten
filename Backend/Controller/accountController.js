const account = require('../Models/accountModel');



//adding account details
const addAcountDetails = async (req,res) => {
    
    let newData = new account(req.body);

   

  
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
                name:"sadunika"
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}


//get all acount details
const getallAccountDetails =  async (req,res) => {
    try{
        const AccountData = await account.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:AccountData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err,
            
        })

    }
}


//get all acount details
const getallAccountByID =  async (req,res) => {
    try{
        const id = req.params.id;
        const AccountData = await account.findById(id);
        return res.status(200).send({
            data:AccountData
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//update details
const updateAccountDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        account.findByIdAndUpdate(id,{
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

//delete Account
const deleteAccountDetails = async (req, res) => {
    try{

        account.findByIdAndRemove(req.params.id).exec((err, deletedAccount) => {

      
            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedAccount
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedAccount
            });
        });

    }catch(err){
        return res.status(500).send({
            message:err
        })

    }
    
};



module.exports = {
    addAcountDetails,
    getallAccountDetails,
    updateAccountDetails,
    deleteAccountDetails,
    getallAccountByID
}