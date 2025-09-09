const { sendErrorResponse } = require("../helpers/send.response.error");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");

const createAdmin = async (req, res) => {
    console.log("aa");
  try {
    const {
        name,
        email,
        phone,
        password,
        confirm_password,
        is_active,
        is_creator
    } = req.body;
    const condidate = await Admin.findOne({where: {email}})
    
    if(condidate){
        return sendErrorResponse({message: "Bunday admin mavjud"}, res, 403)
    }
    const condidate2 = await Admin.findOne({where: {phone}})
    if(condidate2){
        return sendErrorResponse({message: "Bunday telefon mavjud"}, res, 403)
    }
    if(confirm_password !== password){
        return sendErrorResponse({message: "Parol mos emas"}, res, 400)
    }

    const hashedPasword = await bcrypt.hash(password, 7)
    
    const newAdmin = await Admin.create({
        name,
        email,
        phone,
        password: hashedPasword,
        is_active,
        is_creator
    })
    res.status(201).json({
        message: "Created",
        data: newAdmin
    })
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getAllAdmin = async (req,res)=>{
  try{
    const allAdmin = await Admin.findAll()
    
    res.status(200).json({
        message: "ok",
        data: allAdmin
    })
  }catch(error){
    sendErrorResponse(error, res, 500)
  }   
}

const getByIdAdmin = async (req,res)=>{
    try{
        const id = req.params.id
        const getone = await Admin.findByPk(id)
        if(!getone){
            sendErrorResponse({message: "bunday Admin yoq"})
        }
        res.status(200).json({
            message: "Succsessfilly",
            data: getone
        })
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

const updateAdmin = async(req,res)=>{
    try{
        const id = req.params.id
        const {name,
            email,
            phone,
            password,
            is_active,
            is_creator} = req.body
        const condidate = await Admin.findByPk(id)
        if(!condidate){
            return sendErrorResponse(error, res, 400)
        }
        if(condidate.email != email){
            return sendErrorResponse({message: "notog'ri email"}, res, 400)
        }
        if(condidate.phone != phone){
            return sendErrorResponse({message: "notog'ri pone"}, res, 400)
        }
        const hashedPasword = await bcrypt.hash(password, 7)
        const updateA = await Admin.update({name,
            email,
            phone,
            password: hashedPasword,
            is_active,
            is_creator}, {
            where:{id},
        returning: true
        })
        res.status(200).json({
            message: "Succsess",
            data: updateA[1][0]
        })
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

const deleteAdmin = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Admin.findByPk(id)
        if(!condidate){
            sendErrorResponse({message: "Bunday Admin yoq"}, res, 400)
        }
        await Admin.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
    createAdmin,
    getAllAdmin,
    getByIdAdmin,
    updateAdmin,
    deleteAdmin
}
