const { sendErrorResponse } = require("../helpers/send.response.error");
const Tag = require("../models/tag");


const createTag = async (req, res) => {
  try {
    const {categoryId, topicId } = req.body;
    const newS = await Tag.create({ categoryId, topicId});
    res.status(201).json({
      message: "Created succsessfilly",
      data: newS,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  };
}

const getTag = async (req, res) => {
  try {
    const get = await Tag.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  }
};

const getByIdTag = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Tag.findByPk(id);
    if(!data){
        return sendErrorResponse({message: "bunday tag yoq"})
    }
    res.status(200).json({
      message: "Succsess",
      data: data,
    });
  } catch (error) {
    sendErrorResponse(error,res,500)
  }
};

const updateTag = async(req,res)=>{
    try{
        const id = req.params.id
        const { categoryId, topicId  } = req.body
        const condidate = await Tag.findByPk(id)
        if(!condidate){
            return sendErrorResponse(error, res, 400)
        }
        const updateS = await Tag.update({ categoryId, topicId }, {
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

const deleteTag = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Tag.findByPk(id)
        if(!condidate){
            return sendErrorResponse({message: "Bundaytag yoq"}, res, 400)
        }
        await Tag.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
    createTag,
    getTag,
    getByIdTag,
    updateTag,
    deleteTag
}

