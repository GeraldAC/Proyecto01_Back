const express = require("express");
const { getAll, createOne, updateOne, remove } = require("../controllers/task");
const router = express.Router();

/**
 * -- Ruta para obtener todas las tareas.
 * -- @route GET /
 */
router.get("/", getAll);

/**
 * -- Ruta para crear una nueva tarea.
 * -- @route POST /
 */
router.post("/", createOne);

/**
 * -- Ruta para eliminar una tarea por su ID.
 * -- @route DELETE /:id
 * -- @param {string} id - ID de la tarea a eliminar.
 */
router.delete("/:id", remove);

/**
 * -- Ruta para actualizar una tarea por su ID.
 * -- @route PUT /:id
 * -- @param {string} id - ID de la tarea a actualizar.
 */
router.put("/:id", updateOne);

// -- Exportar el enrutador
module.exports = router;
