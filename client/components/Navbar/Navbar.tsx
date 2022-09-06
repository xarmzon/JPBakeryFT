import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import Button from "../Button/Button";

interface ILink {
  text: string;
  url: string;
}
type TKeys = "admin" | "buyer" | "noAuth";
type TLinks = {
  [key in TKeys]: ILink[];
};
const links: TLinks = {
  admin: [{ text: "Dashboard", url: "/dashboard/admin" }],
  buyer: [{ text: "Dashboard", url: "/dashboard/orders" }],
  noAuth: [
    { text: "Login", url: "/auth/login" },
    { text: "Register", url: "/auth/register" },
  ],
};

const Navbar = () => {
  const { isLoading, user, logout } = useAuth();

  return (
    <nav className="flex items-center gap-5">
      {!isLoading && !user && (
        <>
          {links.noAuth.map((link) => (
            <Button link={link.url}>{link.text}</Button>
          ))}
        </>
      )}
      {!isLoading && user && (
        <>
          {links[user.role].map((link) => (
            <Button link={link.url}>{link.text}</Button>
          ))}
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
