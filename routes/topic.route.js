const { createTopic, getTopic, getByIdTopic, updateTopic, deleteTopic } = require("../controllers/topic.controller")

const router = require("express").Router()


router.post("/", createTopic)
router.get("/", getTopic)
router.get("/:id", getByIdTopic)
router.patch("/:id", updateTopic)
router.delete("/:id", deleteTopic)

module.exports = router