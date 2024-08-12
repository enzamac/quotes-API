const express = require('express')
const router = express.Router()
const fs = require('node:fs')
const quoteController = require('../Controllers/quoteController')

// get requests
router.get('/', quoteController.getallQuotes);

// post requests
router.post('/', quoteController.createNewQuote);

// Get a quote by ID
router.get('/:id', quoteController.getQuoteById);

// Delete a quote
router.delete('/:id', quoteController.deleteQuote);

module.exports = router