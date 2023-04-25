(function(){
    'use strict';
    console.log('reading js');

    // Basic Elements
    const btn = document.querySelector('#button');
    const btnPress = document.querySelector('#press');
    const video = document.querySelector('#myVideo');
    const instructions = document.querySelector('#instructions')
    const source = document.querySelector('source');
    const not = document.querySelector('#not');

    // Random test subject number
    const randNum = Math.ceil((Math.random() * 90) + 9)
    const nums = document.querySelectorAll('.num');
    for (let i = 0; i < nums.length; i++) {
        nums[i].innerHTML = randNum;
    }

    // For the loading icon
    const loading = document.querySelector('#glasses');
    video.addEventListener('playing', function(){
        loading.className = 'hidden';
    })

    // Intro text
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');

    const intro = {
        start: [0, 4, 9],
        stop: [4, 9, 13],
        line: [line1, line2, line3]
    }

    // Time Checking
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

    // When the Intro video ends... go to the loop
    video.addEventListener('ended', goToLoop);

    function goToLoop() {
        hideAll();
        instructions.innerHTML = '<span class="red">Remember: Do not touch anything!</span>';

        source.setAttribute('src', 'media/loop.mp4');
        video.load();
        video.play();
        video.setAttribute('loop', 'loop');

        btn.className = 'showing';
    }
    
    // When button is pressed... (even though I said not to touch anyhting)
    btn.addEventListener('click', function(){

        // button presssing 
        btnPress.style.top = '50%';
        setTimeout(function(){
            btnPress.style.top = '40%';
        }, 500)

        if(source.getAttribute('src') === 'media/static.mp4' || source.getAttribute('src') === 'media/static.webm') {
            instructions.innerHTML = '<span class="red">Inititating Time Reset Sequence... </span><i> (Try not to touch anything this time?)</i>';
            setTimeout(function(){
                location.reload();
            }, 5000)
        } else {
            hideAll();
        video.removeAttribute('loop');
        instructions.innerHTML = '<span class="red">Inititating Earthquake Sequence... </span><i> (What happened to not touching anything?)</i>';

        

        // tilt the video like an earthquacke
        video.className = 'tilted';
        setTimeout(function(){
            video.classList.remove('tilted');
        }, 10000)

        // play earthquack video when button is clicked
        source.setAttribute('src', 'media/sequence.mp4');
        video.load();
        video.play();
        video.addEventListener('ended', goToStatic);
        }

    })

    

    

    function goToStatic() {
        hideAll();
        instructions.innerHTML = 'Well, there goes the experiment.. <i>Great job</i>';
        not.innerHTML = 'NOT';
        not.className ='red';
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
    
    


})()