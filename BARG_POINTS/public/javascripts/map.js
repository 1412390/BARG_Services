function initMap() {
    let infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay;
    let default_position = {
        lat: 10.7666851,
        lng: 106.641758
    };
    let id = window.location.pathname.split('/')[3];
    let map = new google.maps.Map(document.getElementById('map'), {
        center: default_position,
        zoom: 13,
        disableDefaultUI: true
    });
    let rendererOptions = {
        map: map,
        suppressMarkers: true
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
    axios.get(`http://localhost:8080/point/${id}`)
        .then(response => {
            let start, end;
            start = response.data.user
            end = response.data.driver
            infor = response.data.infor
            start = new google.maps.LatLng(start)
            end = new google.maps.LatLng(end)
            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    let contentString = ` <span style='color:green'>Tài xế: </span> ${infor.name}<br>
                                            <span style='color:green'>Biển số xe: </span>${infor.plate_id},<br>
                                            <span style='color:green'>Khoảng cách: </span>${result.routes[0].legs[0].distance.text}
                                        `

                    let icon = {
                        url: 'https://image.flaticon.com/icons/svg/296/296210.svg',
                        scaledSize: new google.maps.Size(50, 50),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(30, 30)
                    };
                    let myRoutes = result.routes[0].legs[0]
                    var marker = new google.maps.Marker({
                        position: myRoutes.end_location,
                        map: map,
                        icon: icon,
                        draggable: true,

                    })
                    var marker1 = new google.maps.Marker({
                        position: myRoutes.start_location,
                        map: map

                    })
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    })
                    var infowindow1 = new google.maps.InfoWindow({
                        content: myRoutes.start_address
                    });
                    infowindow.open(map, marker)
                    infowindow1.open(map, marker1)

                    directionsDisplay.setDirections(result);
                }
            })

        })
        .catch(err => {
            console.log(err)
        })
}