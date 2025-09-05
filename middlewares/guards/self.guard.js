const { sendErrorResponse } = require("../../helpers/send.response.error");


module.exports = async (req, res, next)=>{
    try{
        console.log(req.author);
        
        if(req.params.id != req.author.id ){
            return sendErrorResponse({message: "Faqat shaxsiy malumotlarni korish mumkun"}, res, 403)
        }
        next()
    }catch(error){
        sendErrorResponse(error, res, 403)
    }
}