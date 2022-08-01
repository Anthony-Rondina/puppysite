const express = require('express');
const router = express.Router();
const litterCtrl = require('../../controllers/api/litterCtrl');

router.get('/', litterCtrl.get)

router.put('/:oldmom/:olddad/:mom/:dad/:id', litterCtrl.put)

router.put('/removeparents/:mom/:dad/:id', litterCtrl.removeLitter);

router.post('/:mom/:dad/', litterCtrl.create);

router.delete('/:id', litterCtrl.destroy);

router.get('/:id', litterCtrl.show);

module.exports = router;