//
// Show the top 25 most expensive AirBnB rentals in Sydney
// using CartoDB's SQL API.
//

$(document).ready(function () {
  // Create a map centered on NYC
  var map = L.map('map').setView([-33.86,151.20], 10);
  var dataLayer;
  
  // Add a base layer. We're using Stamen's Toner:
  //  http://maps.stamen.com/#toner
  L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    maxZoom: 18
}).addTo(map);
  
  // Ask CartoDB for the top 25 most expensive features, as GeoJSON
  var url = 'https://clzirkel.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT * FROM listings ORDER BY price DESC LIMIT 10',
    format: 'GeoJSON'
  });
  $.getJSON(url)
  
    // When it's done, add the results to the map
    .done(function (data) {
      dataLayer = L.geoJson(data).addTo(map);   
    });
  
  $('.limit').change(function () {
    var url = 'https://clzirkel.cartodb.com/api/v2/sql?' + $.param({
      q: 'SELECT * FROM listings ORDER BY price DESC LIMIT ' + $(this).val(),
      format: 'GeoJSON'
    });
    $.getJSON(url)

      // When it's done, add the results to the map
      .done(function (data) {
        dataLayer.clearLayers();
        dataLayer.addData(data);
      });
  });
});
