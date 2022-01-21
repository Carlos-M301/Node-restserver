const { response } = require('express');
const bcryptjs = require('bcryptjs');

const UserModel = require('../models/userModel');
const { generateJWT } = require('../helpers/generateJWT');

const login = async( req, res = response ) => {
    const { email, password } = req.body;

    try {
        //Check if the email exist
        const user = await UserModel.findOne({ email });
        if( !user ){
            return res.status(400).json({
                msg: 'Incorret user or password'
            });
        } 
        
        //check if the user si active in the database 
        if( !user.status ){
            return res.status(400).json({
                msg: 'Incorret user or password'
            });
        } 
        //Check the password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Incorret user or password'
            });
        }

        //Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            msg: "login ok",
            user,
            token,
        })
        
    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }    
};


module.exports = {
    login,

}