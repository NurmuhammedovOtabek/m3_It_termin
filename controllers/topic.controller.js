const { sendErrorResponse } = require("../helpers/send.response.error");
const Topic = require("../models/topic");

const createTopic = async (req, res) => {
  try {
    const {
      author_id,
      topic_title,
      topic_tect,
      is_checked,
      is_approved,
      expert_id,
    } = req.body;
    const condidate = await Topic.findOne({ where: { topic_title } });
    if (condidate) {
      return sendErrorResponse({ message: "bunday topic media mavjud" }, res, 400);
    }
    const newSocial = await Topic.create({
      author_id,
      topic_title,
      topic_tect,
      is_checked,
      is_approved,
      expert_id,
    });
    res.status(201).json({
      message: "Created succsessfilly",
      data: newSocial,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getTopic = async (req, res) => {
  try {
    const get = await Topic.findAll();
    res.status(200).json({
      message: "Getting ",
      data: get,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getByIdTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Topic.findByPk(id);
    if (!data) {
      return sendErrorResponse({ message: "bunday topc yoq" });
    }
    res.status(200).json({
      message: "Succsess",
      data: data,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const { author_id, topic_title, topic_tect, is_checked, is_approved, expert_id} = req.body;
    const condidate = await Topic.findByPk(id);
    if (!condidate) {
      return sendErrorResponse(error, res, 400);
    }
    const updateS = await Topic.update(
      { author_id, topic_title, topic_tect, is_checked, is_approved, expert_id },
      {
        where: { id },
        returning: true,
      }
    );
    res.status(200).json({
      message: "Succsess",
      data: updateS[1][0],
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const condidate = await Topic.findByPk(id);
    if (!condidate) {
      return sendErrorResponse({ message: "Bunday topic yoq" }, res, 400);
    }
    await Topic.destroy({ where: { id } });
    res.status(201).send({
      message: "Deleted",
      data: id,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  createTopic,
  getTopic,
  getByIdTopic,
  updateTopic,
  deleteTopic,
};
