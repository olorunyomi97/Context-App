import React from "react";

//icons
import notFound from "assets/icons/404.svg";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex item-center justify-center h-screen">
      <div className="my-auto flex flex-col">
        <img src={notFound} alt="404" width="500" className="mb-5" />

        <Link
          to=""
          className="bg-green white-text text-center px-3 py-2 w-32 rounded mx-auto"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
