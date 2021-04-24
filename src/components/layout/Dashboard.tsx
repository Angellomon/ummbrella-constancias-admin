import React, { FC } from "react";
import { Layout } from "antd";
import SiderPrincipal from "./Sider";
import ContentPrincipal from "./Content";

const DashboardLayout: FC = ({ children }) => {
  return (
    <Layout>
      <SiderPrincipal />
      <ContentPrincipal>{children}</ContentPrincipal>
    </Layout>
  );
};

export default DashboardLayout;
