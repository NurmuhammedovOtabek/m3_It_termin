const { createSynonym, getSynonym, getByIdSynonym, updateSynonym, deleteSynonym } = require("../controllers/synonym.controller")

const route = require("express").Router()

route.post("/", createSynonym)
route.get("/", getSynonym)
route.get("/:id", getByIdSynonym)
route.patch("/:id", updateSynonym)
route.delete("/:id", deleteSynonym)

module.exports = route