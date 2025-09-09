const { createAdmin, getAllAdmin, getByIdAdmin, updateAdmin, deleteAdmin } = require("../controllers/admin.controller")
const {authAdmin} = require("../middlewares/guards/auth.guard")
const creatorGuard = require("../middlewares/guards/creator.guard")
const {adminSelfGuard} = require ("../middlewares/guards/self.guard")

const router = require("express").Router()


router.post("/", authAdmin, creatorGuard, createAdmin)
router.get("/", authAdmin, getAllAdmin)
router.get("/:id", authAdmin, adminSelfGuard, getByIdAdmin)
router.patch("/:id", authAdmin, adminSelfGuard, updateAdmin),
router.delete("/:id",authAdmin, adminSelfGuard, deleteAdmin)

module.exports = router