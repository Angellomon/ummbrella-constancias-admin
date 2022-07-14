import React, { createContext, FC, PropsWithChildren, useState } from "react";

type MenuContextType = {
  isCollapsed?: boolean;
  toggle: () => void;
};

export const MenuContext = createContext<MenuContextType>({
  toggle: () => {},
});

interface Props extends PropsWithChildren {}

const MenuProvider: FC<Props> = ({ children }) => {
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
