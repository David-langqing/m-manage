const positionModel = require('../models/position')
const moment = require('moment')

//获取全部信息
const listall = async(req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let {keywords} = req.query
    let listall = await positionModel.list({
        keywords
     })

    if(list){
        res.render('position',{
            ret:true,
            data:JSON.stringify({
                // list,
                total: (await positionModel.listall({
                    keywords,
                })).length
            })
        }) 
    }
}

//显示全部数据
const list = async(req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let { 
        pageNo = 1,
        pageSize = 2,
        keywords =''
     } = req.query


    let list = await positionModel.list({
        start: (~~pageNo-1)*~~pageSize,
        count: ~~pageSize,
        keywords
     })
    
    if(list){
        res.render('position',{
            ret:true,
            data:JSON.stringify({
                list,
                total: (await positionModel.listall(keywords)).length
            })
        })
    }else{
        res.render('position',{
            ret: false,
            data:JSON.stringify({
                msg:'数据获取失败，请和管理员联系~'
            })
        })
    }
    // //把ejs模板读出来，返回给前端
    // res.render('position', {
    //     ret:true,
    //     data: 
    // })
}
//显示单条数据
const listone = async(req, res, next) => {
    let id = req.body.id
    res.header('Content-Type', 'application/json; charset=utf-8')
    let data = JSON.stringify(await positionModel.listone(id))
    
    if(data){
        res.render('position',{
            ret:true,
            data
        })
    }
}
//保存数据
const save = async(req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    // const {
    //     companyName,
    //     positioName,
    //     city,
    //     salary
    // } = req.body
    let result = await positionModel.save({
        ...req.body,
        createDate: moment().format('YYYY-MM-DD HH:mm')
    })
    
    if(!!result){
        res.render('position',{
            ret:true,
            data:JSON.stringify({
                msg:'数据保存成功 :)'
            })
        })
    }else{
        res.render('position',{
            ret: false,
            data:JSON.stringify({
                msg: '数据保存失败 :('
            })
        })
    }
}
//删除
const remove = async(req,res,next)=>{
    res.header('Content-Type', 'application/json; charset=utf-8')
    let {id} = req.body
    let result = await positionModel.remove(id)
    if(!!result){
        res.render('position',{
            ret:true,
            data:JSON.stringify({
                msg:'删除成功 :)'
            })
        }) 
    }
}
//修改
const update = async(req,res,next)=>{
    res.header('Content-Type', 'application/json; charset=utf-8')
    
    let result = await positionModel.update({
        id: req.body.id,
        data : {
            ...req.body
        }
    })
    if(!!result){
        res.render('position',{
            ret:true,
            data:JSON.stringify({
                msg:'修改成功 :)'
            })
        })
    }
}

module.exports = {
    list,
    listall,
    save,
    remove,
    update,
    listone
}