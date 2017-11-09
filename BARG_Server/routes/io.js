var ls_client = [];
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
var sio = require('socket.io');

module.exports = {
    io: null,
    getSIO: function () {
        console.log('this.io: ' + this.io);
        return this.io;
    },
    initialize: function (server) {
        this.io = sio(server);
        this.io.on('connection', function (socket) {
            socket.on('client_id', function (id) {
                console.log('server connected to client ' + id);
                ls_client[id] = socket.id;
                localStorage.setItem('ls_client', JSON.stringify(ls_client));
            });
        });
    }
};

