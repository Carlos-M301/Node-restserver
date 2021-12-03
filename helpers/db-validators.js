const RoleModel = require('../models/roleModel');
const UserModel = require('../models/userModel');

const isValidRole = async( role = '' ) => {
    const existRole = await RoleModel.findOne({ role });
    if( !existRole ) throw new Error( `The rol ${ role } doesn't exist in the database` );
};

const isAValidEmail = async( email ) =>{
    const existEmail = await UserModel.findOne({ email });

    if( existEmail ) throw new Error( `The email ${ email } is already used, please enter another valid email` );
};

const userExist = async( id ) =>{
    const existUser = await UserModel.findById( id );
    if( !existUser ) throw new Error( `The id ${id} not exist` );
};

module.exports = {
    isValidRole,
    isAValidEmail,
    userExist
};