import { createContext, useEffect, useReducer } from "react";
import {
  setAuthenticatedLocalStorage,
  getAuthenticatedLocalStorage,
  getPasswordLocalStorage,
  removePasswordLocalStorage,
  setPasswordLocalStorage,
  getUsernameLocalStorage,
  removeUsernameLocalStorage,
  setUsernameLocalStorage,
} from "app/services/localStorageService";
// GLOBAL CUSTOM COMPONENTS
import { MatxLoading } from "app/components";
import axios from "axios";
import { loginAPI } from "app/views/staff-management/Account/AccountService";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};
const setSession = (isAuthenticated, username, password) => {
  
  if (isAuthenticated) {
    setAuthenticatedLocalStorage(isAuthenticated);
    setUsernameLocalStorage(username);
    setPasswordLocalStorage(password);
  } else {
    setAuthenticatedLocalStorage(false);
    setUsernameLocalStorage("");
    setPasswordLocalStorage("");
  }
};
const AuthContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isAuthenticated, isInitialized: true };
    //  case login : set isAuthenticated = true, user = action.payload.user
    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, user, isAuthenticated: true };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default: {
      return state;
    }
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (Username, Password) => {
    const response = await loginAPI(Username, Password);
    const { data } = response;
    setSession(true, data?.Username, data?.Pass);
    // dispatch action LOGIN
    dispatch({ type: "LOGIN", payload: { user: data } });
  };
  
  const register = async (Username, Pass) => {
    const { data } = await axios.post("/api/auth/register", {
      Username,
      Pass,
    });
    const { user } = data;

    setSession(true, user?.Username, user?.Password);
    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };
  useEffect(() => {
    if (!getAuthenticatedLocalStorage()) {
      setAuthenticatedLocalStorage(false);
    }
    if (!getUsernameLocalStorage()) {
      setUsernameLocalStorage("");
    }
    if (!getPasswordLocalStorage()) {
      setPasswordLocalStorage("");
    }
    (async () => {
      try {
        if (
          getAuthenticatedLocalStorage() === "true" &&
          getUsernameLocalStorage() !== "" &&
          getPasswordLocalStorage() !== ""
        ) {
          const response = await loginAPI(getUsernameLocalStorage(), getPasswordLocalStorage());
          const { data } = response;
          
          if (!data) {
            dispatch({
              type: "INITIALIZE",
              payload: { isAuthenticated: false, user: null },
            });
            return;
          }

          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: true, user },
          });

        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.log(err);

        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);
  
  if(!state.isInitialized) return <MatxLoading/>;

  return (
    <AuthContext.Provider value={{...state, login, register, logout}}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
