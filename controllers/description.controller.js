const { sendErrorResponse } = require("../helpers/send.response.error");
const Description = require("../models/description");

const createDescription = async (req, res) => {
  try {
    const {description, category_id} = req.body;
    const condidate = await Description.findOne({ where: { description } });
    if (condidate) {
      return sendErrorResponse({ message: "bunday description media mavjud" }, res, 400);
    }
    const newD = await Description.create({description, category_id});
    res.status(201).json({
      message: "Created succsessfilly",
      data: newD,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getDescription = async (req, res) => {
  try {
    const get = await Description.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getByIdDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Description.findByPk(id);
    if (!data) {
      return sendErrorResponse({ message: "bunday descriptin yoq" });
    }
    res.status(200).json({
      message: "Succsess",
      data: data,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateDescription = async (req, res) => {
  try {
    const id = req.params.id;
    const { description, category_id} = req.body;
    const condidate = await Description.findByPk(id);
    if (!condidate) {
      return sendErrorResponse(error, res, 400);
    }
    const update = await Description.update(
      {description, category_id },
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

const deleteDescription = async (req, res) => {
  try {
    const id = req.params.id;
    const condidate = await Description.findByPk(id);
    if (!condidate) {
      return sendErrorResponse({ message: "Bunday description yoq" }, res, 400);
    }
    await Description.destroy({ where: { id } });
    res.status(201).send({
      message: "Deleted",
      data: id,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  createDescription,
  getDescription,
  getByIdDescription,
  updateDescription,
  deleteDescription,
};