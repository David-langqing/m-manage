const sign = ({url, data}) => {
  console.log(data)
  return $.ajax({
    url,
    data,
    type: 'POST',
    success: (result) => {
      console.log(url)
      console.log(result)
      return result
    }
  })
}

const isSignin = () => {
  return $.ajax({
    url:'/api/user/isSignin',
    success: (result) => {
      return result
    }
  })
}
const signout = () => {
  return $.ajax({
    url:'/api/user/signout',
    success: (result) => {
      return result
    }
  })
}

export default {
  sign,
  isSignin,
  signout
}