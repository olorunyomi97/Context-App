import moment from "moment";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";

const ShipmentDetailsCard = (props: any) => {
  const { shipment } = props;

  return (
    <>
      {Object.entries(shipment).length ? (
        <>
          <div className="grid grid-cols-3 items-center p-5 bg-green rounded-t-lg">
            <div className="flex items-center">
              <img
                src={shipment.shipping_type === "export" ? arrowUp : arrowDown}
                alt=""
                width={40}
                height={40}
                className="bg-light-green p-2 rounded-full"
              />

              <p className="white-text text-sm ml-2 capitalize">
                {" "}
                {shipment.shipping_type}
              </p>
            </div>
            <div className="text-center">
              <p className="white-text text-sm">
                {moment(shipment.createdAt).format("LL")}
              </p>
            </div>
            <div className="text-right">
              <p className="white-text text-xs opacity-75">Shipment ID</p>
              <p className="white-text text-sm">
                {shipment.job_number.substring(0, 9)}
              </p>
            </div>
          </div>
          <div className="bg-spiral"></div>
          <div className="bg-light-green  grid grid-cols-3 gap-4 rounded-b-lg p-3 lg:p-7 items-center ">
            <div className="">
              <p className="black-text text-xs mb-5 font-semibold uppercase">
                Origin
              </p>
              <p className="black-text text-xl lg:text-2xl font-bold">
                {shipment.shipping_type === "export"
                  ? shipment.origin_port_province
                  : shipment.origin_port}
              </p>
              <p className="black-text text-xs lg:text-sm mb-5 font-semibold">
                {shipment.pickup_location
                  ? shipment.pickup_location
                  : shipment.origin_port_country}
              </p>
            </div>
            <div className="">
              <img src={movement} alt="" width={150} height={12} className="" />
            </div>
            <div className="">
              <p className="black-text text-xs mb-5 font-semibold uppercase">
                destination
              </p>
              <p className="black-text text-xl lg:text-2xl font-bold ">
                {shipment.shipping_type === "export"
                  ? shipment.destination_port_province
                  : shipment.delivery_location}
              </p>
              <p className="black-text text-xs lg:text-sm mb-5 font-semibold">
                {shipment.destination_port_country}
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShipmentDetailsCard;
