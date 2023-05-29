(function(){
    'use strict';
    console.log('reading js');

    // City of Davis Origin Point for Map (38.545, -121.74 13.5)
    var map = L.map('map').setView([38.538, -121.75], 15);

    // Open street Map Tiling
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(map);

}())