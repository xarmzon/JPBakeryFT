import React from "react";
import { APP_NAME } from "../../utils/config";
import Button from "../Button/Button";
import CustomImage from "../CustomImage/CustomImage";

const Main = () => {
  return (
    <main className="flex w-full min-h-[90vh] flex-1 overflow-x-hidden relative bg-cake1 bg-center bg-cover bg-no-repeat flex-col items-center justify-center px-20 text-center">
      <div className="-z-1 absolute inset-0 w-full h-full bg-white/60 backdrop-blur-[3px]"></div>
      <div className="z-1 relative">
        <div className="w-32 mx-auto mb-2">
          <CustomImage
            src="/images/logo.png"
            layout="intrinsic"
            width="100%"
            height="100%"
          />
        </div>
        <h1 className="">{APP_NAME}</h1>
        <h3 className="mt-5 mb-8">Cake Ordering Service</h3>
        <Button>Order Now</Button>
      </div>
    </main>
  );
};

export default Main;
