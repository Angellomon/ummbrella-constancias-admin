import React, { FC } from "react";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useMenu } from "../../hooks";
import Logo from "../../assets/logo-comecarne.png";
import styled from "styled-components";
import { useAuth } from "../../hooks/auth";
import { useEventos } from "../../hooks/eventos";

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
  const { logout, isAuthenticated, tokenData } = useAuth();
  const { isCollapsed, toggle } = useMenu();

  const { eventos } = useEventos();
  const navigate = useNavigate();

  if (!tokenData || !isAuthenticated) return null;

  return (
    <StlyedSider collapsible collapsed={isCollapsed} onCollapse={toggle}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <StyledLogo alt="logo" src={Logo} />
        {eventos?.map((e) => (
          <Menu.Item
            key={e.clave}
            onClick={() => navigate(`/evento/${e.clave}`)}
          >
            {e.nombre}
          </Menu.Item>
        ))}
        <Menu.Item key="add_evento" icon={<PlusOutlined />}>
          Nuevo Evento
        </Menu.Item>
        <Menu.Item key="2" icon={<ExportOutlined />} onClick={() => logout()}>
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </StlyedSider>
  );
};

export default SiderPrincipal;
