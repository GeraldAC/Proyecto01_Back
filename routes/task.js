const express = require("express")
const { getAll, createOne, updateOne, remove } = require("../controllers/task")
const router = express.Router()

router.get("/", getAll)

router.post("/", createOne)

router.delete("/:id", remove)

router.put("/:id", updateOne)

module.exports = router