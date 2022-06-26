import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home';
import { Breadcrumb, Layout, Menu } from 'antd';
import {PieChartFilled, DesktopOutlined, MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import AddTodo from './components/AddTodo/AddTodo';
import NotFound from "./components/NotFound/NotFound";
import EditTodo from "./components/EditTodo/EditTodo";



export default function App() {

const [collapsed, setCollapsed] = useState(false)
const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

const onCollapse = (collapsed) => {
  setCollapsed({ collapsed });
}
const toggle = () => {
  setCollapsed(!collapsed)
}



  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>

        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <PieChartFilled  />
                    <span>Todos</span>
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="2">
                    <DesktopOutlined  />
                    <span>Add Todo</span>
                    <Link to="/add-todo" />
                </Menu.Item>

            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
              {collapsed
                ? <MenuFoldOutlined className="trigger" onClick={toggle} />
                : <MenuUnfoldOutlined className="trigger"  onClick={toggle}/>
              }
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Routes>
                  <Route  path="/" element={<Home />} />
                  <Route  path="/add-todo" element={<AddTodo />} />
                  <Route path="/edit/:id" element={<EditTodo />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>

        </Layout>

    </Layout>
  );
}


