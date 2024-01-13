import React, { useState } from 'react';
import { Layout, Button, theme, ConfigProvider } from 'antd';
import { Link, useHistory } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  LogoutOutlined 
} from '@ant-design/icons';

const { Header } = Layout;

function AppHeader({ collapsed, onToggleCollapse, onToggleDarkMode ,setIsAuthenticated }) {

  const history = useHistory();
  const [isDarkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    onToggleDarkMode(!isDarkMode);
    // You can set your dark mode styles or theme here
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const onLogOutBtnClick = () => {
    setIsAuthenticated(false)
    localStorage.setItem("user", JSON.stringify(null))
    history.push(`/login`);
  }

  return (
    <Header style={{ padding: 0, background: isDarkMode ? "#0e0d0d" : "#ffffff" }}>

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggleCollapse}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Button
        type="text"
        icon={<BulbOutlined />}
        onClick={toggleDarkMode}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <div style={{ float: 'right'}}> <Button
        type="text"
        icon={<LogoutOutlined  />}
        onClick={onLogOutBtnClick}
        style={{
          fontSize: '16px',
          width: '100%',
          height: 64,
        }}
      >Log Out</Button>
      </div>
    </Header>
  );
}

export default AppHeader;
