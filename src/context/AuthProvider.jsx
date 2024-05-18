import { createContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    return createContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
  const values = {currentUser};
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
