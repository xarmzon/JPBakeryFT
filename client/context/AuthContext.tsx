import { createContext, Dispatch, ReactNode, useReducer } from "react";

export type TUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  address: string;
  role: "admin" | "buyer";
  token: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
};
type TAuthState = {
  loggedIn: boolean;
  user: undefined | null | TUser;
  isLoading: boolean;
  error: string;
};
type TActionType = "LOGIN" | "LOGOUT" | "LOADING" | "ERROR";

type TActionWithoutPayload = {
  type: TActionType;
};
type TActionWithPayload = {
  type: TActionType;
  payload: Partial<TAuthState>;
};
type TAction = TActionWithoutPayload & TActionWithPayload;

const initialState: TAuthState = {
  loggedIn: false,
  user: null,
  isLoading: true,
  error: "",
};
type TContextProps = {
  state: TAuthState;
  dispatch: Dispatch<TAction>;
};
export const AuthContext = createContext<TContextProps>({
  state: initialState,
  dispatch: () => {},
});

const authReducer = (state: TAuthState, action: TAction): TAuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn || false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loggedIn: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading || false,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload.error || "",
      };

    default:
      return state;
  }
};

interface IAuthProvider {
  children: ReactNode;
}
const AuthProvider = ({ children }: IAuthProvider) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
