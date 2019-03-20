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
app.get('/increment', (req, res) => {
    //Read data from file
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);

    //Update data value
    data.counterValue += 1;

    //Write update data to file
    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.json(data);
})


//Increment value displayed by the specified amount
app.get('/incrementBy/:amount', (req, res) => {
    //Read data from file
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);

    //Parse specified amount
    let amount = Number(req.params.amount);

    //If amount is NaN (because parsing process has failed), return error code
    if(isNaN(amount)){
        res.status(500).json({message:'UPS :('});
        return;
    }
    //If amount is a number, then update data value and write the result to file
    else{
        data.counterValue += amount;

        //Write update data to file
        fs.writeFileSync('./db.json', JSON.stringify(data));

        res.json(data);
    }
})


//Decrement value displayed
app.get('/decrement', (req, res) => {
    //Read data from file
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);

    //Update data value
    data.counterValue -= 1;

    //Write update data to file
    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.json(data);
})


//Reset value displayed to 0
app.get('/reset', (req, res) => {
    const jsonString =  '{"counterValue":0,"color":"grey"}';
    const data = JSON.parse(jsonString);

    //Write update data to file
    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.json(data);
})


//Change the color of the background
app.get('/color/:colorPicked', (req, res) => {
    //Read data from file
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);

    //Update background color
    data.color = req.params.colorPicked;

    //Write update data to file
    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.json(data);
})


//Listen backend server on configured port
app.listen(port, () => console.log('Servidor levantado en ' + port));
