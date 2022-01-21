const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Connection Database
        this.databaseConnection();
        //Middelware
        this.middlewares();
        //Routes
        this.routes();

    }

    routes(){
        this.app.use( this.authPath, require( '../routes/auth' ) );
        this.app.use( this.usersPath, require( '../routes/users' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console .log("Server run in the port ", this.port );
        });
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        // Public Directory
        this.app.use( express.static( 'public' ) );
        //Parse and Read body
        this.app.use( express.json() );
        
    }

    async databaseConnection(){
        await dbConnection();
    }
}

module.exports = Server;