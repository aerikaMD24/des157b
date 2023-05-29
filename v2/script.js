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

    // Markers
    var marker = L.marker([38.5343, -121.7492]).addTo(map);
    marker.bindPopup('Mondavi Center');

    var marker = L.marker([38.531, -121.76]).addTo(map);
    marker.bindPopup('Arboretum');
    
    var marker = L.marker([38.5377, -121.7494]).addTo(map);
    marker.bindPopup("'Eye on Mrak' Egghead"); 
    
    var SealIcon = L.Icon.extend({
        options: {
            // find a shadow, adjust size details
            shadowUrl: 'images/leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });

    // creating all icons

    var greenIcon = new SealIcon({iconUrl: 'images/leaf-green.png'}),
    redIcon = new SealIcon({iconUrl: 'images/leaf-red.png'}),
    orangeIcon = new SealIcon({iconUrl: 'images/leaf-orange.png'});


    // Marking them all on the map with a label
    L.marker([38.5377, -121.7494], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");




    // const appleIcon = L.icon({
    //     iconUrl: 'images/apple.png',
    //     iconSize: [45, 45],
    //     iconAnchor: [22, 94],
    //     shadowAnchor: [4, 62],
    //     popupAnchor: [-3, -76]
    //   });
    // L.marker([38.5467537, -121.7614973], { icon: appleIcon }).addTo(map);
    
    // Routing
    document.querySelector('#drive').addEventListener('click', routeDrive);
    document.querySelector('#walk').addEventListener('click', routeWalk);

    // Driving Route
    function routeDrive(){
            
        // Driving directions using MAPBOX
        var drouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
        profile: 'mapbox/driving',
        urlParameters: {
            vehicle: 'car'
        }});

        // If user allows geolocation...
        if ("geolocation" in navigator) {

            // Get geolocation 
            navigator.geolocation.watchPosition((position) => {
                let dlatitude = position.coords.latitude;
                let dlongitude = position.coords.longitude;

                // Driving route applied using LEAFBOX OUTING MACHINE
                var routingDrive = L.Routing.control({
                    waypoints: [
                        L.latLng(38.5377, -121.7494),
                        L.latLng(dlatitude, dlongitude)
                    ],
                    router: drouter,
                    profile: 'mapbox/driving'
                }).addTo(map);

                // Getting rid of route (when done?)
                document.querySelector('#endd').addEventListener('click', function(){
                    map.removeControl(routingDrive);
                })

              });
          } else {
            console.log('Sorry, your browser does not support Geolocation API')
          }

    }

    // Walking Route ORIGINAL
    function routeWalk(){
            
        // Walking directions using MAPBOX
        var wrouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
            profile: 'mapbox/walking',
            urlParameters: {
                vehicle: 'foot'
            }
        });

        // If user allows geolocation...
        if ("geolocation" in navigator) {

            // Get geolocation 
            navigator.geolocation.watchPosition((position) => {
                let wlatitude = position.coords.latitude;
                let wlongitude = position.coords.longitude;

                // test dynamic marker
                L.marker([wlatitude, wlongitude], {icon: greenIcon}).addTo(map).bindPopup("YOU.");

                // Walking route applied using LEAFBOX OUTING MACHINE
                var routingWalk =  L.Routing.control({
                    waypoints: [
                        L.latLng(38.5377, -121.7494),
                        L.latLng(wlatitude, wlongitude)
                    ],
                    router: wrouter,
                    profile: 'mapbox/walking'
                }).addTo(map);

                // Getting rid of route (when done?)
                 document.querySelector('#endw').addEventListener('click', function(){
                    map.removeControl(routingWalk);
                })

              });
          } else {
            console.log('Sorry, your browser does not support Geolocation API')
          }
        
    }







    

    

    

}())