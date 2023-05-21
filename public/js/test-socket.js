const socket = io();

setInterval(() => {
    socket.emit('msg_front_back', {
        msg: "Hola desde el front " + Date.now(),
        from: "Juan",
    })
}, 1000);
socket.on("msg_back_front", (msg)=>{
    console.log(msg)
  })
