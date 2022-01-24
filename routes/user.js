const express =  require('express')
const router = express.Router()
const userController = require('../controllers/user')

const passport = require('passport')
require('../middleware/admin')(passport)

//day4 task
//Signed in User should only be able to call the routes
router.get('/', passport.authenticate('jwt', {session : false}), userController.getAll)
router.post('/signIn', userController.addUser)
router.post('/logIn', userController.getLogIn)
router.get('/:id', passport.authenticate('jwt', {session : false}), userController.getOneUser)
router.patch('/:id', passport.authenticate('jwt', {session : false}), userController.updateOneUser)
router.delete('/', passport.authenticate('jwt', {session : false}), userController.deleteAllUser)
router.delete('/:id', passport.authenticate('jwt', {session : false}), userController.deleteOneUser)

module.exports = router