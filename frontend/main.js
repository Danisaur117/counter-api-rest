document.addEventListener( 'DOMContentLoaded', function () {
    /****************/
    /* Declarations */
    /****************/
    const baseApiUrl = 'http://localhost:4000';
    const counterNode = document.querySelector(".counter");
    const updateCounterDOM = (value) => {
        counterNode.innerText = String(value);
    }

    //Get initial value from backend
    fetch(baseApiUrl + '/data')
    .then(response => response.json())
    .then(data => {
        updateCounterDOM(data.counterValue)
        document.querySelector('main').style.backgroundColor = data.color;
    })


    /*************/
    /* Listeners */
    /*************/
    //Listener for increment when the button is clicked
    document.querySelector('header .increment').addEventListener('click', () => {
        fetch(baseApiUrl + '/increment')
        .then(res => res.json())
        .then(data => {
            updateCounterDOM(data.counterValue);
        })
    })

    //Listener for increment by the value specified in the input field
    document.querySelector('header .incrementBy').addEventListener('keyup', (ev) => {
        //Update displayed value when the ENTER key is released while the input
        //field has the focus
        if(ev.keyCode === 13){
            let amount = ev.target.value;

            fetch(baseApiUrl + '/incrementBy/' + amount)
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
                ev.target.value = '';
            })
        }
    })

    //Listener for decrement when the button is clicked
    document.querySelector('header .decrement').addEventListener('click', () => {
        fetch(baseApiUrl + '/decrement')
        .then(res => res.json())
        .then(data => {
            updateCounterDOM(data.counterValue);
        })
    })

    //Listener for reset the counter to 0
    document.querySelector('header .reset').addEventListener('click', () => {
        fetch(baseApiUrl + '/reset')
        .then(res => res.json())
        .then(data => {
            updateCounterDOM(data.counterValue);
        })
    })

    //Listener for change the color of the background
    document.querySelector('header .color').addEventListener('change', (ev) => {
        //Update the color of the background
        let colorPicked = ev.target.value;

        //fetch(baseApiUrl + '/color/' + colorPicked)
        //.then(res => res.json())
        document.querySelector('main').style.backgroundColor = ev.target.value;
    })
} )
