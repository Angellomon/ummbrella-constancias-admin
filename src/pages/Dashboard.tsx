import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import { SWRConfig } from "swr";

import { PageLogin } from "./Login";
import { doGet } from "../util/fetchers";
import ProtectedComponent from "../components/oauth/ProtectedComponent";
import { Scope } from "../schemas/oauth";
import { default as DashboardLayout } from "../components/layout/Dashboard";
import { PageEvento } from "./eventos";
import EventoProvider from "../context/eventos/EventoContext";

const Dashboard: FC = () => {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: doGet,
        }}
      >
        <DashboardLayout>
          <Routes>
            <Route path="/login" element={<PageLogin />} />
            <Route
              path="/evento/:claveEvento"
              element={
                <ProtectedComponent scopes={[Scope.READ_ASISTENTES]}>
                  <EventoProvider>
                    <PageEvento />
                  </EventoProvider>
                </ProtectedComponent>
              }
            />
          </Routes>
        </DashboardLayout>
      </SWRConfig>
    </AuthProvider>
  );
};

export default Dashboard;
