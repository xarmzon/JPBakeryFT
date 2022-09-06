import React from "react";

interface ErrorProps {
  text: string;
}
const Error = ({ text }: ErrorProps) => {
  return <p className="bg-red-600 text-red-200 text-sm p-2 mb-2">{text}</p>;
};

export default Error;
