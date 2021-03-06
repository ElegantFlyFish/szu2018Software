import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loaddata } from '../redux/user.redux'

@withRouter
@connect(
  null,
  { loaddata }
)
class AuthRoute extends React.Component{
  componentDidMount(){
    const enumPath = ['/login','/register']
    const currentPath = this.props.location.pathname
    if(enumPath.includes(currentPath)){ return null }
    // 获取用户信息
    axios.get('/user/info').then(res => {
      if(res.status === 200){
        if(res.data.code === 0){
          this.props.loaddata(res.data.data)
        }else{
          this.props.history.push('/login')
        }
      }
    })
  }
  render(){
    return null
  }
}

export default AuthRoute