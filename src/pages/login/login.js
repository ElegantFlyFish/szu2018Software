import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card, Form, Icon, Input, Button, Row, Col, message } from 'antd'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'

const FormItem = Form.Item
const iconstyle = { color: 'rgba(0,0,0,.25)' }

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component{
  handleSubmit = (e) => {
    if(this.props.msg) { 
      setTimeout(() => {
        message.error(this.props.msg,4)
      }, 300);
     }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
    e.preventDefault()
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const currentPath = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div>
        { redirectTo && redirectTo !== currentPath ?  <Redirect to = { redirectTo }></Redirect> : null }
        <Row justify="end center">
          <Col xs={{span:24,offset:0}}>
            <Card title="登陆" style={{ margin:20 }}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem hasFeedback>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                  })(
                    <Input prefix={<Icon type="user" style={ iconstyle } />} placeholder="用户名" />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('userpwd', {
                    rules: [{ required: true, message: '请输入密码' }],
                  })(
                    <Input prefix={<Icon type="lock" style={ iconstyle } />} type="password" placeholder="密码" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登陆
                  </Button> 或 <Link to="/register">注册!</Link>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm