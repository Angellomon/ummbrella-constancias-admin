import styled from "styled-components";

const headerOffset = 24;

export const PageContent = styled.div`
  margin: 0px 16px;
  padding: 30px ${headerOffset}px;
  background-color: white;
`;

export const CardContainer = styled.div`
  margin: 0;
  padding: 0 ${headerOffset}px;
`;

export const PageHeader = styled.div`
  background-color: white;
  margin-bottom: 16px;
`;

export const PageContainer = styled.section`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-content: space-around;
`;
