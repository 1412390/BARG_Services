var map;
var marker;

function initMap() {
    var default_position = {lat:10.762479,lng: 106.68265489999999}
    var test_position = {lat:10.756579,lng: 106.68280489999999}
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        center: default_position,
        zoom: 16,
        disableDefaultUI: true
    });
    directionsDisplay.setMap(map)    
    const LatLong1 = new google.maps.LatLng(default_position)
    const LatLong2 = new google.maps.LatLng(test_position)
;
    console.log("latlong1", default_position);
    console.log("latlong2", test_position);
    let distance = google.maps.geometry.spherical.computeDistanceBetween(LatLong1,LatLong2).toFixed(2);
    console.log("distance",distance);
    var geocoder = new google.maps.Geocoder();
    var reverse = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow;
    var icon = {
        url: "./bike.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(30, 30) // anchor
    };
    var request = {
        origin: default_position,
        destination: test_position,
        travelMode: 'DRIVING'
      };
    directionsService.route(request,function(result,status){
        if (status == 'OK') {
            console.log("result_38", result)
            directionsDisplay.setDirections(result);
          }
    })
    marker = new google.maps.Marker(
    {
        position: test_position,
        icon:icon,
        map: map
    });
    marker2 = new google.maps.Marker(
        {
            position: default_position,
            icon:icon,
            map: map
        });
    
    //goi hàm geocode
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    //lấy tọa độ khi click chuột
    google.maps.event.addListener(map, 'click', function(event) {
        console.log("event", event)
        reverseLocation(event.latLng, reverse, infowindow);
    });
}

function reverseLocation(location, geocoder, infowindow) {
    geocoder.geocode({'location': location }, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                console.log("reverseLocation",results[0] )
            //   map.setZoom(8);
                marker.setPosition(location);
                marker.setMap(map);
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('không tìm thấy');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function geocodeAddress(geocoder, resultsMap, infowindow) {
    var address = document.getElementById('address').value;
    //marker.setMap(map);
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            console.log("geocodeAddress",results[0] )
            resultsMap.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            marker.setMap(map);
            console.log(results[0]);
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(resultsMap, pin);
        } else {
            alert('không tìm thấy:  ' + status);
        }
    });
}