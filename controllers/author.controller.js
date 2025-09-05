const { sendErrorResponse } = require("../helpers/send.response.error");
const bcrypt = require("bcrypt");
const Author = require("../models/author");
const { error } = require("console");

const createAuthor = async (req, res) => {
  try {
    const {
      frist_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      confirm_password,
      info,
      position,
      photo,
      is_expert,
      is_active,
    } = req.body;
    const condidate = await Author.findOne({where: {email}})
    console.log(condidate);
    
    if(condidate){
        return sendErrorResponse({message: "Bunday author mavjud"}, res, 403)
    }
    const condidate2 = await Author.findOne({where: {nick_name}})
    if(condidate2){
        return sendErrorResponse({message: "Bunday nick_name mavjud"}, res, 403)
    }
    if(confirm_password !== password){
        return sendErrorResponse({message: "Parol mos emas"}, res, 400)
    }

    const hashedPasword = await bcrypt.hash(password, 7)
    
    const newAuthor = await Author.create({
      frist_name,
      last_name,
      nick_name,
      email,
      phone,
      password: hashedPasword,
      info,
      position,
      photo,
      is_expert,
      is_active,
    })
    res.status(201).json({
        message: "Created",
        data: newAuthor
    })
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getAllAuthor = async (req,res)=>{
  try{
    const allAuthor = await Author.findAll()
    
    res.status(200).json({
        message: "ok",
        data: allAuthor
    })
  }catch(error){
    sendErrorResponse(error, res, 500)
  }   
}

const getByIdAuthor = async (req,res)=>{
    try{
        const id = req.params.id
        const oneAuthor = await Author.findByPk(id)
        if(!oneAuthor){
            sendErrorResponse({message: "bunday Author yoq"})
        }
        res.status(200).json({
            message: "Succsessfilly",
            data: oneAuthor
        })
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

const updateAuthor = async(req,res)=>{
    try{
        const id = req.params.id
        const {email, nick_name} = req.body
        const condidate = await Author.findByPk(id)
        if(!condidate){
            sendErrorResponse(error, res, 400)
        }
        if(condidate.email != email){
            sendErrorResponse({message: "notog'ri email"}, res, 400)
        }
        if(condidate.nick_name != nick_name){
            sendErrorResponse({message: "notog'ri nick_name"}, res, 400)
        }
        const updateA = await Author.update(req.body, {
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

const deleteAuthor = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Author.findByPk(id)
        if(!condidate){
            sendErrorResponse({message: "Bunday Author yoq"}, res, 400)
        }
        const delA = await Author.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
    createAuthor,
    getAllAuthor,
    getByIdAuthor,
    updateAuthor,
    deleteAuthor
}
