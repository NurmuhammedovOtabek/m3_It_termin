const { createAuthor, getAllAuthor, getByIdAuthor, updateAuthor, deleteAuthor } = require("../controllers/author.controller")
const {authAuthor} = require("../middlewares/guards/auth.guard")
const {authorSelfGuard} = require("../middlewares/guards/self.guard")

const router = require("express").Router()


router.post("/", authAuthor, createAuthor)
router.get("/", authAuthor ,getAllAuthor)
router.get("/:id",authAuthor, authorSelfGuard, getByIdAuthor)
router.patch("/:id", authAuthor, authorSelfGuard, updateAuthor),
router.delete("/:id", authAuthor, authorSelfGuard, deleteAuthor)

module.exports = router 