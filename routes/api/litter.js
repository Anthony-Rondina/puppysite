const express = require('express');
const router = express.Router();
const litterCtrl = require('../../controllers/api/litterCtrl');

router.get('/', litterCtrl.get)

router.put('/:id', litterCtrl.put)

router.post('/:parent', litterCtrl.create);

router.delete('/:id', litterCtrl.destroy);

router.get(`/:id`, litterCtrl.show);

module.exports = router;