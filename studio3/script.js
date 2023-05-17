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
    marker.bindPopup('Mondavi Center');

    var marker = L.marker([38.531, -121.76]).addTo(map);
    marker.bindPopup('Arboretum');
    
    var marker = L.marker([38.5377, -121.7494]).addTo(map);
    marker.bindPopup("'Eye on Mrak' Egghead");

    // GEOLOCATION TEST HERE

    document.querySelector('#geo').addEventListener('click', function(){
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.querySelector('#coords').innerHTML = ` Your lat: ${latitude}, your long: ${longitude}`;
                console.log(`lat: ${latitude}, long: ${longitude}`);
              });
          } else {
            console.log('Sorry, your browser does not support Geolocation API')
          }

        
    }) 

    // LEAFLET ROUTING MACHINE HERE

    // Actual routing (driving)
    document.querySelector('#drive').addEventListener('click', function(){
        L.Routing.control({
            waypoints: [
                L.latLng(38.5343, -121.7492),
                L.latLng(38.5377, -121.7494)
            ],
        }).addTo(map);
    })

    // Specified WALKING dirctions, makes use of MAPBOX 
    var router = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
        profile: 'mapbox/walking',
        urlParameters: {
            vehicle: 'foot'
        }
    });

    // Actual routing (walking)
    document.querySelector('#walk').addEventListener('click', function(){
        L.Routing.control({
            waypoints: [
                L.latLng(38.5343, -121.7492),
                L.latLng(38.5377, -121.7494)
            ],
            router: router,
            profile: 'mapbox/walking'
        }).addTo(map);
    })

    // LOCAL STORAGE TEST RUN HERE

    // If no local storage data has been set, default to false
    if (localStorage.getItem('bool') == null) {
        localStorage.setItem('bool', 'false');
    }
    document.querySelector('img').style.filter = 'grayscale(100%)';

    // Print to console whether local storage data was stored
    function loca() { 
        console.log('you clicked test,', localStorage.getItem('bool'));
        if (localStorage.getItem('bool') == 'true') {
            console.log('got it')
            document.querySelector('#mondavi').className = 'normal';
        } else {
            document.querySelector('#mondavi').className = 'gray';
        }
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
            localStorage.clear();
            loca();
        }

    }, false)


    // RESET (not local stuff tho)
    document.querySelector('#reset').addEventListener('click', function(){
        location.reload();
    })

    
}());