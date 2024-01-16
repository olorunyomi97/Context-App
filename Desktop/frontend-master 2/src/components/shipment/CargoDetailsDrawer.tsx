import React from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";

// icons
import edit from "assets/icons/edit.svg";

function CargoDetailsDrawer(props: any) {
  const { isOpen, setIsOpen } = props;

  return (
    <>
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
            className="ion-ios-arrow-round-back py-1 px-3 bg-grey text-3xl rounded-full black-text cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></i>

          <div className="mt-10 px-2">
            <h3 className="text-2xl black-text font-bold">
              Container - HT67484J
            </h3>
            <p className="text-sm grey-text mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </p>
          </div>
        </div>
        <div className="mt-7">
          <div className="flex p-5 solid-br rounded-t-lg">
            <div className="">
              <p className="black-text text-sm font-medium">
                Size of Container
              </p>
            </div>

            <div className="ml-auto">
              <p className="black-text text-sm font-medium text-right">20 Ft</p>
            </div>
          </div>
          <div className="flex p-5  left-divider right-divider">
            <div className="">
              <p className="black-text text-sm font-medium">
                No of Container(s)
              </p>
            </div>

            <div className="ml-auto">
              <p className="black-text text-sm font-medium text-right">2</p>
            </div>
          </div>

          <div className="flex p-5 top-divider left-divider right-divider">
            <div className="">
              <p className="black-text text-sm font-medium">Type of goods</p>
            </div>

            <div className="ml-auto">
              <p className="black-text text-sm font-medium text-right">
                Solid Minerals
              </p>
            </div>
          </div>
          <div className="flex p-5 top-divider left-divider right-divider">
            <div className="">
              <p className="black-text text-sm font-medium">
                Total value of goods
              </p>
            </div>

            <div className="ml-auto">
              <p className="black-text text-sm font-medium text-right">
                ₦2,000,000
              </p>
            </div>
          </div>
          <div className="flex p-5 solid-br rounded-b-lg items-center">
            <div className="">
              <p className="black-text text-sm font-medium">
                Cargo Description
              </p>
            </div>

            <div className="ml-auto lg:pl-40">
              <p className="black-text text-sm font-medium text-right ">
                sit amet.n Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Sit perferendis placeat doloremque distinctio ut possimus
                vitae eos, laborum sed pariatur.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="flex mt-5">
          <div className="ml-auto">
            <Link
              to="#"
              className="bg-grey white-text text-sm py-3 px-4 w-full rounded  flex"
            >
              Edit Cargo Details{" "}
              <img src={edit} alt="" width={15} height={15} className="ml-2" />
            </Link>
          </div>
        </div> */}
      </SlidingPane>
    </>
  );
}

export default CargoDetailsDrawer;
