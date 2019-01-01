const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const signup = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let { username, password } = req.body
    let isSigned = !!(await userModel.findone({ username }))
    if (isSigned) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                msg: '用户名已经存在！'
            })
        })
    } else {
        let result = await userModel.signup({
            username,
            password: await _doCrypto(password)
        })
        if (!!result) {
            res.render('user', {
                ret: true,
                data: JSON.stringify({
                    msg: '注册成功~'
                })
            })
        }
    }
}
// const save = async(req, res, next) => {
//     res.header('Content-Type', 'application/json; charset=utf-8')
//     // const {
//     //     companyName,
//     //     positioName,
//     //     city,
//     //     salary
//     // } = req.body
//     let result = await userModel.save({
//         ...req.body
//     })
//     if(!!result){
//         res.render('position',{
//             ret:true,
//             data:JSON.stringify({
//                 msg:'数据保存成功 :)'
//             })
//         })
//     }else{
//         res.render('position',{
//             ret: false,
//             data:JSON.stringify({
//                 msg: '数据保存失败 :('
//             })
//         })
//     }
// }
const list = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let { 
        pageNo = 1,
        pageSize = 2,
        keywords =''
     } = req.body
    let list = await userModel.list({
        start: (~~pageNo-1)*~~pageSize,
        count: ~~pageSize,
        keywords
    })
    if (!!list) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                list,
                // total: (await userModel.listall(keywords)).length
            })
        })
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '获取用户列表失败~'
            })
        })
    }

}
const listall = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let { 
        keywords =''
     } = req.body
     let listall = await userModel.list({
        keywords
     })
    if (!!listall) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                listall,
                total: (await userModel.list(keywords)).length
            })
        })
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '获取用户总数失败~'
            })
        })
    }

}
const signin = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')

    let { password, username } = req.body
    let result = await userModel.findone({
        username
    })
    if (!!result) {
        let isPasswordCorrect = await _comparePwd(password, result.password)
        if (isPasswordCorrect && username === result.username) {
            //session 处理
            req.session.username = result.username

            res.render('user', {
                ret: true,
                data: JSON.stringify({
                    username: result.username
                })
            })
        } else {
            console.log(1)
            res.render('user', {
                ret: false,
                data: JSON.stringify({
                    msg: '用户名或密码错误~'
                })
            })
        }
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '用户名或密码错误~'
            })
        })
    }
}
//判断用户是否登陆
const isSignin = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let username = req.session.username
    if (!!username) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                username
            })
        })
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '没有权限，请登录~'
            })
        })
    }

}


const signout = async (req, res, next) => {
    req.session.username = null
    res.header('Content-Type', 'application/json; charset=utf-8')

    res.render('user', {
        ret: true,
        data: JSON.stringify({
            msg: '退出成功~'
        })
    })
}

const _doCrypto = (password) => {
    return new Promise((resolve) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                resolve(hash)
            });
        });
    })
}
const _comparePwd = (fromUser, fromDatabase) => {
    return new Promise((resolve) => {
        bcrypt.compare(fromUser, fromDatabase, function (err, res) {
            resolve(res)
        })
    })

}
//删除
const remove = async(req,res,next)=>{
    res.header('Content-Type', 'application/json; charset=utf-8')

    let {id} = req.body
    console.log(id)
    let result = await userModel.remove(id)
    if(!!result){
        res.render('position',{
            ret:true,
            data:JSON.stringify({
                msg:'删除成功 :)'
            })
        }) 
    }
}
module.exports = {
    signup,
    signin,
    isSignin,
    signout,
    list,
    listall,
    remove
}