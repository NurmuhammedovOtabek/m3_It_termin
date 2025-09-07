const { sendErrorResponse } = require("../helpers/send.response.error");
const Dictionary = require("../models/dictionary");

const createDictionary = async (req, res) => {
  try {
    const { term, letter } = req.body;
    const newDictionary = await Dictionary.create({term, letter });
    res.status(201).json({
      message: "Created succsessfilly",
      data: newDictionary,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getDictionary = async (req, res) => {
  try {
    const get = await Dictionary.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getByIdDictionary = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Dictionary.findByPk(id);
    if (!data) {
      return sendErrorResponse({ message: "bunday dictionary yoq" });
    }
    res.status(200).json({
      message: "Succsess",
      data: data,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateDictionary = async (req, res) => {
  try {
    const id = req.params.id;
    const { term, letter } = req.body;
    const condidate = await Dictionary.findByPk(id);
    if (!condidate) {
      return sendErrorResponse(error, res, 400);
    }
    const update = await Dictionary.update(
      { term, letter },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).json({
      message: "Succsess",
      data: update[1][0],
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteDictionary = async (req, res) => {
  try {
    const id = req.params.id;
    const condidate = await Dictionary.findByPk(id);
    if (!condidate) {
      sendErrorResponse({ message: "Bunday dictinary yoq" }, res, 400);
    }
    await Dictionary.destroy({ where: { id } });
    res.status(201).send({
      message: "Deleted",
      data: id,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  createDictionary,
  getDictionary,
  getByIdDictionary,
  updateDictionary,
  deleteDictionary,
};
