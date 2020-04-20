const map = L.map('map').setView({lat: 29.26805652909215, lng: 30.942992869120395}, 8);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// Mapbox Tile
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVoYW1lZHlvdXNzZWYiLCJhIjoiY2s3cnBhdG00MGVtajNucWQyeDZhanVqdiJ9.ejPNZfqzS3AY0ctYG_4zeg'
}).addTo(map);


map.on('click', e => console.log(e.latlng));



// Custom icons
const locationIcon = L.icon({iconUrl: static('img/location-icon.svg'), iconSize: [30, 30]});
const subwayIcon = L.icon({iconUrl: static('img/subway-solid.svg'), iconSize: [30, 30]});




// Hold all properties
let properties;




// reverse the latlong array
const getLongLat = latLongArr => [latLongArr[1], latLongArr[0]];



// Map functions
// Handlers for the map
function propertyClicked(feature, layer) {
  map.flyTo(getLongLat(feature.geometry.coordinates), 14)
  panelControl.show(feature, layer)

  // mark as active
  activeState.layer = layer;
}

function pointToLayer(feature, latlng) {
  return L.marker(latlng, {icon:locationIcon})
}

function onEachFeature(feature, layer) {
  layer.on('click', () => propertyClicked(feature, layer))
};


// Get the properties from API
async function fetchProperties(url, params={}) {
  const response = await axios(url);
  const data = JSON.parse(response.data);

  properties = L.geoJSON(data, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });


  properties.addTo(map);
}







// Feature property
async function featureProperty(url, element) {
  if (activeState.layer.feature.properties.pk == element.dataset.id && activeState.isFeatured) return

  const res = await axios(`${url}?pk=${element.dataset.id}`);
  const data = JSON.parse(res.data)
  justShowOnMap(data)

  // Draw a circle arount the featured property and show paths to POIs
  drawArea(getLongLat(activeState.layer.feature.geometry.coordinates), 1000 * 5)
  drawPaths()
  
  activeState.isFeatured = true;
}


// Draw area around the property to search for POI in it
function drawArea(center, radius) {
  activeState.area = L.circle(center, radius).addTo(map);
  map.fitBounds(activeState.area.getBounds(), paddingTopLeft=[0,-200]);
}

// Draw paths   NOT TESTED YET!!!
function drawPaths() {
  const propertyCoords = activeState.layer.feature.geometry.coordinates;
  for (layer in activeState.features._layers) {
    const POICoords = activeState.features._layers[layer].feature.geometry.coordinates;
    L.Routing.control({
      serviceUrl: 'http://router.project-osrm.org/route/v1',
      waypoints: [propertyCoords, POICoords],
      fitSelectedRoutes: false,
      lineOptions: {
        styles: [{color: '#ffca00', opacity: 1, weight: 5}]
      },
      createMarker: function() { return null; },
      routeWhileDragging: true
    }).addTo(map);

  }
};





// Just show on map
function justShowOnMap(data) {
  activeState.features = L.geoJSON(data, {
    pointToLayer: (feature, latlng) => {
      return L.marker(latlng, {icon:subwayIcon})
    },
  }).addTo(map);
}
