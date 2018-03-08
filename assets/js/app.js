function initMap() {
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        elementType: 'geometry',
        stylers: [{ color: '#ebe3cd' }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#523735' }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#f5f1e6' }]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#c9b2a6' }]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#dcd2be' }]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ae9e90' }]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#93817c' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#a5b076' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#447530' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#f5f1e6' }]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#fdfcf8' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#f8c967' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#e9bc62' }]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{ color: '#e98d58' }]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#db8555' }]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#806b63' }]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8f7d77' }]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#ebe3cd' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#b9d3c2' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#92998d' }]
      }
    ],
    { name: 'Styled Map' });

  // centrar mapa en laboratoria    
  var laboratoria = {
    lat: -33.4190406,
    lng: -70.6438986
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: laboratoria,
    // se agregan estilos de mapa
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map']
    }
  });
  // Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  // Colocamos el marcador para el mapa
  var imagen = 'https://icon-icons.com/icons2/634/PNG/48/vehicle-bicycle-2_icon-icons.com_58766.png';
  var markadorLaboratoria = new google.maps.Marker({
    position: laboratoria,
    map: map,
    icon: imagen
  });

  /*   var markadorLaboratoria = new google.maps.Marker({
    position: laboratoria,
    map: map
  }); */

  // Buscarmos la posicion con el boton encuentrame
  function buscar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  var latitud, longitud;

  var funcionExito = function (posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {
        lat: latitud,
        lng: longitud
      },
      map: map
    });

    map.setZoom(18);
    map.setCenter({
      lat: latitud,
      lng: longitud
    });
  };

  var funcionError = function (error) { // funcionError con un mensaje para el usuario, en caso de que nuestra geolocalización falle.
    alert('Tenemos un problema con encontrar tu ubicación');
  };

  document.getElementById('encuentrame').addEventListener('click', buscar);

  /* inputs con autocompletado */
  var inputPartida = document.getElementById('punto-partida');
  var inputDestino = document.getElementById('punto-destino');

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  // traza la ruta desde inicio hasta el destino
  var calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta');
      }
    });
  };
  directionsDisplay.setMap(map);
  var trazarRuta = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);
};