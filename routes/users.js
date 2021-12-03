const { Router } = require('express');
const { check } = require('express-validator');


const { getUsers, putUsers, patchUsers, postUsers, deleteUsers } = require('../controllers/userController');
const { isValidRole, isAValidEmail, userExist } = require('../helpers/db-validators');
const { validateData } = require('../middlewares/validate-fields');

const router = Router();
//First param is the 'url', second is any 'middleware', third is the 'controller' 
router.get( '/', getUsers );

router.put( '/:id',[
    check( 'id', 'Is not a valid id' ).isMongoId(),
    check( 'id' ).custom( userExist ),
    check( 'role' ).custom( isValidRole ),
    validateData,
], putUsers );

router.post( '/',[
    check( 'name', 'The name is required' ).not().isEmpty(),
    check( 'password', 'The password need to have more than six characters' ).isLength({ min: 6 }),
    check( 'email', 'The email is incorrect' ).isEmail(),
    check( 'email' ).custom( isAValidEmail ),
    check( 'role' ).custom( isValidRole ),
    //check( 'role', 'Is not a valid role' ).isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
    validateData    
] ,postUsers );

router.delete( '/:id', [
    check( 'id', 'Is not a valid id' ).isMongoId(),
    check( 'id' ).custom( userExist ),
    validateData,
], deleteUsers );

router.patch( '/', patchUsers );

module.exports = router;