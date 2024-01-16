import { Link, useParams } from "react-router-dom";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";

const RateShipmentDetails = (props: any) => {
  const { shipment } = props;

  const params = useParams();

  return (
    <>
      {Object.entries(shipment).length ? (
        <>
          <div className="bg-green flex py-3 px-5 items-center rounded-t-lg">
            <img
              src={shipment.shipping_type === "export" ? arrowUp : arrowDown}
              alt=""
              width={32}
              height={32}
              className="bg-light-green p-2 rounded-full mr-2"
            />
            <p className="white-text ml-2 capitalize">
              {" "}
              {shipment.shipping_type}
            </p>

            {/* <p className="text-white ml-auto">
              Shipping ID: {shipment._id.substring(0, 9)}
            </p> */}
          </div>
          <div className="solid-br p-3 lg:flex  gap-5 rounded-b-lg items-center">
            <div className="bg-light-green py-3 px-3 flex items-center justify-center rounded active-br-light lg:w-2/4">
              <div className="">
                <p className="black-text text-base lg:text-xl font-bold">
                  {shipment.origin_port_code}
                </p>
                <p className="black-text text-xs lg:text-sm ">
                  {shipment.origin_port_city}, {shipment.origin_port_country}
                </p>
              </div>

              <div className="">
                <img
                  src={movement}
                  alt=""
                  width={70}
                  height={12}
                  className="mx-3 "
                />
              </div>

              <div className="ml-3">
                <p className="black-text text-base lg:text-lg font-bold ">
                  {shipment.destination_port_code}
                </p>
                <p className="black-text text-xs lg:text-sm ">
                  {shipment.destination_port_city},{" "}
                  {shipment.destination_port_country}
                </p>
              </div>
            </div>

            <div className="lg:w-3/5 flex mt-4 lg:mt-0">
              <div className="lg:w-2/5 right-divider pr-2">
                <div className="">
                  <p className="black-text text-sm font-semibold">
                    Container details
                  </p>
                  <p className="black-text text-xs flex">
                    {shipment.container_details.length
                      ? shipment.container_details.map(
                          (details: any, index: number) => {
                            return index >= 2 ? (
                              <div key={index}>...</div>
                            ) : (
                              <div key={index}>
                                {details.container_count} x{" "}
                                {details.container_size} (
                                {details.container_type})
                                {shipment.container_details.length === index + 1
                                  ? ""
                                  : ", "}
                                {/* {details.container_weight} TON,{" "} */}
                              </div>
                            );
                          }
                        )
                      : null}
                  </p>
                </div>
              </div>

              <div className="lg:w-2/5 mx-3">
                <div className="">
                  <p className="black-text text-sm font-semibold">
                    Additional Services{" "}
                  </p>
                  <p className="black-text text-xs  ">
                    {shipment.insurance ? "insurance" : "N/A"}{" "}
                  </p>
                </div>
              </div>

              <div className="">
                {/* <div className="">
                <p className="black-text text-sm "> Goods Type </p>
                <p className="black-text text-lg lg:text-xl font-bold">
                  {shipment.goods_type}
                </p>
              </div> */}

                <Link
                  to={`/new-shipment/${params.id}`}
                  className="bg-light-green py-2 px-4 rounded cursor-pointer"
                >
                  <i className="fa fa-pencil text-lg black-icon"></i>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RateShipmentDetails;
