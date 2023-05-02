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
        changeMonth(data)
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



    // document.getElementById("mar17").checked = true;
    

    
}())