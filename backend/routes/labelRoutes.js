const express = require('express');
const router = express.Router();
const { createLabel, getLabels } = require('../controllers/labelController');

// POST /api/labels - create new label
router.post('/', createLabel);

// GET /api/labels - get all labels
router.get('/', getLabels);

module.exports = router;
