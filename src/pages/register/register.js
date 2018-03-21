import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Select, message, Divider, Icon, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

const FormItem = Form.Item
const Option = Select.Option;
const { TextArea } = Input;

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component{
  handleSubmit = (e) => {
    if(this.props.msg) { 
      setTimeout(() => {
        message.error(this.props.msg,4)
      }, 300);
     }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.register(values)
      }
    });
    e.preventDefault()
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    const iconStyle = { color: 'rgba(0,0,0,.25)' }
    const currentPath = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div style={{ width:'90%', margin:20, marginLeft:'auto',marginRight:'auto' }}>
        { 
          redirectTo && redirectTo !== currentPath ? <Redirect to = { redirectTo }></Redirect> : null 
        }
        <Card title="2018软件班，新生信息录入">
          <Form onSubmit={this.handleSubmit}>
            <Divider>登录信息</Divider>
            <FormItem
              {...formItemLayout}
              label="角色"
              hasFeedback
            >
              {getFieldDecorator('role', {
                rules: [{
                  required: true, message: '',
                }],
                initialValue:"0",
              })(
                <Select disabled>
                  <Option value="0">学生</Option>
                  <Option value="1">老师</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="账号"
              hasFeedback
            >
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入账号'},
                  { max:15, message: '账号长度不能超过15位'},
                  { min:5, message: '账号长度最小为6位'}
                ],
              })(
                <Input prefix={<Icon type="user" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback
            >
              {getFieldDecorator('userpwd', {
                rules: [
                  { required: true, max:15, min:6, message: '请输入密码'},
                  { max:15, message: '密码长度不能超过15位'},
                  { min:6, message: '密码长度最小为6位'},
                ],
              })(
                <Input prefix={<Icon type="lock" style={iconStyle} />} type="password" />
              )}
            </FormItem>
            <Divider>个人信息</Divider>
            <FormItem
            {...formItemLayout}
              label="学号"
              hasFeedback
            >
              {getFieldDecorator('stunumber', {
                rules: [
                  { required: true, message: '请输入学号' },
                  { max:20, message: '学号长度不能超过20位' },
                  { min:17, message: '学号长度不能小于17位' },
                ],
              })(
                <Input prefix={<Icon type="idcard" style={iconStyle} />}  />
              )}
            </FormItem>
            <FormItem
            {...formItemLayout}
              label="姓名"
              hasFeedback
            >
              {getFieldDecorator('realname', {
                rules: [
                  { required: true, max:10, message: '请输入姓名'},
                  { max:10, message: '名字最大长度为10位'}
                ],
              })(
                <Input prefix={<Icon type="smile-o" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
            {...formItemLayout}
              label="邮箱"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [
                  { type: 'email', message: '请输入格式正确的邮箱', }, 
                  { required: true, message: '请输入邮箱'}
                ]
              })(
                <Input prefix={<Icon type="mail" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
            {...formItemLayout}
              label="手机"
              hasFeedback
            >
              {getFieldDecorator('cellphone', {
                rules: [
                  { pattern:/^1[34578]\d{9}$/,message:'请输入正确的手机号' },
                  { required: true, message: '请输入您的手机号', }
                ]
              })(
                <Input prefix={<Icon type="phone" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
              hasFeedback
            >
              {getFieldDecorator('gender', {
                initialValue:"0",
              })(
                <Select>
                  <Option value="0">女</Option>
                  <Option value="1">男</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="生日"
            >
              {getFieldDecorator('birthdate',{
                rules: [{ type: 'object', required: false, message: '请选择日期' }]
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem
            {...formItemLayout}
              label="职业"
              hasFeedback
            >
              {getFieldDecorator('profession', {
                rules: [{
                  required: false, message: '',
                }],
              })(
                <Input prefix={<Icon type="like-o" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
            {...formItemLayout}
              label="工作年限"
            >
              {getFieldDecorator('workingyears', {
                rules: [
                  { max:3, message: '亲，你高寿了？',}
                ]
              })(
                <Input type="number" prefix={<Icon type="clock-circle-o" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
            {...formItemLayout}
              label="自我简介"
            >
              {getFieldDecorator('introduction',{
                  rules: [{
                    required: false, max:50, message: '',
                  }],
              })(
                <TextArea />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">注册</Button> 或 <Link to="/login">登陆!</Link>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
  componentWillUnmount(){
    if(this.props.redirectTo && this.props.redirectTo === '/stuinfo'){
      message.success('注册成功',3)
    }
  }
}

const WrappedRegistrationForm = Form.create()(Register);

export default WrappedRegistrationForm