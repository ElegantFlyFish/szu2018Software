import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Avatar, Divider, Form, Select, Input, Button, Icon, DatePicker } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 3},
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8, offset: 3 },
}

@connect(
  state => state.user
)
class StuInfo extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form
    const currentPath = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    const iconStyle = { color: 'rgba(0,0,0,.25)' }
    return (
      <Card title="个人中心(还有待完善......)" style = {{ margin:20 }}>
        {redirectTo && redirectTo !== currentPath ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" /> <span>{ this.props.realname }</span>
        <Divider orientation="left"></Divider>
        <Form>
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
                <Input disabled prefix={<Icon type="user" style={iconStyle} />} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback>
              <Button icon="tool">修改密码</Button>
            </FormItem>
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
              label="性别"
              hasFeedback
            >
              {getFieldDecorator('gender', {
                initialValue:"0",
              })(
                <Select disabled>
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
          <FormItem {...formTailLayout}>
            <Button type="primary" onClick={this.check}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const WrappedStuInfo = Form.create()(StuInfo);

export default WrappedStuInfo