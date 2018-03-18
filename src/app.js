import React from 'react'
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

import AuthRoute from './component/authRoute'
import Login from './pages/login/login'
import Register from './pages/register/register'
import TeacherInfo from './pages/info/teacherInfo'
import StuInfo from './pages/info/stuInfo'

import { Spin, Icon } from 'antd'
const loadingIcon = (<Icon type="loading" style = {{ fontSize:25 }} />)

const store = createStore(  
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
)
class App extends React.Component{
  render(){
    return (
      <Provider store = { store }>
        <Router>
            <Spin tip="疯狂加载中..." indicator = { loadingIcon } spinning = { false }>
              <AuthRoute></AuthRoute>
              <Switch>
                <Route exact path = "/login" component = { Login } />
                <Route path = "/register" component = { Register } />
                <Route path = "/teacherinfo" component = { TeacherInfo } />
                <Route path = "/stuinfo" component = { StuInfo } />
                <Route path = "" component = { Login } />
              </Switch>
            </Spin>
        </Router>
      </Provider>
    )
  }
}

export default App