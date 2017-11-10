var app = require("http").createServer();
const io = require("socket.io")(app);
const axios = require("axios");
const config = require("./config");
const PHONE = {
    socket_id:null,
    client: "PHONE"
};
const LOCATE = {
    socket_id:[],
    client: "LOCATE" 
};
const POINT = {
    socket_id: null,
    client: "POINT"
};
io.on('connection', function (socket) {

    socket.on('LOCATE', function (data) {
        LOCATE.socket_id.push(socket.id);
        console.log('locate conected');
        const url = config.URL_SERVER + "/users/get-queue-locater";
        axios.get(url).then(
            response => {
                if(response.data.success){
                    if(LOCATE.socket_id.length>0){
                        var shift = LOCATE.socket_id.shift();
                        io.to(shift).emit("recieve-data-from-phonis",response.data.data);
                    }            
                }
            }
        ).catch(function(err){
            console.log(err + "");
        });
    });
    socket.on('PHONE', function (data) {
        PHONE.socket_id = socket.id;
        console.log('phone conected');
    });
    socket.on('send-data-to-locater', function (data) {
        if(LOCATE.socket_id.length>0){
            var shift = LOCATE.socket_id.shift();
            io.to(shift).emit("recieve-data-from-phonis",data);
        }
        else{
            const url = config.URL_SERVER + "/users/set-queue-locater";
            axios.post(url, data).then(
                response => {
                    if(response.data.success){
                       // console.log(response.data.id);
                    }
                }
            ).catch(function(err){
                console.log(err + "");
            });
        }
    });
});
app.listen(8000, function () {
    console.log("socket running port 8000!");
});