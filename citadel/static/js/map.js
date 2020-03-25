// var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map').setView({lat: 29.26805652909215, lng: 30.942992869120395}, 8);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// Mapbox Tile
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVoYW1lZHlvdXNzZWYiLCJhIjoiY2s3cnBhdG00MGVtajNucWQyeDZhanVqdiJ9.ejPNZfqzS3AY0ctYG_4zeg'
}).addTo(map);



map.on('click', e => console.log(e.latlng));




// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});




// Show panel
function showPanel(feature) {
  // Show the panel
  const panel = document.querySelector('.panel')
  panel.classList.remove('d-none');

  // A little edit before filling the data
  if (typeof feature.properties.price == 'number') {
    feature.properties.price = formatter.format(feature.properties.price)
  }

  // Fill the panel
  Object.keys(feature.properties).forEach(key => {
    element = panel.querySelector(`.${key}`);

    if (element) {
      element.innerText = feature.properties[key]
    }
  })
  
}


// Hide panel
document.querySelectorAll('.closePanel').forEach(closePanel => {
  closePanel.addEventListener('click', e => document.querySelector('.panel').classList.add('d-none'))
})