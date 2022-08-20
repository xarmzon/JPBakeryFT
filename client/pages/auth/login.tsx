import { NextPage } from "next";
import React, { useState } from "react";
import AuthLayout from "../../layout/AuthLayout";

const LoginPage: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const login = async(username:string,password:string)=>{
  //         try {

  //             dispatch({type: "LOADING", payload: {isLoading:false}})

  //         } catch (err) {
  //             const e = err as any
  //             dispatch({type: "ERROR", payload: {error:e.message}})
  //         }
  //   }
  return <AuthLayout title="Login">LoginPage</AuthLayout>;
};

export default LoginPage;
