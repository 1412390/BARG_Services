let val = null;
$(document).ready(function () {
    let socket = io('http://localhost:8000');
    let socket_id = null;
    let currentview;
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
    function toastMsg(msg) {
        $("#animate" ).html(msg);
        $('#animate').removeAttr('hidden');
        $("#animate" ).animate({
            opacity: 0,
        }, 2000, function() {
            // Animation complete.
            $("#animate" ).css('opacity', 1);
            $('#animate').attr('hidden', '');
        });
    }
    function getPointNotLocated(){
        axios.get('http://localhost:8080/users/get-all-point-not-locate')
            .then(response => {
                let tr = '';
                for(i=0; i< response.data.ls_point.length; i++) {

                    tr += addDataToTr(response.data.ls_point[i]);
                }
                if(currentview === 0){
                    $('#tbody').html(tr);
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    function getPointIsLocating(){

        axios.get('http://localhost:8080/users/get-all-point-is-locating')
            .then(response => {
                let tr = '';
                for(i=0; i< response.data.ls_point.length; i++) {

                    tr += addDataToTr(response.data.ls_point[i]);
                }
                if(currentview === 1){
                    $('#tbody').html(tr);
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    socket.on('get-point-not-located', function () {
        toastMsg('Có thêm điểm chưa định vị');
        getPointNotLocated();
    });
    socket.on('get-point-is-locating', function (ls_point) {
        toastMsg('Có thêm điểm đang định vị');
         getPointIsLocating();
    });
    $('#sel').on('change', function(){

        val = $(this).val();

        switch(val){
            case "0":
                currentview=0;
                getPointNotLocated();
                break;
            case "1":
                currentview=1;
                getPointIsLocating();
                break;
            case "2":
                currentview=2
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