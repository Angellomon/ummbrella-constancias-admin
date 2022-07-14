import React from "react";
import { MenuProvider } from "./context";
import { DashboardPage } from "./pages";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <DashboardPage />
      </MenuProvider>
    </BrowserRouter>
  );
}

export default App;
