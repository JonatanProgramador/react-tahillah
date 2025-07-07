import { createContext, ReactNode, useState } from "react";
import UserService from "../services/apirest/UserService";




interface props {
  children: ReactNode;
}

interface ThemeContextType {
  userSecurityLevel: number,
  setUserSecurityLevel: () => Promise<void>
}

export const userSecurityLevelContext = createContext<ThemeContextType>({
  userSecurityLevel: -1,
  setUserSecurityLevel: async () => { }
});

export const UserSecurityLevel: React.FC<props> = ({ children }) => {

  const [userSecurityLevel, setUserSecurityLevel] = useState(-1);

  async function getUserSecurityLevel() {
    setUserSecurityLevel(await UserService.isLogin());
  }


  return (<userSecurityLevelContext.Provider value={{userSecurityLevel, setUserSecurityLevel:getUserSecurityLevel}}>
    {children}
  </userSecurityLevelContext.Provider>
  );
}