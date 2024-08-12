const express = require('express');
const listController = require('./listController');

const router = express.Router();

router.post('/',listController.createList);
router.get('/:id' , listController.getList);
router.get('/user/:id' , listController.getUserLists);
router.put('/:id', listController.updateList);
router.delete('/:id' , listController.deleteList);
router.post('/add-member', listController.addUserToList); 


module.exports = router;