let map;
let service;
let pos;
let geomaker;
let infowindow;
let infopane;
let mapdetails;
let writtendetails;
let request;




/************************This lods the geolocation API and Google Places API at the same time.**********************************************/
new google.maps.event.addDomListener(window, 'load', initMap);

 /******************************************This function renders the map.**********************************************/
function initMap() {

//need to call the geolocation and initMap function at the same time for them to load together.
    GeoLoco();

//This is to hide the bottom panel that contains more detailed information about the location
    $("#panel").hide();


    writtendetails= document.getElementById("mapwrittendetails");
    infoPane = document.getElementById('panel');
    mapdetails=document.getElementById("placedetails");
    getdirections=document.getElementById("getdirections");
    var latmap = new google.maps.LatLng(53.41291, -8.24389);


    map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 15,
        center: latmap
    });}



/***************************************function to get the users location*********************************/
function GeoLoco(){if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(p) {

            //users location
            pos = {
                lat: p.coords.latitude,
                lng: p.coords.longitude,
                
            };

             //This will center the map on the users location
             map.setCenter(pos);

            //This variable creates the users location marker with the markers animation.
            var marker = new google.maps.Marker({

                draggable: false,
                animation: google.maps.Animation.DROP,
                position: pos
            });


            marker.setAnimation(google.maps.Animation.BOUNCE);
            
            // infowindow with content written in the function.
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent('You are Here');
            console.log(
            infowindow.open(map, marker)
            );
            if(request==="none"){alert("There are no restaurants near you")}else{getrestaurant(pos)}
          
        });
        
    }else{
        alert("Sorry, we could not find your location. Please refresh the page and try again.");
    }
}


/******************************Gathers nearby places to the users location*****************************************/
function getrestaurant(pos) {
    
     //Gathers the data 
     var pyrmont = new google.maps.LatLng(pos.lat, pos.lng);
        request = {
        location: pyrmont,
        radius: 500,
        type: ["restaurant"]
    };

    
     //Calls all the services that were searched and only returns the nearby restaurants.
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch(request, callback);
    }

         

/************************************Creates the markers on the map****************************************/
function createMarker(place){
    
     //Gathers the latitude and longitude of the places returned 
     geomarker = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

     //Creates the markers and positions them on the co-ordinates returned.
     var everymarker= new google.maps.Marker({
     position: geomarker,
     map: map});
     console.log(place);

/***************************Infowindow, directions button and bottom panel returned when a marker is clicked*******************************/
     new google.maps.event.addListener(everymarker, 'click', () => {
     map.setZoom(19);
     map.panTo(everymarker.position);
     $("#panel").show();
     infoPane.classList.add("open");
     $("#directionbutton").show();
     
     
     //This is the circle button that says "Tap to zoom out"
     var clickscreen= document.getElementById("mouseclick");
     clickscreen.innerHTML="Tap to"+`<br>`+"zoom out";
     clickscreen.classList.add("mouse");
     clickscreen.classList.add("circlebase");
     clickscreen.onclick= function(){
     infowindow.close();
     $("#directionbutton").hide();
     $("#panel").hide();
     mapdetails.innerHTML="";
     writtendetails.innerHTML="";
     map.setZoom(16);
     };
     
    //the get directions button.
    var element3 = document.getElementById("getdirections");
    element3.type = "button";
    element3.name = "add";
    element3.value="Remove";
    element3.className="btn btn-primary btn-lg";
    element3.innerHTML=`<i class="fas fa-directions"></i>`+" "+"Get Directions";
    element3.classList.add("directions");
    element3.onclick= function(){
      window.open("https://www.google.com/maps/dir/?api=1&travelmode=walking&layer=traffic&destination="+everymarker.position+"");

  };
   
    //Clears all the previous information when another marker is selected
    if (mapdetails.firstChild) {
    mapdetails.removeChild(mapdetails.firstChild);
    }
    showPhotos(place);
    if (writtendetails.firstChild){
        writtendetails.removeChild(writtendetails.firstChild);
    }
    Details(place);
    
    
    //requesting the information I want on the infowindow when a marker is clicked
    let request2 = {
    placeId: place.place_id,
    fields: ['name', 'rating']
    };

    
    service.getDetails(request2, (placeResult, status) => {
    showDetails(placeResult, everymarker, status);
    
    });

});

/******************When the map is clicked all the elements that were returned will be cleared from the map*************************/
new google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
    $("#directionbutton").hide();
    $("#panel").hide();
    mapdetails.innerHTML="";
    writtendetails.innerHTML="";
    map.setZoom(16);
  });
}
   



/************************These are the details that show up on the infowindow when a marker is clicked**********************/
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

    


/******************This function handles the results returned and the status of the data returned.********************/
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) 
    {
      createMarker(results[i]);
    }
  }
}

/************************************Responsible for returning the photos ***********************************/
function showPhotos(place){
    var cartDiv = document.createElement('div');
    mapdetails.appendChild(cartDiv);
    if(place.photos){firstPhoto = place.photos[0];
    let photo = document.createElement('img');
    photo.src = firstPhoto.getUrl({maxWidth: 300, maxHeight: 250});
    cartDiv.appendChild(photo);}else {
        console.log('showDetails failed: ' + status);
    let nophoto= document.createElement("div");
    nophoto.innerHTML="No Photos";
    nophoto.classList.add("nophoto");
    cartDiv.appendChild(nophoto);
   } 
}

/***********************************Returns all the written detials in the bottom panel ********************************/
   function Details(place){
    var details = document.createElement('div');
    writtendetails.appendChild(details);

    let name = document.createElement('h1');
    name.textContent = place.name;
    details.appendChild(name);
    if (place.rating != null) {
    let rating = document.createElement('p');
    rating.innerHTML = `Rating: ${place.rating}`+" "+`<i class="fas fa-star"></i>`;
    details.appendChild(rating);
    }
    if(place.vicinity){
    let address = document.createElement('p');
    address.textContent = place.vicinity;
    details.appendChild(address);}
        if(place.business_status==="OPERATIONAL"){
            let openinghours=document.createElement("p");
            openinghours.textContent = "We are open and ready to take your order";
            details.appendChild(openinghours);
        }else if(
            place.business_status==="CLOSED_TEMPORARILY"){
                let notopen=document.createElement("p");
                notopen.textContent="Sorry, we are closed temporarily.";
                details.appendChild(notopen);
        }
     
    }

