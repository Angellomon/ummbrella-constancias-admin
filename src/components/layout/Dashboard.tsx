import React, { FC, PropsWithChildren } from "react";
import { Layout } from "antd";
import SiderPrincipal from "./Sider";
import ContentPrincipal from "./Content";

interface Props extends PropsWithChildren {}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <Layout>
      <SiderPrincipal />
      <ContentPrincipal>{children}</ContentPrincipal>
    </Layout>
  );
};

export default DashboardLayout;
