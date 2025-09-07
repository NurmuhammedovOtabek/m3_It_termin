const { createDescription, getDescription, getByIdDescription, updateDescription, deleteDescription } = require("../controllers/description.controller")

const router = require("express").Router()


router.post("/", createDescription)
router.get("/", getDescription)
router.get("/:id", getByIdDescription)
router.patch("/:id", updateDescription)
router.delete("/:id", deleteDescription)

module.exports = router