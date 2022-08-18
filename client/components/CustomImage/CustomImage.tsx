import Image, { ImageLoaderProps, ImageProps } from "next/image";
import React from "react";

interface ICustomImage extends ImageProps {}

const customLoader = ({ src }: ImageLoaderProps) => src;

const CustomImage = (props: ICustomImage) => {
  const { ...rest } = props;
  return <Image {...rest} />;
};

export default CustomImage;
