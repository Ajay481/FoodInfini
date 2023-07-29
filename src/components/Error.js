import React from "react";
import { useRouteError } from "react-router-dom";
import { ERROR } from "../utils/constants";

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <img className="w-[100vw] h-[100vh]" alt="error" src={ERROR} />
      <div className="absolute top-0 text-center ml-[50rem] mt-[37rem]">
        <h2 className="text-4xl font-bold">
          {err === undefined ? null : err.status + " : " + err.statusText}
        </h2>
      </div>
    </div>
  );
};

export default Error;
