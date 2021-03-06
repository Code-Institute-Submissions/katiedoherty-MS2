  let marker;
  
  function initMap(){
            var map = new google.maps.Map(document.getElementById("map-canvas"),{
                zoom:7,
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
            const contentString= `<p>You Are Here</p>`
            const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });
            map,
  
  console.log(
    infowindow.open(map, marker)
  );
            });}

             }

       
    
