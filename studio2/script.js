(function(){
    'use strict';
    console.log('reading js');

    const pickYear = document.querySelector('#years');
    const months16 = document.querySelector('#months16');
    const months17 = document.querySelector('#months17');
    const months18 = document.querySelector('#months18');
    const allMonths = document.querySelectorAll('input');

    async function getPoemNo(index){
        const myPoems = await fetch('data/data.json');
        const data = await myPoems.json();
        console.log(data[index])
        return data[index]
    }

    console.log(getPoemNo(7));

    // const pls = getPoemNo(7);
    // console.log(pls)

    console.log(allMonths);
    
    allMonths.forEach(function(eachMonth){
        console.log('tets')
        eachMonth.addEventListener('click', function(){
            if (eachMonth.checked === true) {
                console.log(eachMonth);
                for (let i = 0; i < allMonths.length; i++) {
                    if (allMonths[i] === eachMonth) {
                        const data = getPoemNo(i);
                        console.log(data)
                    }
                }
            }
        })
        
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
    document.querySelector('button').addEventListener('click', function(){
        document.querySelector('img').style.animationDuration = '1s';
    })

    // document.getElementById("mar17").checked = true;
    
    
}())