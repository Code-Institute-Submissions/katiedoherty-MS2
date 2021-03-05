  function initMap(){
            var map = new google.maps.Map(document.getElementById("map-canvas"),{
                zoom:7,
                center:{
                    lat:53.41291,
                    lng:-8.24389
                }
            });

            if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    }

        }

