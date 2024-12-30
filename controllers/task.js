const { Task } = require("../models/task")

const getAll = (req, res) => {
    Task.find()
    .then((tasks) => {
        res.status(200).json({ ok: true, data: tasks})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al obtener las tareas", error: err})
    })
}

const createOne = (req, res) => {
    const body = req.body
    console.log({ body })
    Task
    .create({
        name: body.text,
        done: false
    })
    .then((createdTask) => {
        res.status(201).json({ ok: true, message: "Tarea creada con exito", data: createdTask})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al crear la tarea", error: err})
    })
}

const updateOne = (req, res) => {
    const body = req.body
    const id = req.params.id
    
    Task.findByIdAndUpdate(id, {
        name: body.text
    })
    .then((updateTask) => {
        res.status(200).json({ ok: true, message: "Tarea editada con exito", data: updateTask})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al editar la tarea", error: err})
    })
}

const remove = (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then((deletedTask) => {
        res.status(200).json({ ok: true, message: "Tarea eliminada con exito", data: deletedTask})
    })
    .catch((err) => {
        res.status(400).json({ ok: false, message: "Error al eliminar la tarea", error: err})
    })
}

module.exports = {
    getAll,
    createOne,
    updateOne,
    remove
}