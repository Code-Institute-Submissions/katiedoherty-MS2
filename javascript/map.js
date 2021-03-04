var map;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: 500,
    keyword: 'theater'
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  var request2 = {
    location: pyrmont,
    radius: 500,
    keyword: 'gym'
  };
  var service2 = new google.maps.places.PlacesService(map);
  service2.nearbySearch(request2, callback);
  var request3 = {
    location: pyrmont,
    radius: 500,
    keyword: 'tacos'
  };
  var service3 = new google.maps.places.PlacesService(map);
  service3.nearbySearch(request2, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  } else alert("Places request failed: " + status);
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);