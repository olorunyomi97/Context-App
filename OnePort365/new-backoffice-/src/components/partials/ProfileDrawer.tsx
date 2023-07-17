import { useState } from "react";
import SlidingPane from "react-sliding-pane";

// icons
import userIcon from "assets/icons/user-plus.svg";
import EditProfileDrawer from "./EditProfileDrawer";

const ProfileDrawer = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <SlidingPane
      className="custom-slider"
      overlayClassName="some-custom-overlay-class"
      isOpen={isOpen}
      hideHeader={true}
      width="756px"
      onRequestClose={() => {
        // triggered on "<" on left top click or on outside click
        setIsOpen(false);
      }}
    >
      <div className="">
        <i
          className="ion-ios-close px-3 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></i>

        <div className="mt-10 px-2">
          <h3 className="text-xl black-text font-bold">Profile Settings</h3>

          <div className="mt-12">
            <div className="bg-light-green p-7 py-10 rounded-full w-32 flex justify-center">
              <img src={userIcon} alt="" width={40} />
            </div>

            <div className="">
              <div className="my-7">
                <p className="black-text font-medium text-sm">Account Type</p>
                <div className="mt-2 bg-light-green p-1 rounded-full w-24">
                  <p className="green-text text-xs text-center">Regular user</p>
                </div>
              </div>

              <div className="">
                <div className="top-divider py-4">
                  <div className="flex">
                    <div className="">
                      <p className="black-text font-medium text-xs mb-1">
                        First name
                      </p>
                      <p className="black-text font-semibold text-sm">
                        Tannaye
                      </p>
                    </div>

                    <div className="ml-20">
                      <p className="black-text font-medium text-xs mb-1">
                        Last name
                      </p>
                      <p className="black-text font-semibold text-sm">Dev</p>
                    </div>
                  </div>
                </div>

                <div className="top-divider py-4">
                  <p className="black-text font-medium text-xs mb-1">
                    Company Name
                  </p>
                  <p className="black-text font-semibold text-sm">
                    Grey Import Export Limited
                  </p>
                </div>

                <div className="top-divider py-4">
                  <p className="black-text font-medium text-xs mb-1">
                    Company Address
                  </p>
                  <p className="black-text font-semibold text-sm">
                    4517 Washington Ave. Manchester, Kentucky 39495
                  </p>
                </div>

                <div className="top-divider py-4">
                  <p className="black-text font-medium text-xs mb-1">
                    Email (Official Email address)
                  </p>
                  <p className="black-text font-semibold text-sm">
                    victori@oneport365.com
                  </p>
                </div>

                <div className="top-divider py-4">
                  <p className="black-text font-medium text-xs mb-1">
                    Phone Number
                  </p>
                  <p className="black-text font-semibold text-sm">
                    +2348184433609
                  </p>
                </div>
              </div>

              <div
                className="bg-green rounded-lg  py-4 w-28 mt-10 cursor-pointer"
                onClick={() => setIsEditOpen(true)}
              >
                <p className="white-text font-medium text-sm text-center">
                  Edit Profile
                </p>
              </div>
            </div>
          </div>
        </div>

        <EditProfileDrawer isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      </div>
    </SlidingPane>
  );
};

export default ProfileDrawer;
