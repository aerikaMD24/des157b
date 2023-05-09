(function(){
    'use strict';

    var map = L.map('map').setView([1.352, 103.90], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(map);

    var marker = L.marker([1.352, 103.944]).addTo(map);
    marker.bindPopup("Where my parents worked");
    

    var circle = L.circle([1.315, 103.89], {
        color: 'green',
        fillColor: '#678db1',
        fillOpacity: 0.5,
        radius: 1500
    }).addTo(map);

    circle.bindPopup("This is the area I grew up in and went to school").openPopup();

    var marker = L.marker([1.354, 103.975]).addTo(map);
    marker.bindPopup("<h2>The airport</h2>");

    
}());