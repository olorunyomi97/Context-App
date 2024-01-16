import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

//icons
import Avatar from "assets/images/avatar.png";
import onePortLogo from "assets/icons/oneport-logo.png";

const TopBar = (props: any): JSX.Element => {
  const { title, SetOpenAside } = props;

  let user = useSelector((state: any) => state.auth.user_data);

  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const location = useLocation();

  return (
    <>
      {/* desktop top bar */}
      <div className="top-bar top-bar-bg py-5 px-7 lg:px-14 lg:w-full w-screen desktop-only">
        <div className="flex items-center w-full">
          <h3 className="text-2xl text-black font-semibold">{title}</h3>

          <Link to="/tracking" className="ml-auto mr-2">
            {/* {@to-do uncomment here when tracking is ready} */}
            {/* <p className=" bg-white  solid-br black-text text-sm py-3 px-6 w-full rounded">
              Track Shipments
            </p> */}
          </Link>

          <div className=" right-divider">
            {location.pathname === "/new-shipment" ? (
              <></>
            ) : (
              <Link to="/new-shipment">
                <div className="ml-2 pr-5">
                  <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded">
                    Start New Shipment
                  </p>
                </div>
              </Link>
            )}
          </div>

          <div className="flex items-center ml-4">
            <img
              src={`
               https://ui-avatars.com/api/?background=3ab44a&color=ffffff&name=${user.firstname}+${user.lastname}`}
              alt=""
              className="rounded-full w-12"
            />
            <div className="">
              <p className="text-sm black-text font-semibold ml-3">
                {" "}
                {user.firstname}
              </p>
              {/* <p className="mt-1 py-1 px-2 bg-grey text-xs black-text rounded-full">
                Regular user
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* mobile top bar */}
      <div className=" top-bar-bg py-5 px-7 w-full mobile-only">
        <div className="flex items-center mb-5">
          <i
            className="ion-ios-menu text-2xl"
            onClick={() => SetOpenAside(true)}
          ></i>
          <div className=" ml-auto">
            <Link to="/settings">
              <img
                src={`
                https://ui-avatars.com/api/?background=3ab44a&color=ffffff&name=${user.firstname}+${user.lastname}`}
                className="rounded-full w-10"
                alt=""
              />
            </Link>
          </div>
          {/* <div className="ml-3">
            <i className="ion-ios-notifications-outline text-2xl"></i>
          </div> */}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl text-lg text-black font-semibold">
            {title}
          </h3>

          {/* <Link to="/tracking" className="ml-auto mr-2">
            <p className=" bg-white  solid-br black-text text-sm py-1.5 px-3 w-full rounded">
              Track
            </p>
          </Link> */}

          <div className="">
            {location.pathname === "/new-shipment" ? (
              <></>
            ) : (
              <Link to="/new-shipment">
                <p className="btn bg-green white-text text-sm py-1.5 px-3 w-full rounded">
                  New Shipment
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
