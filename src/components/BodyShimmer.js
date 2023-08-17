import React from "react";

const BodyShimmer = () => {
  return (
    <div className="flex flex-wrap justify-between h-[100vh]">
      {Array(4)
        .fill("")
        .map((e, index) => (
          <div
            className="bg-gray-300 w-72 h-52 shadow-lg m-20 rounded-lg"
            key={index}
          ></div>
        ))}
      {Array(16)
        .fill("")
        .map((e, index) => (
          <div
            className="bg-gray-300 w-72 h-36 shadow-lg m-20 mt-8 rounded-lg"
            key={index}
          >
            <ul className="mt-40">
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default BodyShimmer;
