const {
  createDictionary,
  getDictionary,
  getByIdDictionary,
  updateDictionary,
  deleteDictionary,
} = require("../controllers/dictionary.controller");

const router = require("express").Router();

router.post("/", createDictionary);
router.get("/", getDictionary);
router.get("/:id", getByIdDictionary);
router.patch("/:id", updateDictionary);
router.delete("/:id", deleteDictionary);

module.exports = router;
