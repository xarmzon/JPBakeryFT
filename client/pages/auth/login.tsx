import { NextPage } from "next";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout";

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, isLoading, error: err, dispatch } = useAuth();
  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill your form properly");
      return;
    }
    login({ username, password });
  };
  console.log(err);

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "ERROR", payload: { error: "" } });
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
    }
  };

  return (
    <AuthLayout title="Login">
      {isLoading && (
        <div className="fixed z-[5] cursor-progress flex justify-center items-center inset-0 w-full h-full bg-primary/20 backdrop-blur-sm text-white font-bold text-xl">
          Loading...
        </div>
      )}
      {err && <p className="bg-red-600 text-red-200 text-sm p-2 mb-2">{err}</p>}
      <form
        onSubmit={doLogin}
        className="flex flex-col space-y-8 w-full relative"
      >
        <input
          onChange={update}
          name="username"
          value={username}
          className="text-white placeholder:text-slate-100 w-full p-3 focus:outline-none bg-transparent border rounded focus:border-primary/50 border-white/50"
          type="text"
          disabled={isLoading}
          placeholder="Enter your username"
        />
        <input
          onChange={update}
          value={password}
          name="password"
          className="text-white placeholder:text-slate-100 w-full p-3 focus:outline-none bg-transparent border rounded focus:border-primary/50 border-white/50"
          type="password"
          disabled={isLoading}
          placeholder="Enter your Password"
        />
        <input
          className="cursor-pointer w-full py-3 px-5 rounded text-white transition-all duration-500 bg-primary hover:bg-secondary-200"
          type="submit"
          value="Login"
          disabled={isLoading}
        />
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
