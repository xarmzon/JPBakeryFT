import { useCallback, useContext } from "react";
import { AuthContext, TUser } from "../context/AuthContext";
import { api } from "../utils/api";
const useAuth = () => {
  const {
    state: { error, isLoading, loggedIn, user },
    dispatch,
  } = useContext(AuthContext);

  const logout = useCallback(() => {
    dispatch({ type: "LOADING", payload: { isLoading: true } });
    //todo: logout user
  }, []);
  const login = useCallback(
    async (user: Pick<TUser, "username" | "password">) => {
      dispatch({ type: "LOADING", payload: { isLoading: true } });
      dispatch({ type: "ERROR", payload: { error: "" } });

      try {
        const resp = await api({
          path: "/auth/login",
          method: "POST",
          data: user,
          options: {
            headers: {
              "content-type": "application/json",
            },
          },
        });
        const data = await resp.json();
        dispatch({ type: "LOGIN", payload: { user: data } });
      } catch (error) {
        const err = error as any;
        dispatch({
          type: "ERROR",
          payload: { error: err.message || "Login failed" },
        });
      }
      dispatch({ type: "LOADING", payload: { isLoading: false } });
    },
    []
  );

  return {
    user,
    loggedIn,
    isLoading,
    error,
    login,
    logout,
    dispatch,
  };
};

export default useAuth;
