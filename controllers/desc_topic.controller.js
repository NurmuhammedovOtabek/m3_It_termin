const { sendErrorResponse } = require("../helpers/send.response.error");
const Desc_topic = require("../models/desc_topic");


const createDesc_topic = async (req, res) => {
  try {
    const {topicId, descriptionId } = req.body;
    const newS = await Desc_topic.create({ topicId, descriptionId });
    res.status(201).json({
      message: "Created succsessfilly",
      data: newS,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  };
}

const getDesc_t = async (req, res) => {
  try {
    const get = await Desc_topic.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  }
};

const getByIdDesc_t = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Desc_topic.findByPk(id);
    if(!data){
        return sendErrorResponse({message: "bunday desc topic yoq"})
    }
    res.status(200).json({
      message: "Succsess",
      data: data,
    });
  } catch (error) {
    sendErrorResponse(error,res,500)
  }
};

const updateDesc_t = async(req,res)=>{
    try{
        const id = req.params.id
        const { topicId, descriptionId  } = req.body
        const condidate = await Desc_topic.findByPk(id)
        if(!condidate){
            return sendErrorResponse(error, res, 400)
        }
        const updateS = await Desc_topic.update({ topicId, descriptionId }, {
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

const deleteDesc_t = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Desc_topic.findByPk(id)
        if(!condidate){
            return sendErrorResponse({message: "Bunday desc topic yoq"}, res, 400)
        }
        await Desc_topic.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
    createDesc_topic,
    getDesc_t,
    getByIdDesc_t,
    updateDesc_t,
    deleteDesc_t
}

