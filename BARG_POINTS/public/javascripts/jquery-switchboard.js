$(document).ready(function () {
    let socket = io('http://localhost:8000');
    let socket_id = null;
    socket.on('connect', function () {
        socket.emit("POINT");
    });
    socket.on('send-socket_id-connected', function (id) {
       socket_id = id;
    });
    function addDataToTr(point)
    {
        point.type === 0 ? point.type = "Thường" : point.type = "Premium";
        switch(point.status){
            case -1:
                point.status = "Chưa định vị";
                break;
            case 0:
                point.status = "Đang định vị";
                break;
            case 1:
                point.status = "Đã định vị";
                break;
            default:
                break;
        }
        return '<tr><td>'+point.id+'</td><td>'+point.address+'</td><td>'+point.type+'</td><td>'+point.note+'</td><td>'+point.status+'</td></tr>';
    }

    $('#sel').on('change', function(){

        let val = $(this).val();

        switch(val){
            case "0":
                socket.emit('get-point-not-located', socket_id);
                socket.on('get-point-not-located', function (ls_point) {
                    alert('Có thêm điểm chưa định vị');
                    let tr = '';
                    for(i=0; i< ls_point.length; i++) {

                        tr += addDataToTr(ls_point[i]);
                    }
                    $('#tbody').html(tr);
                });
                break;
            case "1":
                socket.emit('get-point-is-locating', socket_id);
                socket.on('get-point-is-locating', function (ls_point) {
                    alert('Có thêm điểm đang định vị');
                    let tr = '';
                    for(i=0; i< ls_point.length; i++) {

                        tr += addDataToTr(ls_point[i]);
                    }
                    $('#tbody').html(tr);
                });
                break;
            case "2":
                alert('Có thêm điểm đã định vị');
                socket.emit('get-point-located', socket_id);
                socket.on('get-point-located', function (ls_point) {
                    let tr = '';
                    for(i=0; i< ls_point.length; i++) {

                        tr += addDataToTr(ls_point[i]);
                    }
                    $('#tbody').html(tr);
                });
                break;
            default:
                break;
        }
    });

});