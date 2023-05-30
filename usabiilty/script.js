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

    var SealIcon = L.Icon.extend({
        options: {
            // find a shadow, adjust size details
            // shadowUrl: 'images/leaf-shadow.png',
            iconSize:     [100, 100],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });

    // creating all icons

    mondaviIcon = new SealIcon({iconUrl: 'images/mondavi.png'}),
    eggIcon = new SealIcon({iconUrl: 'images/egghead.png'});

    // Markers
    var marker = L.marker([38.5343, -121.7492], {icon: mondaviIcon}).addTo(map);
    marker.bindPopup('Mondavi Center');

    var marker = L.marker([38.531, -121.76], {icon: mondaviIcon}).addTo(map);
    marker.bindPopup('Arboretum');
    
    var marker = L.marker([38.5377, -121.7494], {icon: eggIcon}).addTo(map);
    marker.bindPopup("'Eye on Mrak' Egghead"); 
    
    
    // Routing
    let walking;
    document.querySelector('#drive').addEventListener('click', function(){
        walking = false;
        route();
    });
    document.querySelector('#walk').addEventListener('click', function(){
        walking = true;
        route();
    });

    // You're here! Message
    let id;
    let target;
    let options;

    function reach(pos) {
        const crd = pos.coords;

        if (target.lat <= crd.latitude + 0.00025 && target.lat >= crd.latitude - 0.00025 && target.long <= crd.longitude + 0.00005 && target.long >= crd.longitude - 0.00005) {
            console.log("Congratulations, you reached the target");
            document.querySelector('#arrival').className = 'showing';
            navigator.geolocation.clearWatch(id);
            } else {
                // console.log(`nope lat:${crd.latitude}, tarLat: ${target.lat}`);
                // console.log(`nope long:${crd.longitude}, tarLong: ${target.long}`);
            }
        }

    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    }

    target = {
        // Target Location of th front of Shild's Library
        lat: 38.53950,
        long: -121.75000
    }

    // ~~~

    function arrival() {
        id = navigator.geolocation.watchPosition(reach, error, options);
    }

    

    function route() {
        arrival();
        
        // Walking directions using MAPBOX
        var wrouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
            profile: 'mapbox/walking',
            urlParameters: {
                vehicle: 'foot'
            }
        });

        // Driving directions using MAPBOX
        var drouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
            profile: 'mapbox/driving',
            urlParameters: {
                vehicle: 'car'
            }});

        let thisRoute;
        let mapbox;
        if (walking == true) {
            thisRoute = wrouter;
            mapbox = 'mapbox/walking';
        } else {
            thisRoute = drouter;
            mapbox = 'mapbox/driving';
        }

        

        // If user allows geolocation...
        if ("geolocation" in navigator) {

            document.querySelector('#load').className = 'showing';
            setTimeout(function(){
                document.querySelector('#load').className = 'hidden';
            }, 5000)

            const footprint = setInterval(function(){

            }, 1000)
            

            const way = setInterval(function(){
                navigator.geolocation.getCurrentPosition((position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    

                    console.log(`currLat: ${latitude} and currLong: ${longitude}`)

                    let you = L.marker([latitude, longitude], {icon: eggIcon}).addTo(map).bindPopup("YOU.");

                    // // Walking route applied using LEAFBOX OUTING MACHINE
                    var routingWay =  L.Routing.control({
                        waypoints: [
                            L.latLng(38.53950, -121.75000),
                            L.latLng(latitude, longitude)
                        ],
                        router: thisRoute,
                        profile: mapbox
                    }).addTo(map);

                    setInterval(function(){
                        map.removeLayer(you);
                        map.removeControl(routingWay);
                    }, 5000)
                })
            }, 5000)
            
            document.querySelector('#arrival button').addEventListener('click', function(){
                clearInterval(way);
            })

          } else {
            console.log('Sorry, your browser does not support Geolocation API')
          }
    }

    document.querySelector('#arrival button').addEventListener('click', function(){
        document.querySelector('#arrival').className = 'hidden';
    })







    

    

    

}())