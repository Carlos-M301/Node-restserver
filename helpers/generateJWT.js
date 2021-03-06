const JWT = require('jsonwebtoken');
const { login } = require('../controllers/authController');

const generateJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };

        JWT.sign( payload, process.env.SECRETORPRIVATEKEY, {
             expiresIn: '4h',
            
        }, ( err, token ) => {
            if( err ){
                console.log( err );
                reject( "Can't make it the token" );
            }
            else{
                resolve( token );
            }
        });
    });
};


module.exports = {
    generateJWT,
}