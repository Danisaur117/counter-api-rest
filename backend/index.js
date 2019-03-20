const express = require( 'express' );
const app = express();

const fs = require( 'fs' );

const port =  4000;


//Body parse to JSON
app.use( express.json() );


//Enable CORS
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );


//Read data from file
app.get('/data', (req, res) => {
    const jsonString =  fs.readFileSync('./db.json','UTF-8');
    const data = JSON.parse(jsonString);
    res.json(data);
})


app.listen( port, () => console.log( 'Servidor levantado en ' + port ) );
