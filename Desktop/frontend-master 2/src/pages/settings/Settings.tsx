import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import Layout from "components/layout/Layout";
import ProfileDrawer from "components/settings/ProfileDrawer";
import ChangePasswordDrawer from "components/settings/ChangePasswordDrawer";

//icons
import userIcon from "assets/icons/user.svg";
import lockIcon from "assets/icons/lock.svg";
import teamIcon from "assets/icons/team.svg";

const Settings = (props: any) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <>
      <Layout>
        <div className="px-7 pt-5 lg:px-14 lg:pt-10 container w-full">
          <div className="grid lg:grid-cols-2">
            <div className="">
              <div
                className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer"
                onClick={() => setIsProfileOpen(true)}
              >
                <img src={userIcon} alt="" width={20} />
                <p className="black-text ml-3 font-normal text-sm">Profile</p>
              </div>

              <Link
                to="/settings/team"
                className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5"
              >
                <img src={teamIcon} alt="" width={20} />
                <p className="black-text ml-3 font-normal text-sm">
                  Team Settings
                </p>
              </Link>

              <div
                className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                <img src={lockIcon} alt="" width={20} />
                <p className="black-text ml-3 font-normal text-sm">
                  Change Password
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <ProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
      <ChangePasswordDrawer
        isOpen={isChangePasswordOpen}
        setIsOpen={setIsChangePasswordOpen}
      />
    </>
  );
};

export default Settings;
