//let promise =require("bluebird")
let map;
let geocoder;
let marker;
let motobike;
let drivers
let min_driver
let circle
let motobike_arr = []
let default_position = {
    lat: 10.7666851,
    lng: 106.641758
};
let infowindow;
let directionsService;
let directionsDisplay;

function initMap() {
    infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: default_position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    fetchDrivers(null, function (err, drivers) {
        !!err ?
            console.log(err) :
            generateMotoBikeLocation(drivers, map)
    })
    geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function () {
        clearOverlays();
        geocodeAddress(geocoder, map);
    });
}

function filterDriversWithRadius(drivers, radius, center,directionsService) {
    return new Promise(function(resolve){
        const motobikes = []
        let with_radius_moto
        if (radius === "all") {
            resolve(drivers)
        } else {
            Promise.map(drivers,(item)=>{
                const drive = new google.maps.LatLng({
                    lat: item.lat,
                    lng: item.lng
                })
                let distance = google.maps.geometry.spherical.computeDistanceBetween(drive, center).toFixed(2);
                if (distance <= parseInt(radius)) {
                    return getDirectionDistance(center,drive,directionsService).then(value=>{
                        return item.value=value
                    })
                }
            })
            .then(array_results=>{
                console.log("array_result", array_results)
            })
            }
    })
}


function getDirectionDistance(center, driver, directionsService) {
    return new Promise(function(resolve){
    let request=null
    request = {
        origin: center,
        destination: driver,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            console.log("result_38", result.routes[0].legs[0].distance.value)
            callback(result.routes[0].legs[0].distance.value)
        }
    })
})  
}

function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function (responses) {
        if (responses && responses.length > 0) {
            let icon = {
                url: '/images/markers/green_MarkerA.png',
            };
            infowindow.setContent(responses[0].formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
            marker.setIcon(icon);
            marker.setDraggable(false);
        } else {
            infowindow.setContent('Cannot determine address at this location.');
        }
        infowindow.open(map, marker);
    });
}

function generateMotoBikeLocation(drivers, map) {
    icon = {
        url: 'https://image.flaticon.com/icons/svg/296/296210.svg',
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(30, 30)
    };
    for (let i = 0; i < drivers.length; i++) {
        let pos = {
            lat: drivers[i].lat,
            lng: drivers[i].lng
        }
        motobike = new google.maps.Marker({
            map: map,
            position: pos,
            icon: icon,
            draggable: true,
        })
        motobike_arr.push(motobike)
    }
}

function clearOverlays() {
    for (let i = 0; i < motobike_arr.length; i++) {
        motobike_arr[i].setMap(null);
    }
    motobike_arr.length = 0;
}

function circleDrawHandler(pos, map) {
    let radius;
    radius = $('select#radius').val();
    circle = new google.maps.Circle({
        center: pos,
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: '#004de8',
        fillOpacity: 0.27,
        map: map,
        radius: parseInt(radius),
        strokeColor: '#004de8',
        strokeOpacity: 0.62,
        strokeWeight: 1
    })
}

function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            marker ? marker.setMap(null) : marker
            marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                draggable: true,
                zoom: 13
            });
            circle ? circle.setMap(null) : null
            const radius = $('select#radius').val();
            circleDrawHandler(results[0].geometry.location, resultsMap, radius)
            fetchDrivers(null, function (err, drivers) {
                !!err ?
                    console.log(err) :
                        filterDriversWithRadius(drivers, radius, results[0].geometry.location,directionsService)
                    .then(result=>{
                        generateMotoBikeLocation(result, resultsMap)
                    })
            })
            google.maps.event.addListener(marker, 'dragend', function () {
                geocodePosition(marker.getPosition());
            });
            // google.maps.event.addListener(marker, 'click', function () {
            //     if (marker.formatted_address) {
            //         infowindow.setContent(marker.formatted_address + "<br>coordinates: " + marker.getPosition().toUrlValue(6));
            //     } else {
            //         infowindow.setContent('Cannot determine address at this location.');
            //     }
            //     infowindow.open(map, marker);
            // });
            google.maps.event.trigger(marker, 'click');
            if (results[0].geometry.viewport)
                resultsMap.fitBounds(results[0].geometry.viewport);
        } else {
            //alert('Geocode was not successful for the following reason: ' + status);
            alert('Không tìm thấy kết quả hợp lệ! Error ' + status);
        }
    });
}

function fetchDrivers(filter, display) {
    const url = filter ? `http://localhost:8080/drivers?filter=${filter}` : "http://localhost:8080/drivers"
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (result) {
            return display(null, result)
        },
        error: function (xhr, status, err) {
            return display(err, null)
        }
    });
}
$(document).ready(function () {
    let socket = io('http://localhost:8000');
    socket.on('connect', function () {
        let user_id = $('#hidden').data('user');
        socket.emit("LOCATE", user_id);
    });
    socket.on('recieve-data-from-phonis', function (data) {
        //confrim this locater recieved point
        const update_point = {
            user_id: $('#hidden').data('user'),
            point_id: data.point_id,
            status: 0
        };

        socket.emit('confirm-locater-locate-point', update_point);

        $('#address_root').val(data.address);
        $('#address').val(data.address);
        $('#submit').trigger('click');
    });
    socket.on('recieve-data-from-database', function (data) {
        //confrim this locater recieved point
        const update_point = {
            user_id: $('#hidden').data('user'),
            point_id: data.id,
            status: 0
        };

        socket.emit('confirm-locater-locate-point', update_point);

        $('#address_root').val(data.address);
        $('#address').val(data.address);
        $('#submit').trigger('click');
    });
    socket.on('send-socket_id-connected', function (socket_id) {
        $('#hidden').attr('data-socket', socket_id);
    });
});