const { createAuthorSocial, getAuthorSocial, getByIdAuthorS, updateAuthorS, deleteAuthorSocial } = require("../controllers/author_social.controller")

const router = require("express").Router()


router.post("/", createAuthorSocial)
router.get("/", getAuthorSocial)
router.get("/:id", getByIdAuthorS)
router.patch("/:id", updateAuthorS)
router.delete("/:id", deleteAuthorSocial)

module.exports = router