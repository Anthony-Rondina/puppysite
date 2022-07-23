const express = require('express');
const router = express.Router();
const litterCtrl = require('../../controllers/api/litterCtrl');

router.get('/', litterCtrl.get)

router.put('/:id', litterCtrl.put)

router.post('/', litterCtrl.create);

router.delete('/:id', litterCtrl.destroy);

router.get(`/chosenlitter/:id`, litterCtrl.show);

module.exports = router;