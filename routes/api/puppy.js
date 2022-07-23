const express = require('express');
const router = express.Router();
const puppyCtrl = require('../../controllers/api/puppyCtrl');

router.get('/', puppyCtrl.get)

router.get('/:artType', puppyCtrl.getAllFilteredArt)

router.put('/:id', puppyCtrl.put)

router.post('/', puppyCtrl.create);

router.delete('/:id', puppyCtrl.destroy);

router.get(`/chosenpuppy/:id`, puppyCtrl.show);

module.exports = router;