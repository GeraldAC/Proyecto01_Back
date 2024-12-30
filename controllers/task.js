const { Task } = require("../models/task");

/**
 * -- Controlador para obtener todas las tareas.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 */
const getAll = (req, res) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json({ ok: true, data: tasks });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                message: "Error al obtener las tareas",
                error: err.message,
            });
        });
};

/**
 * -- Controlador para crear una nueva tarea.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 */
const createOne = (req, res) => {
    const { text } = req.body;
    console.log({ body: req.body });

    Task.create({
        name: text,
        done: false,
    })
        .then((createdTask) => {
            res.status(201).json({
                ok: true,
                message: "Tarea creada con éxito",
                data: createdTask,
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                message: "Error al crear la tarea",
                error: err.message,
            });
        });
};

/**
 * -- Controlador para actualizar una tarea existente.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 */
const updateOne = (req, res) => {
    const { text } = req.body;
    const { id } = req.params;

    Task.findByIdAndUpdate(id, { name: text }, { new: true })
        .then((updatedTask) => {
            res.status(200).json({
                ok: true,
                message: "Tarea editada con éxito",
                data: updatedTask,
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                message: "Error al editar la tarea",
                error: err.message,
            });
        });
};

/**
 * -- Controlador para eliminar una tarea existente.
 *
 * -- @param {Object} req - Objeto de solicitud de Express.
 * -- @param {Object} res - Objeto de respuesta de Express.
 */
const remove = (req, res) => {
    const { id } = req.params;

    Task.findByIdAndDelete(id)
        .then((deletedTask) => {
            res.status(200).json({
                ok: true,
                message: "Tarea eliminada con éxito",
                data: deletedTask,
            });
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                message: "Error al eliminar la tarea",
                error: err.message,
            });
        });
};

// -- Exportar controladores
module.exports = {
    getAll,
    createOne,
    updateOne,
    remove,
};
