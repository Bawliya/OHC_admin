/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { WithChildren } from "../../../../_metronic/helpers";
import { LayoutSplashScreen } from "../../../../_metronic/layout/core";
import { AuthModel, UserModel } from "./_models";
import { getUserByToken } from "./_requests";
import * as authHelper from "./AuthHelpers";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<any | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
    localStorage.removeItem("kt-auth-react-v");
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: any) => {
      try {
        // if (!currentUser) {
        // const data = await getUserByToken(apiToken?.token)
        const data = localStorage.getItem("kt-auth-react-v");
        console.log(data);
        if (data) {
          setCurrentUser(data);
        }
        // }
      } catch (error) {
        console.error(error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };
    if (auth) {
      const token: any = auth;
      requestUser(token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthInit, AuthProvider, useAuth };
