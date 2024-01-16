import React from "react";
import CargoDetailsDrawer from "./CargoDetailsDrawer";

const ShipmentCargoDetails = (props: any) => {
  const { shipments, isOpen, setIsOpen } = props;

  return (
    <>
      {shipments.length ? (
        shipments.map((data: any) => {
          return (
            <>
              <div
                className="solid-br rounded-lg p-3 mb-3 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex items-center">
                  <p className="black-text text-sm font-semibold">
                    Container - {data}
                  </p>

                  <i className="ml-auto ion-ios-arrow-forward"></i>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <> </>
      )}

      <CargoDetailsDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ShipmentCargoDetails;
