const express = require('express');
const router = express.Router();
const puppyCtrl = require('../../controllers/api/puppyCtrl');

router.get('/', puppyCtrl.get)

router.put('/:id', puppyCtrl.put)

router.post('/:mom/:dad/:litter', puppyCtrl.create);

router.delete('/:id', puppyCtrl.destroy);

router.get(`/:id`, puppyCtrl.show);

module.exports = router;