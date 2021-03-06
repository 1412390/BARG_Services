var app = require("http").createServer();
const io = require("socket.io")(app);
const axios = require("axios");
const config = require("./config");
const PHONE = {
    socket_id: null,
    client: "PHONE"
};
const LOCATE = {
    socket_id: [],
    client: "LOCATE"
};
const POINT = {
    socket_id: [],
    client: "POINT"
};
io.on('connection', function (socket) {

    socket.on('LOCATE', function (user_id) {

        console.log('Locate conected');
    
        const data = {
            user_id: user_id
        };

        io.to(socket.id).emit("send-socket_id-connected", socket.id);

        //check this locater is locating point
        const url = config.URL_SERVER + "/users/get-point-locating";

        axios.post(url, data)
            .then(
            response => {

                if (response.data.success) {
                    //if this locater locating a point
                    var point = response.data.point;
                    io.to(socket.id).emit("recieve-data-from-database", point);
                }
                else {//this locater not locate any point
                
                    const url = config.URL_SERVER + "/users/get-point-not-locate";
                    axios.get(url)
                        .then(
                        response => {
                            if (response.data.success) {//has a point which not located
                            
                                var point = response.data.point;
                                io.to(socket.id).emit("recieve-data-from-database", point);
                            }
                            else {
                                LOCATE.socket_id.push(socket.id);
                            }
                        }
                        )
                        .catch(function (err) { console.log(err + ""); });
                }
            })
            .catch(function (err) { console.log(err + ""); });

    });
    socket.on('PHONE', function (data) {
        PHONE.socket_id = socket.id;
        console.log('Phone conected');
    });
    socket.on('POINT', function () {
        console.log('Point connected ');
        POINT.socket_id.push(socket.id);
        io.to(socket.id).emit("send-socket_id-connected", socket.id);
    });
    socket.on('send-data-to-locater', function (data) {

        //set point to database with user_id and status undefine
        const url = config.URL_SERVER + "/users/set-point";

        axios.post(url, data)
            .then(
            response => {
                if (response.data.success) {//set successful

                    data.point_id = response.data.id;

                    console.log('Locate socket_id: ', LOCATE.socket_id);

                    if (LOCATE.socket_id.length > 0) {//pop any locater and send point to them
                        var shift = LOCATE.socket_id.shift();
                        io.to(shift).emit("recieve-data-from-phonis", data);
                    }
                    //send data to all manager
                    POINT.socket_id.forEach(function (id) {
                        io.to(id).emit("get-point-not-located");
                    });
                }
            })
            .catch(function (err) { console.log(err + ""); });
    });
    socket.on('confirm-locater-locate-point', function (data) {

        const url = config.URL_SERVER + "/users/set-confirm-locater-locating-point";

        axios.post(url, data)
            .then(response => {
                //send data to all manager
                POINT.socket_id.forEach(function (id) {
                    io.to(id).emit("get-point-is-locating");
                });
            })
            .catch(function (err) { console.log(err + ""); });
    });
    socket.on('send_to_driver', function () {
        POINT.socket_id.forEach(function (id) {
            io.to(id).emit("get-point-located");
        });
    });
    socket.on('remove-socket-id', function(value){
        LOCATE.socket_id = LOCATE.socket_id.filter(item => item !== value);
    });
});
app.listen(8000, function () {
    console.log("socket running port 8000!");
});