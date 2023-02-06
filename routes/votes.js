const router = require('express').Router()
const votesCtrl = require('../controllers/votes.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, votesCtrl.castVote)

module.exports = router