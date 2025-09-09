const {
  loginAuthor,
  logoutAuthor,
  refreshTokenAuthor,
  registerAuthor,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenUser,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/registerAuthor", registerAuthor);
router.post("/loginAuthor", loginAuthor);
router.post("/logoutAuthor", logoutAuthor);
router.post("/refreshTokenAuthor", refreshTokenAuthor);

router.post("/loginAdmin", loginAdmin);
router.post("/logoutAdmin", logoutAdmin);
router.post("/refreshtokenAdmin", refreshTokenAdmin);

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);
router.post("/refreshTokenUser", refreshTokenUser);

module.exports = router;
