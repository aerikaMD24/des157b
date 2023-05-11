(function(){
    'use strict';

    // City of Davis Origin Point for Map 38.545, -121.74 13.5
    var map = L.map('map').setView([38.545, -121.74], 13.5);

    // Open street Map Tiling
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(map);

    var marker = L.marker([38.5343, -121.7492]).addTo(map);
    marker.bindPopup("Mondavi Center");

    

    var marker = L.marker([38.531, -121.76]).addTo(map);
    marker.bindPopup("Arboretum");
    
    var marker = L.marker([38.5377, -121.7494]).addTo(map);
    marker.bindPopup("'Eye on Mrak' Egghead");

    
}());