import { AuthContext } from "../context/AuthContextContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be in AuthContextProvider");
  }

  return context;
};
