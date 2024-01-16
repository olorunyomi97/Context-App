import React, { useState } from "react";
import SlidingPane from "react-sliding-pane";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";

import "react-sliding-pane/dist/react-sliding-pane.css";

// icons
import onePortLogo from "assets/icons/oneport-logo.png";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isPaneOpen, setisPaneOpen] = useState(false);

  //   @ts-ignore
  const { user_token } = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <>
      <header className="shadow ">
        <div className="lg:px-40 px-7 py-2  flex  sm:w-full md:w-full lg:w-full  text-white     justify-between bg-white-900">
          <div className="cursor-pointer mobile-only">
            <button
              className="flex items-center pr-3  mg-top py-3 borderx inline-x text-black roundedx text-black-200 border-black-400 hover:text-black hover:border-black"
              onClick={() => {
                setisPaneOpen(true);

                //handleToggle()
              }}
            >
              <svg
                className="fill-current h-5 w-5"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            <Link to="/">
              <img
                src={onePortLogo}
                className={
                  !toggleMenu
                    ? "w-18 h-8  inline-x  image-logo"
                    : "w-18 h-8  no-display  image-logo"
                }
                alt="oneport logo"
              />
            </Link>
          </div>

          <div className="">
            <Link to="/">
              <img
                src={onePortLogo}
                className="w-18 h-10 px-5 image-logo desktop-only"
                alt="oneport logo"
              />
            </Link>
          </div>

          <div
            className={
              toggleMenu
                ? "md:flex   md:pt-0 pt-10 w-full md:w-auto"
                : "hidden md:flex"
            }
            id="menu"
          >
            <ul className="desktop-only">
              <ScrollLink
                to="why-oneport"
                spy={true}
                smooth={true}
                offset={50}
                duration={1000}
              >
                <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3 inter-custom-fnt text-sm text-black  ">
                  Why Oneport365
                </li>
              </ScrollLink>
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={50}
                duration={1000}
              >
                <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3 inter-custom-fnt text-sm text-black ">
                  <div className="group inline-block">
                    <button className="outline-none focus:outline-none  px-3x py-1x bg-transparent rounded-sm flex items-center min-w-32">
                      <span className=" block text-sm px-4x py-2  inter-custom-fnt   rounded text-black-10 ml-2x  hover:text-black mt-4x hover:bg-black-100 lg:mt-0 pr-1 hover:text-black-700 inter-custom-fnt text-sm  text-black">
                        Services
                      </span>
                      {/* <span className="text-black">
                        <svg
                          className="fill-current h-4 w-4 transform group-hover:-rotate-180
                    transition duration-150 ease-in-out"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span> */}
                    </button>
                  </div>
                </li>
              </ScrollLink>
              {/* <li className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3 inter-custom-fnt text-sm text-black ">
                <div className="group inline-block">
                  <button className="outline-none focus:outline-none  px-3x py-1x bg-transparent rounded-sm flex items-center min-w-32">
                    <span className=" block text-sm px-4x py-2  inter-custom-fnt   rounded text-black-10 ml-2x  hover:text-black mt-4x hover:bg-black-100 lg:mt-0 pr-1 hover:text-black-700 inter-custom-fnt text-sm  text-black">
                      Learn or Resources
                    </span>
                  </button>
                </div>
              </li> */}
              {/* <li className="md:inline-block cursor-pointer hover:text-black-500 border-b md:border-none py-2 px-3 text-black inter-custom-fnt text-sm ">
                Blog
              </li>
              <li className="md:inline-block cursor-pointer hover:text-black-500 border-b md:border-none py-2 px-3 text-black  inter-custom-fnt text-sm">
                Media
              </li> */}
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={50}
                duration={1000}
              >
                <li className="md:inline-block cursor-pointer hover:text-black-500 border-b md:border-none py-2 px-3 text-black  inter-custom-fnt text-sm border-right-gray ">
                  Contact Us
                </li>
              </ScrollLink>

              <li className="md:inline-block cursor-pointer hover:text-black-500 border-b md:border-none py-2 px-3 text-black  inter-custom-fnt text-sm">
                <Link
                  to={`${!user_token && !token ? "/signin" : "/dashboard"} `}
                  className="bg-green-500 hover:bg-green-700   inter-custom-fnt     text-white text-sm font-bold py-2 px-4 rounded"
                >
                  {!user_token && !token ? "Sign In" : "Dashboard"}
                </Link>
              </li>
            </ul>
          </div>
          {!toggleMenu ? (
            <button className="bg-green-500  mobile-only   hover:bg-green-700  float-right inter-custom-fnt     text-white text-sm font-bold py-2 px-4 rounded">
              <Link to={`${!user_token && !token ? "/signin" : "/dashboard"} `}>
                {!user_token && !token ? "Sign In" : "Dashboard"}
              </Link>
            </button>
          ) : (
            <></>
          )}
        </div>
      </header>
      <SlidingPane
        className="custom-slider mobile-only z-20"
        overlayClassName="some-custom-overlay-class"
        isOpen={isPaneOpen}
        from="left"
        hideHeader={true}
        width={"70%"}
        title="Hey, it is optional pane title.  I can be React component too."
        subtitle="Optional subtitle."
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setisPaneOpen(false);
        }}
      >
        <div className="flex">
          <Link to="/" onClick={() => setisPaneOpen(false)}>
            <img
              src={onePortLogo}
              className="w-18 h-8 image-logo"
              alt="oneport logo"
            />
          </Link>

          <i
            className="ion-ios-close text-3xl ml-auto mr-10"
            onClick={() => setisPaneOpen(false)}
          ></i>
        </div>

        <div className="w-full bg-whitex margin-top rounded-lg shadow-lgx lg:w-full">
          <ul className="divide-y-2 divide-gray-100">
            <ScrollLink
              to="why-oneport"
              spy={true}
              smooth={true}
              offset={50}
              duration={1000}
              onClick={() => setisPaneOpen(false)}
            >
              <li className="flex black-text justify-between p-3  hover:bg-gray-200 hover:text-white-700">
                Why Oneport365?
              </li>
            </ScrollLink>

            <ScrollLink
              to="services"
              spy={true}
              smooth={true}
              offset={50}
              duration={1000}
              onClick={() => setisPaneOpen(false)}
            >
              <li className="flex black-text justify-between margin-top p-3 hover:bg-gray-200 hover:text-white-700">
                Service
              </li>
            </ScrollLink>

            {/* <li className="flex black-text justify-between margin-top p-3 hover:bg-gray-200 hover:text-white-700">
              Blog
            </li>

            <li className="flex  black-text justify-between margin-top p-3 hover:bg-gray-200 hover:text-white-700">
              Media
            </li> */}

            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={50}
              duration={1000}
              onClick={() => setisPaneOpen(false)}
            >
              <li className="flex black-text  justify-between margin-top p-3 hover:bg-gray-200 hover:text-white-700">
                Contact Us
              </li>
            </ScrollLink>
          </ul>
        </div>
      </SlidingPane>
    </>
  );
};

export default NavBar;
