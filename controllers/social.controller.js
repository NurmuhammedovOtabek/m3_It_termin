const { sendErrorResponse } = require("../helpers/send.response.error");
const Social = require("../models/social");


const createSocial = async (req, res) => {
  try {
    const { spcial_name, spcial_icon_file} = req.body;
    const condidate = await Social.findOne({where: {spcial_name}})
    if(condidate){
        sendErrorResponse({message: "bunday social media mavjud"}, res, 400)
    }
    const newSocial = await Social.create({ spcial_name, spcial_icon_file}); 
    res.status(201).json({
      message: "Created succsessfilly",
      data: newSocial,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  };
}

const getSocial = async (req, res) => {
  try {
    const get = await Social.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500)
  }
};

const getByIdSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const dataC = await Social.findByPk(id);
    if(!dataC){
        sendErrorResponse({message: "bunday social yoq"})
    }
    res.status(200).json({
      message: "Succsess",
      data: dataC,
    });
  } catch (error) {
    sendErrorResponse(error,res,500)
  }
};

const updateSocial = async(req,res)=>{
    try{
        const id = req.params.id
        const {spcial_name, spcial_icon_file} = req.body
        const condidate = await Social.findByPk(id)
        if(!condidate){
            sendErrorResponse(error, res, 400)
        }
        const updateS = await Social.update({spcial_name, spcial_icon_file}, {
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

const deleteSocial = async(req,res)=>{
    try{
        const id = req.params.id
        const condidate = await Social.findByPk(id)
        if(!condidate){
            sendErrorResponse({message: "Bunday social yoq"}, res, 400)
        }
        await Social.destroy({where:{id}})
        res.status(201).send({
            message: "Deleted",
            data: id,
        });
    }catch(error){
        sendErrorResponse(error, res, 500)
    }
}

module.exports = {
  createSocial,
  getSocial,
  getByIdSocial,
  updateSocial,
  deleteSocial
};
