import React, { Component } from "react";
import loadinglight from "./loadinglight.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={loadinglight} alt="" />
    </div>
  );
};

export default Spinner;
