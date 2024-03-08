import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const navigate = useNavigate();
  const clickHandler = (link) => {
    if (link === "signout") {
      localStorage.removeItem("UserInfo");
      navigate(`/login`);
    } else {
      navigate(`/${link}`);
      console.log(`/${link}`);
    }
  };

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg> */}
            <span className="ml-3 text-xl">NoteSphere</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900">First Link</Link>
            <Link className="mr-5 hover:text-gray-900">Second Link</Link>
            <Link className="mr-5 hover:text-gray-900">Third Link</Link>
            <Link className="mr-5 hover:text-gray-900">Fourth Link</Link>
          </nav>
          <div className="flex gap-2">
            {!localStorage.getItem("UserInfo") ? (
              <>
                <button
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                  onClick={() => {
                    clickHandler("login");
                  }}
                >
                  Login
                </button>
                <button
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                  onClick={() => {
                    clickHandler("signup");
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <button
                className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                onClick={() => {
                  clickHandler("signout");
                }}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
