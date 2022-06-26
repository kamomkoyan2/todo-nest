import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import Todo from '../../components/Todo/todo';



const { Header, Content, Footer } = Layout;



const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const AppMenu = () => (
  <Layout>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <Layout
        className="site-layout-background"
        style={{
          padding: '24px 0',
        }}
      >
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          <Todo />
        </Content>
      </Layout>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);
export default AppMenu;