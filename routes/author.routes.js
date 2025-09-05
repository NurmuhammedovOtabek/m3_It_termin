const { createAuthor, getAllAuthor, getByIdAuthor, updateAuthor, deleteAuthor } = require("../controllers/author.controller")
const authGuard = require("../middlewares/guards/auth.guard")
const selfGuard = require("../middlewares/guards/self.guard")

const router = require("express").Router()


router.post("/", authGuard, createAuthor)
router.get("/", authGuard ,getAllAuthor)
router.get("/:id",authGuard, selfGuard, getByIdAuthor)
router.patch("/:id", authGuard, selfGuard, updateAuthor),
router.delete("/:id", authGuard, selfGuard, deleteAuthor)

module.exports = router 