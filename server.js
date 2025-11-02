const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public"))
});

io.on('connection', (socket)=>{
    console.log("Cliente conectado ", socket.id);

    socket.on("mensaje",(text)=>{
        console.log("Mensaje recibido ",text);

        io.emit("mensaje", `Mensaje enviado ${text}`);
    });
    socket.on("disconnect", ()=>{
        console.log(`El cliente con el id ${socket.id} se ha desconectado.`)
    })
});

server.listen(port, ()=>{
    console.log("El servidor se esta ejecutando en el puerto "+port);
});