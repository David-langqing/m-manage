const multer = require('multer')
const path = require('path')

var filename = ''
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
        let originalName = file.originalname
        let ext = originalName.substr(originalName.lastIndexOf('.'))
        filename = file.fieldname + '-' + Date.now() + ext
        req.body.companyLogo = filename
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {

    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件

    // 文件类型满足条件
    // let type = ['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)
    if (/^image/.test(file.mimetype)) {
        // 接受这个文件，使用`true`，像这样:
        cb(null, true)
    } else {
        // 拒绝这个文件，使用`false`，像这样:
        cb(null, false)
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('文件类型必须是.jpg, .jpeg, .png, .gif'))
    }
}

const upload = multer({
    storage,
    fileFilter
}).single('companyLogo')

const fileupload = (req, res, next) => {
    upload(req, res, (err) => {

        if (err) {
            res.render('position', {
                ret: false,
                data: JSON.stringify({
                    msg: err.message
                })
            })
        } else {
            if (!!filename) {
                next()
            } else {
                req.body.companyLogo = ''
            }
        }
    })
}
module.exports = {
    fileupload
}