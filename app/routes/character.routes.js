const express = require('express')
const { getCharacters } = require('../controllers/characters.controller')

const router = express.Router()

router.get('/:movie_id', getCharacters)

module.exports = router