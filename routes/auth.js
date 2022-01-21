const { Router } = require('express');
const { check } = require('express-validator'); 

const { login } = require('../controllers/authController');
const { validateData } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post( '/login',[
    validateJWT,
    check( 'email', 'The email is required' ).isEmail(),
    check( 'password', 'The password is required' ).not().isEmpty(),
    validateData
],login );




module.exports = router;