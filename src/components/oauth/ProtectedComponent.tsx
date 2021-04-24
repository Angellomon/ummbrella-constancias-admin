import React, { useState, useEffect } from "react";

import { useAuth } from "../../hooks/auth";
import type { Scope } from "../../schemas/oauth";

interface Props {
  scopes: Scope[];
}

export const ProtectedComponent: React.FC<Props> = ({ children, scopes }) => {
  const { tokenData } = useAuth();
  const [validScopes, setValidScopes] = useState(false);

  useEffect(() => {
    if (!tokenData) return;

    for (let scope of scopes) {
      if (!tokenData.scopes.includes(scope)) {
        setValidScopes(false);
        return;
      }
    }
    setValidScopes(true);
  }, [scopes, tokenData]);

  return validScopes ? <>{children}</> : null;
};

export default ProtectedComponent;
