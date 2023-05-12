(function(){
    'use strict';

    // City of Davis Origin Point for Map 38.545, -121.74 13.5
    var map = L.map('map').setView([38.545, -121.74], 13.5);

    // Open street Map Tiling
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(map);

    // test buttons w/i popupss for temporary local storage testing

    var marker = L.marker([38.5343, -121.7492]).addTo(map);
    marker.bindPopup('Mondavi Center <button id="clear">clear</button>');

    var marker = L.marker([38.531, -121.76]).addTo(map);
    marker.bindPopup('Arboretum <button id="local">test</button>');
    
    var marker = L.marker([38.5377, -121.7494]).addTo(map);
    marker.bindPopup("'Eye on Mrak' Egghead");

    // LOCAL STORAGE TEST RUN HERE

    // If no local storage data has been set, default to false
    if (localStorage.getItem('bool') == null) {
        localStorage.setItem('bool', 'false');
    }

    // Print to console whether local storage data was stored
    function loca() { 
        console.log('you clicked test,', localStorage.getItem('bool'));
    }
    // Call function when window first opened
    loca();

    
    document.addEventListener('click', function(e){
        //  Change boolean to true when test button clicked
        if (e.target.matches('#local')) {
            localStorage.setItem('bool', 'true');
            loca();
        }

        // Clear local storage data completely
        if (e.target.matches('#clear')) {
            // console.log('clear clicked');
            loca();
            localStorage.clear();
        }

    }, false)

    
}());