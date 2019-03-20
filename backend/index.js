const express = require('express');
const fs = require('fs');

const app = express();
const port =  4000;


//Body parse to JSON
app.use(express.json());


//Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Initial read data from file
app.get('/data', (req, res) => {
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);
    res.json(data);
})


//Increment value displayed
app.get('/increment', (req, res) =>{
    //Read data from file
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);

    //Update data value
    data.counterValue += 1;

    //Write update data to file
    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.json(data);
})


//Listen backend server on configured port
app.listen(port, () => console.log('Servidor levantado en ' + port));
