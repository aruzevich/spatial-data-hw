mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1emV2aWNoIiwiYSI6ImNrbGxmdWVlcjBjdHcyb28xNjg5eDF4emUifQ.FbhpNLumz5b3vCmPI5-4Hw';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.97781, 40.657], // starting position [lng, lat]
  zoom: 9.5 // starting zoom
});

// add navigation control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

map.on('style.load', function() {
  // add GeoJSON source
  map.addSource('foreverwild', {
    type: 'geojson',
    data: 'data/forever-wild-preserves.geojson'
  });

  // add layer to style and display source; id different from source id
  map.addLayer({
    'id': 'foreverwild-fill',
    'type': 'fill',
    'source': 'foreverwild',
    'layout': {},
    'paint': {
      'fill-color': '#285e00',
      // 'fill-outline-color': '#ccc',
      'fill-opacity': 0.8
    }
  });
})

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mousemove', function(e) {
  //query for features under the mouse
  var features = map.queryRenderedFeatures(e.point, {
      layers: ['foreverwild-fill'],
  });

  if (features.length > 0) {
    // show the popup, populate the popup, and set its coordinates based on the feature found.
    map.getCanvas().style.cursor = 'pointer';

    var feature = features[0]
    var park = feature.properties.parkname
    var acres = feature.properties.acres
    var trail = feature.properties.Trail_Name
    var topography = feature.properties.Topo
    var surfaceType = feature.properties.Surface

    var popupContent = `
      <div>
        <b>${park}</b><br/>
        Acreage: ${acres}<br/>
        Trail Name: ${trail}<br/>
        Trail Type: ${topography}<br/>
        Surface: ${surfaceType}
      </div>
    `

    popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);
  } else {
    // hide the Popup
    popup.remove();
    map.getCanvas().style.cursor = 'grab';
  }
})
