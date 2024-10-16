const express = require('express');
const router = express.Router();
const { createAdmin, getAdmins, deleteAdmin } = require('../controllers/adminController');

// Admin routes
router.post('/create', createAdmin);
router.get('/list', getAdmins);
router.delete('/:id', deleteAdmin);

module.exports = router;
