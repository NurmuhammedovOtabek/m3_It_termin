const { sendErrorResponse } = require("../helpers/send.response.error");
const Category = require("../models/category");

const createCategory = async (req, res) => {
  try {
    const {category_name, parent_category_id} = req.body;
    const condidate = await Category.findOne({ where: { category_name } });
    if (condidate) {
      return sendErrorResponse({ message: "bunday category media mavjud" }, res, 400);
    }
    const newC = await Category.create({category_name, parent_category_id});
    res.status(201).json({
      message: "Created succsessfilly",
      data: newC,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getCategory = async (req, res) => {
  try {
    const get = await Category.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getByIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByPk(id);
    if (!data) {
      return sendErrorResponse({ message: "bunday category yoq" });
    }
    res.status(200).json({
      message: "Succsess",
      data: data,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { category_name, parent_category_id} = req.body;
    const condidate = await Category.findByPk(id);
    if (!condidate) {
      return sendErrorResponse(error, res, 400);
    }
    const update = await Category.update(
      {category_name, parent_category_id },
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

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const condidate = await Category.findByPk(id);
    if (!condidate) {
      return sendErrorResponse({ message: "Bunday category yoq" }, res, 400);
    }
    await Category.destroy({ where: { id } });
    res.status(201).send({
      message: "Deleted",
      data: id,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  createCategory,
  getCategory,
  getByIdCategory,
  updateCategory,
  deleteCategory,
};
