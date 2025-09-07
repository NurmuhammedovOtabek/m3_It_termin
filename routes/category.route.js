const { createCategory, getCategory, getByIdCategory, updateCategory, deleteCategory } = require("../controllers/category.controller")

const router = require("express").Router()


router.post("/", createCategory)
router.get("/", getCategory)
router.get("/:id", getByIdCategory)
router.patch("/:id", updateCategory)
router.delete("/:id", deleteCategory)

module.exports = router