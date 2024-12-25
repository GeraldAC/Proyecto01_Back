require("dotenv").config()

const http = require("http")

function requestController() {
    console.log("Se recibio una request!!!");
}

const server = http.createServer(requestController)

server.listen(process.env.PORT, function() {
    console.log(`Server is running on port ${process.env.PORT}`)
})