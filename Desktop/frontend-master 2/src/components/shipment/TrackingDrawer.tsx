import { useState } from "react";
import SlidingPane from "react-sliding-pane";

//components
import CustomTabs from "components/customTabs/CustomTabs";
import CustomVerticalSteps from "components/customSteps/CustomVerticalStep";

const TrackingDrawer = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const [tab, setTab] = useState("Status");

  const steps = [
    {
      title: "Shipment Accepted",
      date: "12:32pm, 7th Jun 2021",
    },
    { title: "Shipment Processing", date: "12:42pm, 7th Jun 2021" },
    {
      title: "Fames eget odio.",
      location: "4517 Washington Ave. Manchester, Kentucky 39495",
      date: "1:32pm, 7th Jun 2021",
    },
    {
      title: "Nec suspendisse id mi.",
      location: "4517 Washington Ave. Manchester, Kentucky 39495",
      date: "1:32pm, 7th Jun 2021",
    },
  ];

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
          className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
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

        <div className="">
          <div className="my-10 w-full">
            <CustomTabs
              tabs={["Status", "Map View"]}
              activeTab={tab}
              setActiveTab={setTab}
              icons={["tick", "map"]}
            />
            <hr className="solid-br" />
          </div>
          {tab === "Status" ? (
            <>
              <div className="solid-br p-6 rounded-lg">
                <CustomVerticalSteps currentStep={2} steps={steps} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </SlidingPane>
  );
};

export default TrackingDrawer;
