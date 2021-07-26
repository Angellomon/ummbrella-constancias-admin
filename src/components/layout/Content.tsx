import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { FC } from "react";
import styled, { css } from "styled-components";

const { Header, Footer } = Layout;

const StyledMenuUnfold = styled(MenuUnfoldOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3;
  &hover {
    color: #ef9b1c;
  }
`;

const StyledMenuFold = styled(MenuFoldOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3;
  &hover {
    color: #ef9b1c;
  }
`;

const StyledHeader = styled(Header)`
  background-color: white;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  padding: 0px;
  position: fixed;
  width: 100%;
  z-index: 9;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  padding: 20px 50px;
`;

type TLayoutProps = {
  collapsed: boolean;
};

const StyledLayout = styled(Layout)`
  ${(props: TLayoutProps) =>
    props.collapsed
      ? css`
          margin-left: 0px;
        `
      : css`
          margin-left: 0px;
        `}
`;

interface Props {
  collapsed?: boolean;
  onCollapse?: () => void;
}

const ContentLayout: FC<Props> = ({
  children,
  collapsed = false,
  onCollapse,
}) => {
  return (
    <StyledLayout collapsed={collapsed}>
      <StyledHeader></StyledHeader>
      {children}
      <StyledFooter>COMECARNE | Constancias</StyledFooter>
    </StyledLayout>
  );
};

export default ContentLayout;
