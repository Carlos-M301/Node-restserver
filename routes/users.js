const { Router } = require('express');
const { getUsers, putUsers, patchUsers, postUsers, deleteUsers } = require('../controllers/userController');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers);

router.post('/', postUsers);

router.delete('/', deleteUsers);


module.exports = router;