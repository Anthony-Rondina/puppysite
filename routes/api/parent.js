const express = require('express');
const router = express.Router();
const parentCtrl = require('../../controllers/api/parentCtrl');

router.get('/', parentCtrl.get)

router.put('/:id', parentCtrl.put)

router.post('/', parentCtrl.create);

router.delete('/:id', parentCtrl.destroy);

router.get(`/:id`, parentCtrl.show);

module.exports = router;