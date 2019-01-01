const list = ({
  pageNo,
  pageSize,
  keywords }) => {
  return $.ajax({
    url: '/api/user/list',
    type: 'post',
    data: {
      pageNo,
      pageSize,
      keywords
    },
    success: (result) => {
      return result
    }
  })
}
const save = (userName,
  passWord) => {
let username=userName
let password=passWord
console.log(username,
  password)
  return $.ajax({
    url: '/api/user/signup',
    type: 'POST',
    data: {
      username,
      password
    },
    success: (result) => {
      return result
    }
  })
}
const listall = ({
  pageNo,
  pageSize,
  keywords }) => {
    console.log(keywords)
  return $.ajax({
    url: '/api/user/listall',
    type: 'post',
    data: {
      pageNo,
      pageSize,
      keywords
    },
    success: (result) => {

      return result
    }
  })
}

const remove = (id) => {
  console.log(id)
  return $.ajax({
    url: '/api/user/remove',
    type: 'delete',
    data: {
      id
    },
    success: (result) => {
      return result
    }
  })
}


module.exports = {
  list,
  listall,
  save,
  remove,
}