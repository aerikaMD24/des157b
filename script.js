(function() {
    'use strict';

    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');

    const heart = document.querySelector('#heart');
    const spade = document.querySelector('#spade');


    // Randomly display either GirlyPop or PunkPop when window loads
    if (Math.floor(Math.random() * 2) === 0) {
        girlyPop();
    } else {
        punkPop();
    }

    // Switches when spade/heart is clicked
    spade.addEventListener('click', function(){
        if (body.className = 'punkPop') {
            girlyPop();
        } 
        
    })
    heart.addEventListener('click', function(){
        if (body.className = 'girlyPop') {
            punkPop();
        }
    })

    
    // Theme Functions
    function girlyPop() {
        body.className = 'girlyPop';
        spade.style.display = 'none';
        heart.style.display = 'block';
        banner.src = 'images/girlyPopBanner.jpg';
    }
    function punkPop() {
        body.className = 'punkPop';
        heart.style.display = 'none';
        spade.style.display = 'block';
        banner.src = 'images/punkPopBanner.jpg';
    }


})()