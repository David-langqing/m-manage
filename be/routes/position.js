const express = require('express')
const positionController = require('../controllers/position')

const fileUpLoadMiddleWare = require('../middlewares/fileuploade')
const userAuthMiddleware = require ('../middlewares/userauth')
const router = express.Router()
//注意，listall不要调用
router.get('/list',userAuthMiddleware.auth,positionController.list)
router.get('/listall',positionController.listall)
router.post('/save',fileUpLoadMiddleWare.fileupload, positionController.save)
router.delete('/remove',positionController.remove)
router.post('/update',fileUpLoadMiddleWare.fileupload,positionController.update)
router.post('/listone',positionController.listone)

router.get('/fe/list',positionController.list)

module.exports = router