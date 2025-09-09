const { sendErrorResponse } = require("../helpers/send.response.error");
const bcrypt = require("bcrypt");
const User = require("../models/user");


const createUser = async (req, res) => {
  try {
    const {
        name,
        email,
        info,
        password,
        confirm_password,
        photo,
        is_active
    } = req.body;
    const condidate = await User.findOne({where: {email}})
    
    if(condidate){
        return sendErrorResponse({message: "Bunday user mavjud"}, res, 403)
    }
    if(confirm_password !== password){
        return sendErrorResponse({message: "Parol mos emas"}, res, 400)
    }

    const hashedPasword = await bcrypt.hash(password, 7)
    
    const newUser = await User.create({
        name,
        email,
        info,
        password: hashedPasword,
        photo,
        is_active
    })
    res.status(201).json({
        message: "Created",
        data: newUser
    })
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getAllUser = async (req,res)=>{
  try{
    const allUser = await User.findAll()
    
    res.status(200).json({
        message: "ok",
        data: allUser
    })
  }catch(error){
    sendErrorResponse(error, res, 500)
  }   
}

const getByIdUser = async (req,res)=>{
    try{
        const id = req.params.id
        const getone = await User.findByPk(id)
        if(!getone){
            sendErrorResponse({message: "bunday User yoq"})
        }
        res.status(200).json({
            message: "Succsessfilly",
            data: getone
        })
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

const updateUser = async(req,res)=>{
    try{
        const id = req.params.id
        const {name,
            email,
            info,
            password,
            photo,
            is_active} = req.body
        const condidate = await User.findByPk(id)
        if(!condidate){
            return sendErrorResponse(error, res, 400)
        }
        if(condidate.email != email){
            return sendErrorResponse({message: "notog'ri email"}, res, 400)
        }
        const hashedPasword = await bcrypt.hash(password, 7)
        const updateA = await User.update({name,
            email,
            info,
            password: hashedPasword,
            photo,
            is_active}, {
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

const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await User.findByPk(id)
        if(!condidate){
            sendErrorResponse({message: "Bunday User yoq"}, res, 400)
        }
        await User.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
    createUser,
    getAllUser,
    getByIdUser,
    updateUser,
    deleteUser
}