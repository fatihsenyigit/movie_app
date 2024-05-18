import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const values = {};
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
