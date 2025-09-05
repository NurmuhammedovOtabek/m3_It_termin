const { createSocial, getSocial, getByIdSocial, updateSocial, deleteSocial } = require("../controllers/social.controller")

const router = require("express").Router()

router.post("/", createSocial)
router.get("/", getSocial)
router.get("/:id", getByIdSocial)
router.patch("/:id", updateSocial)
router.delete("/:id", deleteSocial)

module.exports = router