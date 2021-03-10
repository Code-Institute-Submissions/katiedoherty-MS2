//GEOLOCATION API
let marker;
let map;
let service;
let pos;
let geomaker;



function initMap() {


    var latmap = new google.maps.LatLng(53.41291, -8.24389);


    map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 8,
        center: latmap
    });


    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(p) {

            pos = {
                lat: p.coords.latitude,
                lng: p.coords.longitude,
            };
console.log(p);
            marker = new google.maps.Marker({
                map,
                draggable: false,
                animation: google.maps.Animation.DROP,

                position: pos
            });


            marker.setAnimation(google.maps.Animation.BOUNCE);
            getRestaurants(pos);


            const contentString = `<p>You Are Here</p>`;
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });



        });


    }


}

function getRestaurants(pos) {
    var pyrmont = new google.maps.LatLng(pos.lat, pos.lng);
    var request = {
        location: pyrmont,
        radius: 500,
        type: ["restaurant"]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function createMarker(place){
    
     geomarker = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
    new google.maps.Marker({
        position: geomarker,
        map: map});
console.log(place);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) 
    {
      createMarker(results[i]);
    }
  }
}


 

