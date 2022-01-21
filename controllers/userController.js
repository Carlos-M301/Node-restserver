const { response } = require('express');
const bcryptjs = require('bcryptjs');

const UserModel = require('../models/userModel');

const getUsers = async(req, res = response) =>{
    //Query params (optional params);
    const { limit = 5, from = 0 } = req.query;
    const status = { status: true };

    const [ total, users ] = await Promise.all([
        UserModel.countDocuments( status ),
        UserModel.find( status )
            .skip( Number(from) )
            .limit( Number(limit) ),
    ]);

    res.json({
        total,
        users
    });
}

const postUsers = async (req, res = response) =>{

    const { name, email, password, role } = req.body;
    
    const user = new UserModel({ name, email, password, role });

    // Encrypt pass
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt ); 
    //Save in database
    await user.save();
    res.json( user );
}

const putUsers = async(req, res = response) =>{
    //Params (require params)
    const id = req.params.id;   
    const { _id, password, google, email,...content } = req.body;

    //TODO: validate against bd
    if( password ){
        // Encrypt pass
        const salt = bcryptjs.genSaltSync();
        content.password = bcryptjs.hashSync( password, salt ); 
    }

    const user = await UserModel.findByIdAndUpdate( id, content )

    res.json({
        msg: "put API - Controller",
        id,
        user,
    });
}

const deleteUsers = async(req, res = response) =>{

    const id = req.params.id;
    //Whit this I can get the user who is making this request.
    const authUser = req.user;
    const status = { status: false };
    // Physically delete
    //await UserModel.findByIdAndDelete( id );
    const user = await UserModel.findByIdAndUpdate( id, status );

    res.json( user );
}

const patchUsers = (req, res = response) =>{
    res.json({
        msg: "patch API - Controller"
    });
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}