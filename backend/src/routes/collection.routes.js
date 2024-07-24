const express = require('express');
const router = express.Router();
const collectionController = require("../controllers/collection.controller.js");

router.get('/', collectionController.getAllCollections);
router.get('/:id', collectionController.findCollectionById);
router.post('/create', collectionController.createCollection);

module.exports = router;