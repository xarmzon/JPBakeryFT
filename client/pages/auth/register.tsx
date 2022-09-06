import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { TUser } from "../../context/AuthContext";
import useAuth, { TRegData } from "../../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout";

const formTypes = {
  username: "text",
  password: "password",
  email: "email",
  address: "text",
};

const Register: NextPage = () => {
  const router = useRouter();
  const { isLoading, error, register } = useAuth();
  const [formData, setFormData] = useState<Pick<TUser, TRegData>>({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const updateFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: val }));
  };
  const regSuccessful = () => {
    alert("Registration successful");
    router.push("/auth/login");
  };
  const doRegistration = (e: FormEvent) => {
    e.preventDefault();

    const canReg = Object.keys(formData).every((key) => {
      return formData[key as keyof typeof formData].length > 0;
    });
    if (canReg) register(formData, regSuccessful);
    else alert("Please Fill your form properly");
  };

  return (
    <AuthLayout title="Register">
      {isLoading && <Loader text="Please wait..." />}
      {error && <Error text={error} />}
      <form
        onSubmit={doRegistration}
        className="flex flex-col space-y-5 w-full"
      >
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            onChange={updateFormData}
            name={field}
            value={formData[field as keyof typeof formData]}
            className="text-white placeholder:capitalize placeholder:text-slate-100 w-full p-3 focus:outline-none bg-transparent border rounded focus:border-primary/50 border-white/50"
            type={formTypes[field as keyof typeof formTypes]}
            disabled={isLoading}
            placeholder={`Enter your ${field}`}
            required
          />
        ))}
        <button
          className="cursor-pointer w-full py-3 px-5 rounded text-white transition-all duration-500 bg-primary hover:bg-secondary-200"
          type="submit"
          disabled={isLoading}
        >
          Register
        </button>
        <div className="text-center !mt-2">
          <Link href="/auth/login">
            <a className="text-white hover:text-primary">Login Here</a>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
