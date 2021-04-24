import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import { SWRConfig } from "swr";

import { PageLogin } from "./Login";
import { doGet } from "../util/fetchers";
import ProtectedComponent from "../components/oauth/ProtectedComponent";
import { Scope } from "../schemas/oauth";
import { AsistentesPage } from "./asistentes";
import { AsistentesProvider } from "../context/asistentes";
import { default as DashboardLayout } from "../components/layout/Dashboard";

const Dashboard: FC = () => {
  return (
    <Switch>
      <Route path="/login" component={PageLogin} />
      <AuthProvider>
        <SWRConfig
          value={{
            fetcher: doGet,
          }}
        >
          <DashboardLayout>
            <ProtectedComponent scopes={[Scope.READ_ASISTENTES]}>
              <AsistentesProvider>
                <AsistentesPage />
              </AsistentesProvider>
            </ProtectedComponent>
          </DashboardLayout>
        </SWRConfig>
      </AuthProvider>
    </Switch>
  );
};

export default Dashboard;
