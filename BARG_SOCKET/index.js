
var app = require("http").createServer()
const io = require("socket.io")(app)

const SOCKET_ID = null
const PHONE = {
    socket_id:null,
    client: "PHONE"
}
const LOCATE = {
    socket_id:null,
    client: "LOCATE" 
}
io.on('connection', function (socket) {

    socket.on('LOCATE', function (data) {
        LOCATE.socket_id = socket.id
        io.to(PHONE.socket_id).emit("Server_message","locate hello phone")
        console.log('locate connect ',LOCATE);
    });
    socket.on('PHONE', function (data) {
        PHONE.socket_id = socket.id
        console.log('phone connected ',PHONE);
    });
    socket.on('PHONE_SUBMIT', function (data) {
        console.log('phone connected ',PHONE);
    });
});
app.listen(8000, () => {
    console.log("server running port 8080!")
})