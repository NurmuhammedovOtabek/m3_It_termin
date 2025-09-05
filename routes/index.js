const router = require("express").Router()
const authorRouter = require("./author.routes")
const socialRouter = require("./social.routes")
const authorSocialRouter = require("./author_social.routes")
const authRouter = require("./auth.routes")

router.use("/author", authorRouter)
router.use("/social", socialRouter)
router.use("/authorSocial", authorSocialRouter)
router.use("/auth", authRouter)

module.exports = router