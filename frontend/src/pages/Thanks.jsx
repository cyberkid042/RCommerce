import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Thanks = () => {
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    document.title = "RCommerce | Thanks for shopping with us";
  });
  return <div>Successfull</div>;
};

export default Thanks;
