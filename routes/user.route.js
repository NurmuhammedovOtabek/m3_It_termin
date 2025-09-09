const { createUser, getAllUser, getByIdUser, updateUser, deleteUser } = require("../controllers/user.controller")
const { authUser } = require("../middlewares/guards/auth.guard")
const { userSelfGuard } = require("../middlewares/guards/self.guard")

const router = require("express").Router()

router.post("/", authUser, createUser)
router.get("/",  authUser, getAllUser)
router.get("/:id",  authUser, userSelfGuard, getByIdUser)
router.patch("/:id",  authUser, userSelfGuard, updateUser)
router.delete("/:id",  authUser, userSelfGuard, deleteUser)

module.exports = router