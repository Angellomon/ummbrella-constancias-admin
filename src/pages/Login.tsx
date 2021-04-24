import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import FormLogin from "../components/forms/Login";
import type { Store } from "antd/lib/form/interface";
import { login } from "../context/auth";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const PageLogin: React.FC = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      console.log("fuera de login");
    };
  }, []);

  const handleLogin = async (values: Store) => {
    try {
      setIsLoading(true);
      const valid = await login(values.username, values.password);
      if (valid) {
        history.push("/asistentes"); // * página de inicio
      } else {
        history.push("/login");
      }
    } catch (error) {
      message.error("Login incorrecto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormLogin onFinish={handleLogin} loading={isLoading} />
    </FormContainer>
  );
};

export default PageLogin;
