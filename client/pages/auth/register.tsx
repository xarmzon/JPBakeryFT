import { NextPage } from "next";
import { useContext, useState } from "react";
import { AuthContext, TUser } from "../../context/AuthContext";
import AuthLayout from "../../layout/AuthLayout";

type TRegData = "username" | "password" | "email" | "address";
const Register: NextPage = () => {
  const { state: auth, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState<Pick<TUser, TRegData>>({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  console.log(auth);
  return <AuthLayout title="Register">Register</AuthLayout>;
};

export default Register;
