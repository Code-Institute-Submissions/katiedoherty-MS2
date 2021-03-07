  //GEOLOCATION API
 
 let marker;
  let map;
  let Ireland;
  let service;
  let pos;
  
 function initMap(){
      
            map = new google.maps.Map(document.getElementById("map-canvas"),{
                zoom:15,
                center:{
                    lat:53.41291,
                    lng:-8.24389
                }
            });

           
             if (navigator.geolocation){

            navigator.geolocation.getCurrentPosition(function(p){
                
           marker = new google.maps.Marker({
                map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                
                position: {
            lat: p.coords.latitude,
            lng: p.coords.longitude,
          },});
          
          marker.setAnimation(google.maps.Animation.BOUNCE);
          
          

            const contentString= `<p>You Are Here</p>`
            const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });
            map,
  
  console.log(
    infowindow.open(map, marker)
  );

  getRestaurants(location);
  
            });
        
        }

        
             }

             function getRestaurants(position){
                 var pyrmont= new google.maps.LatLng(location.lat, location.long);
                 var request={
                     location: pyrmont,
                     radius:1500,
                     type:["restaurant"]
                 };

                 service = new google.maps.places.PlacesService(map);
                 service.nearbySearch(request, callback);
             }

             function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
   
  }
}



             

            




       
    
