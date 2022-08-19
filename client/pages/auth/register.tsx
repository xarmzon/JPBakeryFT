import { NextPage } from "next";
import { useState } from "react";
import { TUser } from "../../context/AuthContext";
import AuthLayout from "../../layout/AuthLayout";

type TRegData = "username" | "password" | "email" | "address";
const Register: NextPage = () => {
  const [formData, setFormData] = useState<Pick<TUser, TRegData>>({
    username: "",
    password: "",
    email: "",
    address: "",
  });

  return <AuthLayout>Register</AuthLayout>;
};

export default Register;
