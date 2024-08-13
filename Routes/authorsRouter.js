const express = require('express')
const router = express.Router()
const fs = require('node:fs')
const authorController = require('../Controllers/authorController')

// get requests

router.get('/', authorController.getallAuthors)
// post requests

router.post('/', authorController.createNewAuthor)

// Get an author by ID
router.get('/:id', authorController.getAuthorById);

// Delete an Author
router.delete('/:id', authorController.deleteAuthorById);

// Update an Author
router.put('/:id', authorController.updateAuthorById);

module.exports = router