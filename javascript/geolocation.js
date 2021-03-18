//GEOLOCATION API
let marker;
let map;
let service;
let pos;
let geomaker;
let infowindow;
let infopane;
let mapdetails;
let getdirections;


//This is the function that renders the map.
function initMap() {
  
    infoPane = document.getElementById('panel');
    mapdetails=document.getElementById("placedetails")
    getdirections=document.getElementById("getdirections")
    var latmap = new google.maps.LatLng(53.41291, -8.24389);


    map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 17,
        center: latmap
    });

//This is teh function that gets the users location
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(p) {

            pos = {
                //lat: p.coords.latitude,
                //lng: p.coords.longitude,
                lat:53.350140,
                lng:-6.266155
            };

            //This function centers the map on the users location
map.setCenter(pos);

//This variable creates the users location marker with the markers animation.
            marker = new google.maps.Marker({
                map,
                draggable: false,
                animation: google.maps.Animation.DROP,

                position: pos
            });


            marker.setAnimation(google.maps.Animation.BOUNCE);
            getRestaurants(pos);

// These variables create the infowindow and content written in the function.

            const contentString = `<p>You Are Here</p>`;
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent('You are Here');
            console.log(
            infowindow.open(map, marker)
            );
        });
    }
     
}


//This function gathers the nearby restaurants to the users location.
function getRestaurants(pos) {
    var pyrmont = new google.maps.LatLng(pos.lat, pos.lng);
    var request = {
        location: pyrmont,
        radius: 500,
        type: ["restaurant"]
    };
//This calls on the Places api to search for places.
    service = new google.maps.places.PlacesService(map);
    //This function calls all the services that were searched and only returns the nearby restaurants.
    service.nearbySearch(request, callback);
}

//This function creates the markers for the nearby places to the user.
function createMarker(place){
    
     //this variable gets the latitude and longitude of the restaurants returned 
     geomarker = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            //this positions the markers on the co-ordinates returned.
    var everymarker= new google.maps.Marker({
        position: geomarker,
        map: map});
        //this will print the markers on the map.
console.log(place);

//create a click event for a person and get an infowindow and bottom panel of information returned.
new google.maps.event.addListener(everymarker, 'click', () => {
   
    $("#panel").show();
    infoPane.classList.add("open");
  
    
    //the get directions button.
    var element3 = document.getElementById("getdirections");
    element3.type = "button";
    element3.name = "add";
    element3.value="Remove";
    element3.className="btn btn-primary btn-lg";
    element3.textContent= "Get Directions"
    element3.classList.add("directions");
    
    //gets rid of the last child in the mapdetails id when another marker is selected.
   
 if (mapdetails.firstChild) {
    mapdetails.removeChild(mapdetails.firstChild);
    }
    showPhotos(place);

    
    //returned information on the infowindow
    let request = {
    placeId: place.place_id,
    fields: ['name', 'formatted_address', 'geometry', 'rating',
        'website', 'photos']
    };

    
    service.getDetails(request, (placeResult, status) => {
    showDetails(placeResult, everymarker, status)
    
    });

});

new google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
    $("#panel").hide();
    mapdetails.innerHTML="";
  });

}

//This is the details I want returned on the infowindow.
function showDetails(placeResult, everymarker, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let rating = "None";
        if (placeResult.rating) rating = placeResult.rating;
        infowindow.setContent('<div><strong>' + placeResult.name +
          '</strong><br>' + 'Rating: ' + rating + '</div>');
        infowindow.open(everymarker.map, everymarker);
      } else {
        console.log('showDetails failed: ' + status);
      }
    }

    


//This function handles the results returned and the status of the data returned.
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) 
    {
      createMarker(results[i]);
    }
  }
}

//returns photos when marker is clicked.
function showPhotos(place){
    var cartDiv = document.createElement('div');
    mapdetails.appendChild(cartDiv);

 
// returns the information in the bottom panel bar that pops up when marker is clicked.
         let photos="None";
    if(place.photos){firstPhoto = place.photos[0];
    let photo = document.createElement('img');
    photo.src = firstPhoto.getUrl({maxWidth: 300, maxHeight: 500});
   cartDiv.appendChild(photo);}else {
        console.log('showDetails failed: ' + status);
   } 

    let name = document.createElement('h1');
    name.textContent = place.name;
    cartDiv.appendChild(name);
    if (place.rating != null) {
    let rating = document.createElement('p');
    rating.textContent = `Rating: ${place.rating} \u272e`;
    cartDiv.appendChild(rating);
    }
    if(place.vicinity){
   let address = document.createElement('p');
    address.textContent = place.vicinity;
    cartDiv.appendChild(address);}
    if(place.opening_now){
        let openinghours=document.createElement("p");
        openinghours.textContent = place.opening_now;
    cartDiv.appendChild(openinghours);
    }
}

    






    


  



   


    


 

