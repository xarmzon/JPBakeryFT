import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
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
  const { state: auth } = useContext(AuthContext);
  const performLogout = () => {};
  return (
    <nav className="flex items-center gap-5">
      {!auth.isLoading && !auth.user && (
        <>
          {links.noAuth.map((link) => (
            <Button link={link.url}>{link.text}</Button>
          ))}
        </>
      )}
      {!auth.isLoading && auth.user && (
        <>
          {links[auth.user.role].map((link) => {
            <Button link={link.url}>{link.text}</Button>;
          })}
          <Button onClick={performLogout}>Logout</Button>;
        </>
      )}
    </nav>
  );
};

export default Navbar;
