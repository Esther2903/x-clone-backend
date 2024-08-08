const express = require('express');
const listController = require('./listController');

const router = express.Router();

router.post('/',listController.createList);
router.get('/:id' , listController.getList);
router.get('/' , listController.getUserLists);
router.put('/:id', listController.updateList);
router.delete('/:id' , listController.deleteList);


module.exports = router;