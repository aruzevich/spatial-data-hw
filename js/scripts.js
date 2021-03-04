mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1emV2aWNoIiwiYSI6ImNrbGxmdWVlcjBjdHcyb28xNjg5eDF4emUifQ.FbhpNLumz5b3vCmPI5-4Hw';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.96969, 40.77807], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

map.on('style.load', function() {
  // add GeoJSON source - change "some id" name, link to online or local file in data:
  map.addSource('some id', {
    type: 'geojson',
    data: ''
  });

  // add layer to style and display source function
  map.addLayer({
    'id': 'some-id-fill',
    'type': 'fill',
    'source': '',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });
})
