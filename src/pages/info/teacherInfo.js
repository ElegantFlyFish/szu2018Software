import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Card, Icon, Progress, message, Popconfirm } from 'antd'
import axios from 'axios'

@connect(
  state => state.user
)
class TeacherInfo extends React.Component{
  students = 90
  constructor(props){
    super(props)
    this.state = {
      columns:[
        {
          title: '姓名',
          dataIndex: 'realname',
        },
        {
          title: '性别',
          dataIndex: 'gender',
        },
        {
          title: '生日',
          dataIndex: 'birthday',
        }, 
        {
          title: '学号',
          dataIndex: 'stunumber',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '手机',
          dataIndex: 'cellphone',
        },
        {
          title: '职业',
          dataIndex: 'profession',
        },
        {
          title: '工作年限',
          dataIndex: 'workingyears',
        },
        {
          title: '自我简介',
          dataIndex: 'introduction',
        }
      ],
      data:[],
      regPercent:0,
      confirmPop:true
    }
    this.exportExcel = this.exportExcel.bind(this)
  }
  componentDidMount(){
    axios.get('/user/getStus').then(res => {
      if(res.status === 200 && res.data.code === 0){
        this.setState({
          data:res.data.data.map((res) => {
            res.gender = res.gender === 1 ? '男' : '女' 
            return res
          })
        })
        this.setState({ regPercent:this.calculatePercent(res.data.data.length) })
      }
    })
  }
  calculatePercent(exist){
    return Math.trunc((exist/this.students) * 100) || 0
  }
  exportExcel(){
    // 此处应做成一个组件比较合适
    if(!this.state.data.length){
      message.warning('亲，暂无数据可导出！')
      return
    }
    axios.get('/user/exportExcl',{responseType:'arraybuffer'}).then(res => {
      const name = '2018深大软件工程（1）班'
      const data = res.data
      const dt=new Date(),dtstr=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()
      const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
      const fileName = name + dtstr + '-' + Math.random().toString().slice(-6) +'.xlsx'
      const downloadEle = document.createElement("a")

      downloadEle.id='downloadExcel';
      document.body.appendChild(downloadEle);  
      downloadEle.download = fileName;  
      downloadEle.href = URL.createObjectURL(blob);  
      downloadEle.click();
      document.getElementById('downloadExcel').remove(downloadEle.selectedIndex)
    })
  }
  render(){
    const currentPath = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    
    return (
      <Card title="学生列表" 
      style = {{ margin:20 }} 
      actions = {
        [<Popconfirm
          placement="top" 
          title = { this.state.regPercent !== 100 && this.state.data.length > 0 ? '亲，还有同学没有注册，现在导出数据？' : '确定导出？' } 
          onConfirm={ this.exportExcel } 
          okText="确定" 
          cancelText="取消">
            <Icon type="cloud-download" style={{fontSize:20}} /> 导出EXCEL表格
          </Popconfirm>
        ]}
      extra = { <div>学生注册进度：<Progress type="circle" percent = { this.state.regPercent } width={ 30 } /></div> }
      >
        {redirectTo && redirectTo !== currentPath ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Table 
        rowKey="_id" 
        columns = { this.state.columns } 
        pagination = {{ pageSize: 15 }} 
        dataSource = { this.state.data } 
        size="middle" />
      </Card>
    )
  }
}

export default TeacherInfo