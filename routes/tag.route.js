const { createTag, getTag, getByIdTag, updateTag, deleteTag } = require("../controllers/tag.controller")

const router = require("express").Router()

router.post("/", createTag)
router.get("/", getTag)
router.get("/:id", getByIdTag)
router.patch("/:id", updateTag)
router.delete("/:id", deleteTag)

module.exports = router