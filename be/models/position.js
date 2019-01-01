const mongoose = require('../utils/database')


//创建schema,创建集合
const positionSchema = new mongoose.Schema({
    companyLogo: String,
    companyName: String,
    positionName: String,
    city: String,
    salary: String,
    createDate: String
});
const PositionModel = mongoose.model('positions', positionSchema)

//保存信息
const save = (data) =>{
    return new PositionModel(data).save().then((result)=>{
        return result
    })
}
//取到全部信息
const listall = ({keywords}) =>{
    let reg = new RegExp(keywords,'gi')
    return PositionModel
    .find({
        $or: [
            {'companyName':reg},
            {'positionName':reg}
        ]
    })
    .sort({_id:-1})
    .then((result) =>{
        return result
    }).catch((err)=>{
        return false
    })
    
}
//取到单页信息
const list = ({ start,count,keywords }) =>{
    //关键字查询
    let reg = new RegExp(keywords,'gi')
    return PositionModel
    .find({
        $or: [
            {'companyName':reg},
            {'positionName':reg}
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
//取到单条信息
const listone = (id) =>{
    return PositionModel
    .findById(id)
    .then((result) =>{
        return result
    })
    
}
//删除职位信息
const remove = (id) =>{
    return PositionModel
    .findByIdAndDelete(id)
    .then((result) =>{
        return result
    })
    
}
//修改职位信息
const update = ({id,data}) =>{
    if(!!data.companyLogo){
        return PositionModel
        .findByIdAndUpdate(id,data)
        .then((result) =>{
            return result
        })
    }else{
        let {companyName,positionName,salary,city} = data
        return PositionModel
        .findByIdAndUpdate(id, {companyName,positionName,salary,city})
        .then((result) =>{
            return result
        })
    }
   
    
}
module.exports={
    list,
    listall,
    listone,
    save,
    remove,
    update
}
