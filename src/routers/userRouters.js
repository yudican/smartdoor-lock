const express = require('express')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

router.post('/create',
  userControllers.createNewUser
)

module.exports = router;