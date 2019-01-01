const mongoose = require('../utils/database')

//创建schema,创建集合
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const UserModel = mongoose.model('user', userSchema)

const signup = (data)=>{
    console.log(data)
    let userModel =new UserModel(data)
    return userModel.save()
    .then((result)=>{
        return result
    })
}
//保存信息
// const save = (data) =>{
//     console.log(data)
//     let userModel =new UserModel(data)
//     return userModel.save()
//     .then((result)=>{
//         return result
//     })
// }
const list = ({ start,count,keywords })=>{
    //关键字查询
    let reg = new RegExp(keywords,'gi')
    let userModel =new UserModel()
    return UserModel.find({
        $or: [
            {'username':reg}
        ]
    })
    .sort({_id:-1})
    .skip(start)
    .limit(count)
    .then((result) =>{
        return result
    }).catch((err)=>{
        return false
    })
}

//查找用户
const findone =(condition) =>{
    return UserModel.findOne(condition)
    .then((result) =>{
        return result
    })
}
//删除职位信息
const remove = (id) =>{
    return UserModel
    .findByIdAndDelete(id)
    .then((result) =>{
        return result
    })
    
}
module.exports = {
    signup,
    findone,
    list,
    remove
}