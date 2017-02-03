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


/*
{
	"title": "Example Schema",
	"type": "object",
	"properties": {
		"firstName": {
			"type": "string"
		},
		"lastName": {
			"type": "string"
		},
		"age": {
			"description": "Age in years",
			"type": "integer",
			"minimum": 0
		}
	},
	"required": ["firstName", "lastName"]
}*/



function callLeboncoin() {
    var url = 'https://www.leboncoin.fr/ventes_immobilieres/968817200.htm?ca=12_s'

    request( url, function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {
            const $ = cheerio.load( html )

            const lbcDataArray = $( 'section.properties span.value' )

            let lbcData = {
                price: parseInt( $( lbcDataArray.get( 0 ) ).text().replace( /\s/g, '' ), 10 ),
                city: $( lbcDataArray.get( 1 ) ).text().trim().toLowerCase().replace( /\_|\s/g, '-' ),
                type: $( lbcDataArray.get( 2 ) ).text().trim().toLowerCase(),
                surface: parseInt( $( lbcDataArray.get( 4 ) ).text().replace( /\s/g, '' ), 10 )
                //squarePrice: price / surface
            }
            console.log( lbcData )
            /*res.render( 'home', {
                message2: price,
                message3: city,
                message4: type,
                message5: surface
            })*/
        }
        else {
            console.log( error )
        }
    })
}




//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
app.get( '/', function ( req, res ) {


    var url = req.query.urlLBC

    //console.log( req.query )
    callLeboncoin();

    res.render( 'home', {
        message: url

    });
});


//launch the server on the 3000 port
app.listen( 3000, function () {
    console.log( 'App listening on port 3000!' );
});


function callLeMeilleurAgent() {
    var url = 'https://www.meilleursagents.com/prix-immobilier/paris-75000/'

    request( url, function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {
            const $ = cheerio.load( html )

            const lmaDataArray = $( 'section.properties span.value' )

            let lmaData = {
                meanPriceHouse: parseInt( $( lmaDataArray.get( 0 ) ).text().replace( /\s/g, '' ), 10 ),
                meanPriceAppart: parseInt( $( lmaDataArray.get( 1 ) ).text().trim().toLowerCase().replace( /\_|\s/g, '-' ) ),
                meanPriceRent: parseInt( $( lmaDataArray.get( 2 ) ).text().trim().toLowerCase() ),
            }
            console.log( lmaData )
        }
        else {
            console.log( error )
        }
    })
}


/*function calllemeilleuragent() {
    var url2 = 'https://www.meilleursagents.com/prix-immobilier/'
    request( url2, lbcData.city.toLowerCase() + '-' + lbcData.codePostal, function ( error, response, body ) {
                if ( !error && response.statusCode == 200 ) {
}   
*/




