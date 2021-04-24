import React from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { Store } from "antd/lib/form/interface";
import styled from "styled-components";

interface Props {
  onFinish: (values: Store | any) => void;
  loading?: boolean;
}

const { Password } = Input;

const StyledForm = styled(Form)`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const IconUsuario = styled(UserOutlined)`
  color: rgb(0, 0, 0, 0.25);
`;

const IconPassword = styled(LockOutlined)`
  color: rgb(0, 0, 0, 0.25);
`;

export const FormLogin: React.FC<Props> = ({ onFinish, loading }) => {
  return (
    <StyledForm name="login" onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input prefix={<IconUsuario />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Password prefix={<IconPassword />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default FormLogin;
