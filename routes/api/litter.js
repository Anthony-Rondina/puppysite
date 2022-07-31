const express = require('express');
const router = express.Router();
const litterCtrl = require('../../controllers/api/litterCtrl');

router.get('/', litterCtrl.get)

router.put('/:mom/:dad/:id', litterCtrl.put)

router.post('/:mom/:dad/', litterCtrl.create);

router.delete('/:id', litterCtrl.destroy);

router.get('/:id', litterCtrl.show);

module.exports = router;