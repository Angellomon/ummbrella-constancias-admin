import React, { createContext, FC, useState } from "react";

type MenuContextType = {
  isCollapsed?: boolean;
  toggle: () => void;
};

export const MenuContext = createContext<MenuContextType>({
  toggle: () => {},
});

const MenuProvider: FC = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => {
    setIsCollapsed((c) => !c);
  };

  return (
    <MenuContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
