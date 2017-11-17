
function initMap(){
    let default_position = {
        lat: 10.7666851,
        lng: 106.641758
    };
    let url = window.location.pathname.split('/')[3];
    console.log(url)
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 24.093345, lng: 120.620621},
        zoom: 4,
        mapTypeId: 'terrain'
    });
    console.log("map",map)
    let marker = new google.maps.Marker(
        {
            position: {lat: 24.093345, lng: 120.620621},
            map: map
        }
    );
}