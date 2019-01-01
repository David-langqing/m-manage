import adminListTpl from '../views/admin.list.html'
import adminModel from '../models/admin'
import adminSaveTpl from '../views/admin.save.html'
const list = async ({ router, res, req }) => {
    let {
        pageNo = 1,
        pageSize = 2,
        keywords = ''
    } = req.query || {}
    let result = (await adminModel.list(
        {
            pageNo,
            pageSize,
            keywords
        }
    ))
    let listall = (await adminModel.listall(
        {
            pageNo,
            pageSize,
            keywords
        }
    ))
    if (!result.ret) {
        alert(result.data.msg)
        router.go('/home')
        return
    } else {
        var list = result.data.list
    }
    let total = listall.data.total
    
    if(keywords){
        total = ~~pageSize
    }
    let pageCount = Math.ceil(total / ~~pageSize)
    
    let html = template.render(adminListTpl, {
        list, // 列表数据源
        pageArray: new Array(pageCount), // 构造分页页码数组
        pageNo: ~~pageNo, // 当前页
        pageCount: ~~pageCount, // 总页数
        pageSize: ~~pageSize, // 每页条数
        keywords //关键字
    })
    res.render(html)
    $(".content-header h1").text($("#adminid").text())
    $('#hereid').text("admin")
    _bindListEvents({
        router,
        req,
        pageSize
    })
}
const _genToken = () => {
    return new Date().getTime() + Math.random()
  }
const _bindListEvents = ({
    router,
    req,
    pageSize
  }) => {
    // 给添加按钮绑定
    $('#addbtn').on('click', () => {
        router.go('/admin_save')
    })

    // 给删除按钮绑定事件
    $('.pos-remove').on('click', function () {
        let that = this
        _removeuser({
            that,
            router,
            req,
            pageSize
        })
    })


    // 给搜索按钮绑定事件
    $('#possearch').on('click', function () {
        let keywords = $('#keywords').val()

        let query = {
            ...req.query,
            pageNo: 1,
            keywords,
            _: _genToken()
        }
        router.go(`/admin?${$.param(query)}`)
    })
}
const _removeuser = async ({
    that,
    router,
    req,
    pageSize
  }) => {
    let id = $(that).attr('posid')
    
    let result = await adminModel.remove(id)
    console.log(result)
    if (result.ret) {
      let { keywords = '', pageNo } = req.query || { pageNo: 1 }
      //1、去后端取最鲜活的total, 根据total 计算最鲜活的 pageCount
      let total = (await adminModel.listall({ keywords })).data.total
      //2、计算鲜活的pageCount
      let pageCount = Math.ceil(total / ~~pageSize)
      //3、判断pageCount 和 pageNo关系
      // 如果 pageNo > pageCount, 表明是在最后一页，且已经删光了
      if (pageNo > pageCount && pageNo != 1) {
        pageNo = pageNo - 1
      }
      // 给路由加个ID来实现新的路由的跳转
      router.go(`/admin?_=${id}&pageNo=${pageNo}&keywords=${keywords || ''}`)
    } else {
      alert('删除失败:(')
    }
  }
const save = ({
    router,
    req,
    res,
    next
  }) => {
    res.render(adminSaveTpl)

    _bindSaveEvents(router)
}


const _bindSaveEvents = (router) => {
    // 给返回按钮绑定事件
    $('#posback').on('click', () => {
        router.back()
    })

    // 给提交按钮绑定事件
    $('#possubmit').on('click', async () => {
        let userName =$(" #userName ").val()
        let passWord =$(" #passWord ").val()
        console.log(userName,
            passWord)
        let result = await adminModel.save(userName,
            passWord)
        if (result.ret) {
          $('#possave').get(0).reset()
        } else {
          alert(result.data.msg)
        }
        // let result = await adminModel.save()

        // if (result.ret) {
        //     $('#possave').get(0).reset()
        // } else {
        //     alert(result.data.msg)
        // }
    })
}

export default {
    list,
    save
}