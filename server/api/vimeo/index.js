'use strict';

var express = require('express');
var controller = require('./vimeo.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/:tag', controller.getVidoes);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
