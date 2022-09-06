import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { AuthContext, TUser } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout";

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { login, isLoading, error: err, dispatch } = useAuth();
  const doLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill your form properly");
      return;
    }
    login({ username, password }, (role) => {
      console.log(role);
      alert("Login successfully");
    });
  };

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
      {isLoading && <Loader />}
      {err && <Error text={err} />}
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
          placeholder="Enter your Username"
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
        <div className="text-center !mt-2">
          <Link href="/auth/register">
            <a className="text-white hover:text-primary">Register Here</a>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
