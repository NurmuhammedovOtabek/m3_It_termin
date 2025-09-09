const { sendErrorResponse } = require("../../helpers/send.response.error");


const authorSelfGuard= async (req, res, next)=>{
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

const adminSelfGuard = async (req, res, next)=>{
    try{
        console.log(req.admin);
        
        if(req.params.id != req.admin.id ){
            return sendErrorResponse({message: "Faqat shaxsiy malumotlarni korish mumkun"}, res, 403)
        }
        next()
    }catch(error){
        sendErrorResponse(error, res, 403)
    }
}

const userSelfGuard = async (req, res, next)=>{
    try{
        console.log(req.user);
        
        if(req.params.id != req.user.id ){
            return sendErrorResponse({message: "Faqat shaxsiy malumotlarni korish mumkun"}, res, 403)
        }
        next()
    }catch(error){
        sendErrorResponse(error, res, 403)
    }
}

module.exports = {
    authorSelfGuard,
    adminSelfGuard,
    userSelfGuard
}