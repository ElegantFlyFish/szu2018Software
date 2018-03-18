import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setLoadingStatus } from '../redux/isloading.redux'

@connect(
  state => state.loadingStatus,
  { setLoadingStatus }
)
class IsLoading extends React.Component{
  componentDidMount(){
    axios.interceptors.request.use(config => {
      this.props.setLoadingStatus(true)
      return config;
    })

    axios.interceptors.response.use(config => {
      this.props.setLoadingStatus(false)
      return config;
    })
  }
  render(){
    return null
  }
}

export default IsLoading