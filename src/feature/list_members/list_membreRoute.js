const express = require('express');
const ListMemberController = require('./list_membreController');
const authHeader = require('../../middlewares/authMiddleware');

const router = express.Router();

router.use(authHeader);

router.post('/', ListMemberController.addUserToList);
router.get('/list/:id', ListMemberController.getMembersByList);
router.delete('/list/:id', ListMemberController.removeUserFromList);

module.exports = router;
