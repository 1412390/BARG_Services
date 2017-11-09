var app = require("http").createServer()
const io = require("socket.io")(app)

const SOCKET_ID = null
const PHONE = {
    socket_id:null,
    client: "PHONE"
}
const LOCATE = {
    socket_id:[],
    client: "LOCATE" 
}
io.on('connection', function (socket) {

    socket.on('LOCATE', function (data) {
        LOCATE.socket_id.push(socket.id);
    });
    socket.on('PHONE', function (data) {
        PHONE.socket_id = socket.id
    });
    socket.on('send-data-to-locate', function (data) {
        if(LOCATE.socket_id!==null){
            var shift = LOCATE.socket_id.shift();
            io.to(shift).emit("recieve-data-from-phone",data);
        }
    });
});
app.listen(8000, () => {
    console.log("server running port 8000!")
})