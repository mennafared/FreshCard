import React from "react";
import image404 from "../../assets/404.jpg";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto flex justify-center items-center">
        <img src={image404} className=" w-2/3 mx-auto" alt="" />
      </div>
    </>
  );
}
