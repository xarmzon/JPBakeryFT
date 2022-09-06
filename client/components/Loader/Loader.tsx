import React from "react";

interface LoaderProps {
  text?: string;
}
const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="fixed z-[5] cursor-progress flex justify-center items-center inset-0 w-full h-full bg-primary/20 backdrop-blur-sm text-white font-bold text-xl">
      {text}
    </div>
  );
};

export default Loader;
