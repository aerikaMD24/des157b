(function(){
    'use strict';
    console.log('reading js');

    const pickYear = document.querySelector('#years');
    const months16 = document.querySelector('#months16');
    const months17 = document.querySelector('#months17');
    const months18 = document.querySelector('#months18');
    const allMonths = document.querySelectorAll('input');

    document.querySelector('button').addEventListener('click', function(){
        document.querySelector('#intro').className = 'hidden';
        play();
    })

    pickYear.addEventListener('change', function(){
        const year = this.value;
        if (year === 'sixteen') {
            months16.className = 'showMonths';
            months17.className = 'hidden';
            months18.className = 'hidden';
        }
        if (year === 'seventeen') {
            months16.className = 'hidden';
            months17.className = 'showMonths';
            months18.className = 'hidden';
        }
        if (year === 'eighteen') {
            months16.className = 'hidden';
            months17.className = 'hidden';
            months18.className = 'showMonths';
        }
        
    })

    async function getData(){
        const myPoems = await fetch('data/data.json');
        const data = await myPoems.json();
        changeMonth(data);
    }

    getData();

    function changeMonth(data) {
        allMonths.forEach(function(eachMonth){
            eachMonth.addEventListener('click', function(){
                if (eachMonth.checked === true) {
                    data.forEach(function(eachPoint){
                        if (eachMonth.id === eachPoint.date) {
                            changeSpeed(eachPoint);
                            poemStats(eachPoint);
                            keywords(eachPoint);
                        };
                    })
                    
                }
            })
            
        })
    }

    function changeSpeed(eachPoint) {
        let speed;
        if (eachPoint.count === 0) {
            speed = 0;
        } else {
            speed = 10 / eachPoint.count;
        }
        document.querySelector('img').style.animationDuration = '1s';
        document.querySelector('img').style.animationDuration = speed +'s';
    }

    function poemStats(eachPoint) {
        document.querySelector('#stat').style.zIndex = 0;
        if (eachPoint.count !== 1) {
            document.querySelector('#stat').innerHTML = `${eachPoint.count} poems`
        } else {
            document.querySelector('#stat').innerHTML = `${eachPoint.count} poem`
        }
        setTimeout(function(){
            if (eachPoint.count !== 0) {
                document.querySelector('#stat').style.zIndex = -1;
            }
        }, 500)
    }

    function keywords(eachPoint){
        if (eachPoint.count !== 0) {
            document.querySelector('#keyword1').innerHTML = eachPoint.keywords[0];
            document.querySelector('#keyword2').innerHTML = eachPoint.keywords[1];
            document.querySelector('#keyword3').innerHTML = eachPoint.keywords[2];
            document.querySelector('#keyword1').style.animationDuration = '2s';
            document.querySelector('#keyword2').style.animationDuration = '2s';
            document.querySelector('#keyword3').style.animationDuration = '2s';
        } else {
            document.querySelector('#keyword1').style.animationDuration = '0s';
            document.querySelector('#keyword2').style.animationDuration = '0s';
            document.querySelector('#keyword3').style.animationDuration = '0s';
        }
        
    }

    function play() {
        const dates = ["jan16", "feb16", "mar16", "apr16", "may16", "jun16", "jul16", "aug16", "sep16", "oct16", "nov16", "dec16", "jan17", "feb17", "mar17", "apr17", "may17", "jun17", "jul17", "aug17", "sep17", "oct17", "nov17", "dec17", "jan18", "feb18", "mar18", "apr18", "may18", "jun18", "jul18", "aug18", "sep18", "oct18", "nov18", "dec18"];
        console.log('play')
        for (let i = 0; i < dates.length; i++) {
            setTimeout(function(){
                console.log(`check ${dates[i]}`)
                // document.querySelector(dates[i]).checked = true;
            }, 1000)
        }
    }
    
    
}())