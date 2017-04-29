var map;
function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(42.8474817, -106.2569397)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
      var marker = new google.maps.Marker({
        map: map,
        title: "Mi marcador",
        position: map.getCenter()
      });
      

      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent('<b>Get Direction</b>');

      infowindow.open(map, marker);


      google.maps.event.addListener(marker, 'click', function() {
        var url="https://www.google.com/maps/dir//5091+E+2nd+St,+Casper,+WY+82609/@42.8474817,-106.2569397,17z/data=!4m16!1m7!3m6!1s0x8760bbfc32e68569:0x14418e9e6f87622f!2s5091+E+2nd+St,+Casper,+WY+82609!3b1!8m2!3d42.8474817!4d-106.254751!4m7!1m0!1m5!1m1!1s0x8760bbfc32e68569:0x14418e9e6f87622f!2m2!1d-106.254751!2d42.8474817";
        var win = window.open(url, '_blank');
      });
     
}

google.maps.event.addDomListener(window, 'load', initialize);