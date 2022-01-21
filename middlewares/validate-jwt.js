const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status( 401 ).json({
            msg: "You don't have the authorization for this request",
        });
    }
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await UserModel.findById( uid );

        if( !user ){
            return res.status( 401 ).json({
                msg: "You don't have access to do this."
            });
        }

        //Verify if the state of the uid is 'true'
        if( !user.status ){
            return res.status( 401 ).json({
                msg: "You don't have the permissions to do this action."
            });
        }

        req.user = user;

        next();
    } catch ( error ) {
        console.log( error );
        res.status( 401 ).json({
            msg: "Invalid token",
        });
    }

    
};


module.exports = {
    validateJWT,
}