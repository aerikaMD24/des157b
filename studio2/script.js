(function(){
    'use strict';
    console.log('reading js');

    const pickYear = document.querySelector('#years');
    const months16 = document.querySelector('#months16');
    const months17 = document.querySelector('#months17');
    const months18 = document.querySelector('#months18');
    const allMonths = document.querySelectorAll('input');

    async function getData(){
        const myPoems = await fetch('data/data.json');
        const data = await myPoems.json();
        changeSpeed(data);
        
    }

    getData();


    console.log(allMonths);

    function changeSpeed(data) {
        allMonths.forEach(function(eachMonth){
            eachMonth.addEventListener('click', function(){
                if (eachMonth.checked === true) {
                    data.forEach(function(eachPoint){
                        if (eachMonth.id === eachPoint.date) {
                            console.log(eachPoint.count)
                            let speed;
                            if (eachPoint.count === 0) {
                                speed = 0;
                            } else {
                                speed = 10 / eachPoint.count;
                            }
                            console.log(speed);
                            document.querySelector('img').style.animationDuration = '1s';
                            document.querySelector('img').style.animationDuration = speed +'s';
                        };
                    })
                    
                }
            })
            
        })
    }
    
    

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
    document.querySelector('button').addEventListener('click', function(){
        document.querySelector('img').style.animationDuration = '1s';
    })

    // document.getElementById("mar17").checked = true;
    
    
}())