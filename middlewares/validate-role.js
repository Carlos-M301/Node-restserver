const { response } = require("express");

const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ){
        return res.status(500).json({
            msg: 'It wants verify the role without validate fisrt the jwt',
        });
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ name } does't have the admin rol`,
        });
    }



    next();
}

const haveRole = ( ...roles ) => {


    return ( req, res = response, next ) => {
        
        if ( !req.user ){
            return res.status(500).json({
                msg: 'It wants verify the role without validate fisrt the jwt',
            });
        }
        if( roles.includes( req.user.role ) ){
            return res.status(401).json({

                msg:`The service required one of this roles: ${ roles }`,
            });
        }
        next();
    }
}

module.exports = { 
    isAdminRole,
    haveRole,
}