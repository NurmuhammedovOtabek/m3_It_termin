const { sendErrorResponse } = require("../../helpers/send.response.error")


module.exports = async (req,res, next)=>{
    try{
        if(!req.admin.is_creator){
            return sendErrorResponse({message: "siz creator emasiz"}, res, 403)
        }

        next()
    }catch(error){
        sendErrorResponse(error, res, 400)
    }
}