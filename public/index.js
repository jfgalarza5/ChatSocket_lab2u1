const socket = io();

socket.on("mensaje", (texto)=>{
    const li = document.createElement("li");
    li.textContent = texto;
    document.getElementById("chat").appendChild(li)
})

function enviarMensaje(){
    const input = document.getElementById("mensaje");
    const texto = input.value;
    input.value = "";
    socket.emit("mensaje", texto);
}