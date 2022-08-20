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
  admin: [],
  buyer: [],
  noAuth: [],
};

const Navbar = () => {
  const { state: auth } = useContext(AuthContext);
  return (
    <nav className="flex items-center gap-2">
      {!auth.isLoading && !auth.user && (
        <div className="">
          {links.noAuth.map((link) => (
            <Button link={link.url}>{link.text}</Button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
