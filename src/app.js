import React from 'react'
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Loadable from 'react-loadable'
import reducer from './reducer'
import AuthRoute from './component/authRoute'
import { Spin, Icon } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
const store = createStore(  
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
)

const loading = ()=> <Spin indicator={antIcon} />
const Login = Loadable(
  {
    loader:()=>import('./pages/login/login'),
    loading:loading,
    delay:300
  }
)
const Register = Loadable(
  {
    loader:()=>import('./pages/register/register'),
    loading:loading,
    delay:300
  }
)

const TeacherInfo = Loadable(
  {
    loader:()=>import('./pages/info/teacherInfo'),
    loading:loading,
    delay:300
  }
)

const StuInfo = Loadable(
  {
    loader:()=>import('./pages/info/stuInfo'),
    loading:loading,
    delay:300
  }
)

class App extends React.Component{
  render(){
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <AuthRoute></AuthRoute>
              <Switch>
                <Route exact path = "/login" component = { Login } />
                <Route path = "/register" component = { Register } />
                <Route path = "/teacherinfo" component = { TeacherInfo } />
                <Route path = "/stuinfo" component = { StuInfo } />
                <Route path = "" component = { Login } />
              </Switch>
            </div>
        </Router>
      </Provider>
    )
  }
}

export default App