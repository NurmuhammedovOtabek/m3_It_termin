const { sendErrorResponse } = require("../helpers/send.response.error");
const Synonym = require("../models/synonym");


const createSynonym = async (req, res) => {
  try {
    const {dictionaryId, descriptionId } = req.body;
    const newS = await Synonym.create({ dictionaryId, descriptionId });
    res.status(201).json({
      message: "Created succsessfilly",
      data: newS,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  };
}

const getSynonym = async (req, res) => {
  try {
    const get = await Synonym.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  }
};

const getByIdSynonym = async (req, res) => {
  try {
    const { id } = req.params;
    const dataS = await Synonym.findByPk(id);
    if(!dataS){
        return sendErrorResponse({message: "bunday synonym yoq"})
    }
    res.status(200).json({
      message: "Succsess",
      data: dataS,
    });
  } catch (error) {
    sendErrorResponse(error,res,500)
  }
};

const updateSynonym = async(req,res)=>{
    try{
        const id = req.params.id
        const {dictionaryId, descriptionId  } = req.body
        const condidate = await Synonym.findByPk(id)
        if(!condidate){
            return sendErrorResponse(error, res, 400)
        }
        const updateS = await Synonym.update({dictionaryId, descriptionId }, {
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

const deleteSynonym = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Synonym.findByPk(id)
        if(!condidate){
            return sendErrorResponse({message: "Bunday synonym yoq"}, res, 400)
        }
        await Synonym.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
    createSynonym,
    getSynonym,
    getByIdSynonym,
    updateSynonym,
    deleteSynonym
}

