import Link from "next/link";
import React from "react";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  link?: string;
}
const Button = (props: IButton) => {
  const { className = "", link = false, children, ...rest } = props;
  return link ? (
    <Link href={link}>
      <a
        className={`underline text-primary-100 decoration-primary-100 ${className}`}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button
      className={`px-5 py-2 bg-primary rounded hover:bg-secondary duration-500 transition-all text-white cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
