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
        updateCounterDOM(data.counterValue);
    })

    /* Listeners */
    //Listener for increment when the button is clicked
    document.querySelector('header .increment').addEventListener('click', () => {
        fetch(baseApiUrl + '/increment')
        .then(response => response.json())
        .then(data => {
            updateCounterDOM(data.counterValue);
        })
    })
} )
