//importing modules
var express = require( 'express' );
var request = require( 'request' );
var cheerio = require( 'cheerio' );

//creating a new express server
var app = express();

//setting EJS as the templating engine
app.set( 'view engine', 'ejs' );

//setting the 'assets' directory as our static assets dir (css, js, img, etc...)
app.use( '/assets', express.static( 'assets' ) );


//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
/*app.get( '/', function ( req, res ) {
    res.render( 'home', {
        message: 'The Home Page!'
    });
});*/


//launch the server on the 3000 port
app.listen( 3000, function () {
    console.log( 'App listening on port 3000!' );
});



// Affichage de la Page
app.get( '/', function ( req, res ) {
    request( 'https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s', function ( error, response, body ) {
        if ( !error & response.statusCode == 200 ) {
            console.log( body ) //Show the html

            var $ = cheerio.load( htlm );
            var price, surface, city, type;
            var json = { price: "", surface: "", city: "", type: "" };
            var data = console.log( $( "section.properties span.values" ) )
            price = data.children().first().text();
            console.log( price );
            city = data.children().next().text();
            console.log( city );
            type = data.children().next().text();
            surface = data.children().next().next().text();

        }
        res.send( body )
    })
});

/*
function recuperation( body ) {
    if ( !error ) {
        var $ = cheerio.load( htlm );
        var price, surface, city, type;
        var json = { price: "", surface: "", city: "", type: "" };
        var data = console.log( $( "section.properties span.values" ) )
        price = data.children().first().text();
        console.log( price );
        city = data.children().next().text();
        console.log( city );
        type = data.children().next().text();
        surface = data.children().next().next().text();
    }
}*/
