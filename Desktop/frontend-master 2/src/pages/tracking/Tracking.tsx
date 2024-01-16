import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomTabs from "components/customTabs/CustomTabs";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import ShipmentDetailsCard from "components/shipment/ShipmentDetailsCard";
import InlandShipments from "components/tracking/InlandShipments";
import OceanShipments from "components/tracking/OceanShipments";
import TrackingDrawer from "components/tracking/TrackingDrawer";

const Tracking = (props: any): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const loading = false;

  const [tab, setTab] = useState("Inland Shipments");
  const [shipmentTab, setShipmentTab] = useState("Cargo Details");
  const [isOpen, setIsOpen] = useState(false);
  const [openAside, SetOpenAside] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = () => {};

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="shipment"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Shipments"} SetOpenAside={SetOpenAside} />

          <div className="lg:px-14 pt-5 lg:pt-10 container mx-auto  w-full">
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="lg:mr-10">
                <div className="px-7 lg:px-0">
                  <h3 className="text-2xl black-text font-bold">
                    Stay up to date with your shipment
                  </h3>
                  <p className="text-sm grey-text mt-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing.
                  </p>
                </div>

                <div className="mt-10 bg-grey p-5 rounded-lg">
                  <p className="text-black font-medium">Enter Shipment ID</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center">
                      <div className=" flex-auto w-64 mt-2">
                        <CustomInput
                          control={control}
                          name={"shipment_id"}
                          id={"shipment_id"}
                          label={""}
                          placeholder={"Enter your shipment ID"}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={false}
                          defaultValue={""}
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>

                      <div className="flex-auto w-14 ml-4">
                        {/* @ts-ignore */}
                        <PrimaryButton title="Track" loading={loading} />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mobile-only">
                  <ShipmentDetailsCard />
                </div>

                <div className="solid-br rounded-lg mt-5 py-5">
                  <div className="flex ">
                    <CustomTabs
                      tabs={["Inland Shipments", "Ocean Shipments"]}
                      activeTab={tab}
                      setActiveTab={setTab}
                      icons={["bus", "ocean"]}
                    />
                  </div>
                  <hr className={`solid-br mb-5 `} />
                  <div className="px-5">
                    {tab === "Inland Shipments" ? (
                      <InlandShipments
                        shipments={
                          //   [
                          //   "HT67484J",
                          //   "UTY7658",
                          //   "RN93748",
                          //   "CD765RT",
                          //   "EE6445K",
                          //   "OJ6435K",
                          // ]
                          []
                        }
                        setIsOpen={setIsOpen}
                      />
                    ) : (
                      <OceanShipments
                        shipments={
                          []
                          //   [
                          //   "OJ6435K",
                          //   "EE6445K",
                          //   "CD765RT",
                          //   "HT67484J",
                          //   "UTY7658",
                          //   "RN93748",
                          // ]
                        }
                        setIsOpen={setIsOpen}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="desktop-only">
                <h4 className="text-xl black-text font-semibold mb-7">
                  Shipment Details
                </h4>

                <div className="">
                  <ShipmentDetailsCard />
                </div>

                {/* <div className="my-10 w-full">
                  <CustomTabs
                    tabs={["Cargo Details", "Additional Services"]}
                    activeTab={shipmentTab}
                    setActiveTab={setShipmentTab}
                  />
                </div> */}
                {/* {shipmentTab === "Cargo Details" ? (
                  <ShipmentCargoDetails   shipments={[
                    "HT67484J",
                    "UTY7658",
                    "RN93748",
                    "CD765RT",
                    "EE6445K",
                    "OJ6435K",
                  ]}
                  isOpen={isCargoOpen}
                  setIsOpen={setIsCargoOpen} 
                  />
                ) : (
                  <ShipmentAdditionalDetails />
                )} */}
              </div>
            </div>
          </div>

          <TrackingDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

export default Tracking;
