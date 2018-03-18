import axios from 'axios'
import { getRedirectPath } from "../help/utils"

// actions 
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGI_OUT = 'LOGI_OUT'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  'role':0,
  'msg':'',
  'username':'',
  'redirectTo':''
}

//action creator
function auth_success(data){
  return { type: AUTH_SUCCESS, payload:data}
}

function errorMsg(msg){
  return { type:ERROR_MSG, msg }
}

export function user(state = initState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return { ...state,redirectTo:getRedirectPath(action.payload), ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth:false, msg:action.msg }
    case LOGI_OUT:
      return { ...initState  }
    case LOAD_DATA:
      return { ...state, redirectTo:getRedirectPath(action.payload), ...action.payload }
    default:
      return state
  }
}

export function loaddata(data){
  return { type:LOAD_DATA, payload:data }
}

export function login(data){
  return dispatch =>{
    axios.post('/user/login',data).then(res => {
      if(res.status === 200 && res.data.code === 0){
        dispatch(auth_success(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function register(data){
  return dispatch => {
    axios.post('/user/register',data).then(res => {
      if(res.status === 200){
        if(res.data.code === 0){
          dispatch(auth_success(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      }
    })
  }
}
