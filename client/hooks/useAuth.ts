import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext, TUser } from "../context/AuthContext";
import { api } from "../utils/api";

export type TRegData = "username" | "password" | "email" | "address";
const useAuth = () => {
  const {
    state: { error, isLoading, loggedIn, user },
    dispatch,
  } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const userLocalString = localStorage.getItem("user");
    if (userLocalString) {
      dispatch({
        type: "LOGIN",
        payload: { user: JSON.parse(userLocalString), loggedIn: true },
      });
    }
    dispatch({ type: "LOADING", payload: { isLoading: false } });
  }, []);
  const logout = useCallback(() => {
    dispatch({ type: "LOADING", payload: { isLoading: true } });
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT", payload: {} });

    setTimeout(() => {
      dispatch({ type: "LOADING", payload: { isLoading: false } });
      router.push("/");
    }, 2000);
  }, []);

  const register = useCallback(
    async (user: Pick<TUser, TRegData>, callback: () => void) => {
      dispatch({ type: "LOADING", payload: { isLoading: true } });
      dispatch({ type: "ERROR", payload: { error: "" } });

      try {
        const resp = await api({
          path: "/auth/register",
          method: "POST",
          data: { ...user, role: "buyer" },
          options: {
            headers: {
              "content-type": "application/json",
            },
          },
        });
        const data = await resp.json();
        if (resp.ok) {
          callback();
        } else {
          throw new Error(data.msg || resp.statusText);
        }
      } catch (error) {
        const err = error as any;
        dispatch({
          type: "ERROR",
          payload: { error: err.message || "Registration failed" },
        });
      }

      dispatch({ type: "LOADING", payload: { isLoading: false } });
    },
    []
  );
  const login = useCallback(
    async (
      user: Pick<TUser, "username" | "password">,
      callback: (role: TUser["role"]) => void
    ) => {
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
        if (resp.ok) {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...data.user, token: data.token })
          );
          dispatch({
            type: "LOGIN",
            payload: { user: data.user, loggedIn: true },
          });

          callback(data.user.role);
        } else {
          throw new Error(data.msg || resp.statusText);
        }
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
    register,
    dispatch,
  };
};

export default useAuth;
