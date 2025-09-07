const { createDesc_topic, getDesc_t, getByIdDesc_t, updateDesc_t, deleteDesc_t } = require("../controllers/desc_topic.controller")

const router = require("express").Router()


router.post("/", createDesc_topic)
router.get("/", getDesc_t)
router.get("/:id", getByIdDesc_t)
router.patch("/:id", updateDesc_t)
router.delete("/:id", deleteDesc_t)

module.exports = router