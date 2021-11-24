const { response } = require('express');


const getUsers = (req, res = response) =>{
    //Query params (optional params);
    const { framework } = req.query;
    res.json({
        msg: "get API - Controller",
        framework,
    });
}

const postUsers = (req, res = response) =>{
    const { name, Age} = req.body;
    res.json({
        msg: "post API - Controller",
        name,
        Age,
    });
}

const putUsers = (req, res = response) =>{
    //Params (require params)
    const id = req.params.id;
    res.json({
        msg: "put API - Controller",
        id,
    });
}

const patchUsers = (req, res = response) =>{
    res.json({
        msg: "patch API - Controller"
    });
}

const deleteUsers = (req, res = response) =>{
    res.json({
        msg: "delete API - Controller"
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}