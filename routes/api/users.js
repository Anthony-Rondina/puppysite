const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/UserCtrl');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.get('/', usersCtrl.get)
router.put('/:id', usersCtrl.put)

// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
// POST /api/users
router.delete('/:id', usersCtrl.destroy);
// POST /api/users
router.get('/:id', usersCtrl.show);

module.exports = router;