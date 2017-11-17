
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
    function addDataToTr(point,address)
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
        if(address) return `<tr><td>${point.id}</td><td>${point.address}</td><td>${point.type}</td><td>${point.note}</td><td><a href=http://localhost:3002/users/switchboard/${point.id}>Vị Trí</a></td></tr>`;
        else return '<tr><td>'+point.id+'</td><td>'+point.address+'</td><td>'+point.type+'</td><td>'+point.note+'</td><td>'+point.status+'</td></tr>';
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
    function getPointLocated(){
        axios.get('http://localhost:8080/users/get-all-point-located')
            .then(response => {
                let tr = '';
                for(i=0; i< response.data.ls_point.length; i++) {

                    tr += addDataToTr(response.data.ls_point[i],true);
                }
                if(currentview === 2){
                    $('#tbody').html(tr);
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    socket.on('get-point-not-located', function () {
        getPointNotLocated();
    });
    socket.on('get-point-is-locating', function () {
         getPointIsLocating();
    });
    socket.on('get-point-located', function () {
        getPointLocated();
    });
    $('#sel').on('change', function(){

        val = $(this).val();
        $('#tbody').html('');
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
                getPointLocated();
                break;
            default:
                break;
        }
    });

});