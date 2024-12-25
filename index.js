const http = require("http")

function requestController() {
    console.log("Se recibio una request");
}

const server = http.createServer(requestController)

server.listen(4000)