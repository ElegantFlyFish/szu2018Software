import axios from 'axios';
import { message } from 'antd'

axios.interceptors.request.use(config => {
  message.loading('拼命加载中...', 0)
  return config;
})

axios.interceptors.response.use(config => {
  message.destroy()
  return config;
})