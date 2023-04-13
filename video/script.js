(function(){
    'use strict';
    console.log('reading js');

    const btn = document.querySelector('button');
    const video = document.querySelector('#myVideo');

    btn.addEventListener('click', function(){
        // video.style.animation = 'tilt 2s 1s';
        video.className = 'tilted';
        console.log('tilt');
        setTimeout(function(){
            video.classList.remove('tilted');
        }, 2000)
    })

})()