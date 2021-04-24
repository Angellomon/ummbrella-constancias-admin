import { useContext, useState } from "react";
import { MenuContext } from "../context";

export const useMenu = () => useContext(MenuContext);
