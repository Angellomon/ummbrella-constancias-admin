import React from "react";
import { MenuProvider } from "./context";
import { DashboardPage } from "./pages";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <MenuProvider>
        <DashboardPage />
      </MenuProvider>
    </Router>
  );
}

export default App;
