import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Avatar, List, Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'
import './dashboard.css'

const { Header, Sider, Content, Footer } = Layout

@connect(
  state => state.user
)
class Dashboard extends React.Component{
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
        collapsed: !this.state.collapsed,
    });
  }
  render(){
    const currentPath = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
        <div id="components-layout-demo-custom-trigger">
            <Layout>
                <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                >
                    <div className="logo">SZU2018</div>
                    <List>
                        <List.Item.Meta 
                        avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                        title="name"
                        description="在线状态：在线"
                        ></List.Item.Meta>
                    </List>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/about" activeClassName="selected"><Icon type="/stuinfo" /><span>个人信息</span></NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        Content
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        SZU2018 ©2018 Created by 志当高飞
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
  }
}

export default Dashboard