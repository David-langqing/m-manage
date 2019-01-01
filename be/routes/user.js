var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

const userAuthMiddleware = require ('../middlewares/userauth')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.post('/list',userAuthMiddleware.auth,userController.list)
router.post('/listall',userController.listall)
router.delete('/remove',userController.remove)

router.get('/isSignin',userController.isSignin)
router.get('/signout',userController.signout)
module.exports = router;
