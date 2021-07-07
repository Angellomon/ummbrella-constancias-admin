import React, { FC } from "react";
import { ExportOutlined, UserOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { useMenu } from "../../hooks";
import Logo from "../../assets/logo-comecarne.png";
import styled from "styled-components";
import { useAuth } from "../../hooks/auth";
const { Sider } = Layout;

const StlyedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  left: 0;
`;
const StyledLogo = styled.img`
  max-width: 100%;
  max-height: 60%;
  /* background-color: #ddd; */
  padding: 15px;
`;

const SiderPrincipal: FC = () => {
  const { logout } = useAuth();
  const { isCollapsed, toggle } = useMenu();
  return (
    <StlyedSider collapsible collapsed={isCollapsed} onCollapse={toggle}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <StyledLogo alt="logo" src={Logo} />
        <Menu.Item key="1" icon={<UserOutlined />}>
          Asistentes
        </Menu.Item>
        <Menu.Item key="2" icon={<ExportOutlined />} onClick={() => logout()}>
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </StlyedSider>
  );
};

export default SiderPrincipal;
