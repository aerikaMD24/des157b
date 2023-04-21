(function(){
    'use strict';
    console.log('reading js');

    const btn = document.querySelector('#button');
    const video = document.querySelector('#myVideo');
    const source = document.querySelector('source')
    const randNum = Math.ceil((Math.random() * 90) + 9)

    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');

    const loading = document.querySelector('#glasses')

    const intro = {
        start: [0, 4, 9],
        stop: [4, 9, 13],
        line: [line1, line2, line3]
    }

    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {

        for (let i = 0; i < intro.start.length; i++) {
            if (source.getAttribute('src') == 'media/intro.mp4' || source.getAttribute('src') == 'media/intro.webm') {
                if (intro.start[i] < video.currentTime && video.currentTime < intro.stop[i]) {
                    intro.line[i].className = 'showing';
                } else {
                    intro.line[i].className = 'hidden';
                }
            }
        }
    }
    
    document.querySelectorAll('.num')[0].innerHTML = randNum;
    document.querySelectorAll('.num')[1].innerHTML = randNum;

    btn.addEventListener('click', function(){
        hideAll();
        video.removeAttribute('loop');

        // tilt the video like an earthquacke
        video.className = 'tilted';
        console.log('tilt');
        setTimeout(function(){
            video.classList.remove('tilted');
        }, 10000)

        // play earthquack video when button is clicked
        source.setAttribute('src', 'media/sequence.mp4');
        video.load();
        video.play();
        video.addEventListener('ended', goToStatic);

    })

    video.addEventListener('ended', goToLoop);

    function goToLoop() {
        hideAll();
        source.setAttribute('src', 'media/loop.mp4');
        video.load();
        video.play();
        video.setAttribute('loop', 'loop');
        btn.className = 'showing';
    }

    function goToStatic() {
        hideAll();
        source.setAttribute('src', 'media/static.mp4');
        video.load();
        video.play();
        video.setAttribute('loop', 'loop');
    }

    function hideAll() {
        for (let i = 0; i < 3; i++) {
            intro.line[i].className = 'hidden';
        }
    }
        
    video.addEventListener('playing', function(){
        loading.className = 'hidden';
    })


})()