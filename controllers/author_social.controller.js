const { sendErrorResponse } = require("../helpers/send.response.error");
const Author_social = require("../models/author_social");


const createAuthorSocial = async (req, res) => {
  try {
    const {social_link, authorId, socialId } = req.body;
    const condidate = await Author_social.findOne({where: {social_link}})
    if(condidate){
        sendErrorResponse({message: "bunday author_social mavjud"}, res, 400)
    }
    const newAuthorSocial = await Author_social.create({ social_link, authorId, socialId });
    res.status(201).json({
      message: "Created succsessfilly",
      data: newAuthorSocial,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  };
}

const getAuthorSocial = async (req, res) => {
  try {
    const get = await Author_social.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  }
};

const getByIdAuthorS = async (req, res) => {
  try {
    const { id } = req.params;
    const dataas = await Author_social.findByPk(id);
    if(!dataas){
        sendErrorResponse({message: "bunday author social yoq"})
    }
    res.status(200).json({
      message: "Succsess",
      data: dataas,
    });
  } catch (error) {
    sendErrorResponse(error,res,500)
  }
};

const updateAuthorS = async(req,res)=>{
    try{
        const id = req.params.id
        const {social_link, authorId, socialId } = req.body
        const condidate = await Author_social.findByPk(id)
        if(!condidate){
            sendErrorResponse(error, res, 400)
        }
        const condidate2 = await Author_social.findOne({where: {social_link}})
        if(condidate2){
            sendErrorResponse({message: "bunday author_social mavjud"}, res, 400)
        }
        const updateS = await Author_social.update({social_link, authorId, socialId}, {
            where:{id},
        returning: true
        })
        res.status(200).json({
            message: "Succsess",
            data: updateS[1][0]
        })
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

const deleteAuthorSocial = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Author_social.findByPk(id)
        if(!condidate){
            sendErrorResponse({message: "Bunday Author social yoq"}, res, 400)
        }
        await Author_social.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
  createAuthorSocial,
  getAuthorSocial,
  getByIdAuthorS,
  updateAuthorS,
  deleteAuthorSocial
};
