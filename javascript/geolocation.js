  //GEOLOCATION API
 
 let marker;
  let map;
  let service;
  let pos;


 
  
 function initMap(){
     

    var latmap = new google.maps.LatLng(53.41291,-8.24389);

      
            map = new google.maps.Map(document.getElementById("map-canvas"),{
                zoom:13,
                center:latmap
            });

           
             if (navigator.geolocation){

            navigator.geolocation.getCurrentPosition(function(p){

                pos={
            lat: p.coords.latitude,
            lng: p.coords.longitude,
          }
                
           marker = new google.maps.Marker({
                map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                
                position: pos});
         
          
          marker.setAnimation(google.maps.Animation.BOUNCE);
          getRestaurants(pos);
          

            const contentString= `<p>You Are Here</p>`
            const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });
            map,
  
  console.log(
    infowindow.open(map, marker)
  );

  
  
  
            });
            
        
        }

        
             }

             function getRestaurants(pos){
                 var pyrmont= new google.maps.LatLng(pos.lat, pos.lng);
                 var request={
                     location: pyrmont,
                     radius:500,
                     type:["restaurant"]
                 };

                 service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);
             }

              function createMarker(){
                 
                new google.maps.Marker({
                map,
                draggable: false,
                animation: google.maps.Animation.DROP,
                
                position: pos.request.callback});
             }

             function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) 
    {
     createMarker(results[i]);
    }
  
  }

}



             

            




       
    
