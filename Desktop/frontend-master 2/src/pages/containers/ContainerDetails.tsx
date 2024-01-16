import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//redux actions
import { getContainerById } from "store/actions";

//icons
import arrowL from "assets/icons/arrow-left2.svg";

//libraries
import { connect } from "react-redux";

//helpers
import { getStatusBg, getStausTextColor } from "helpers/statusHelper";

//components
import Layout from "components/layout/Layout";
import PageLoading from "components/partials/pageLoading";
import LoadingSpinner from "components/partials/LoadingSpinner";

const ContainerDetails = (props: any) => {
  const { getting_containers, container_data, error, getContainerById } = props;

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  const [loadingFrame, setLoadingFrame] = useState(true);

  useEffect(() => {
    // clearBookingErrors()
    id && getContainerById(id);
  }, []);

  console.log("vero>>>", container_data);
  console.log("loadeer>>>", getting_containers);
  console.log("idk>>>", id);

  return (
    <Layout>
      <div className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
        {getting_containers ? (
          <PageLoading title="tracking details" />
        ) : (
          <>
            <div className="pb-3 md:pb-6 md:border-solid md:border-b-[#F3F4F6] md:border-b-[1px] flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <div
                  className="grey-text flex items-center gap-x-1 mb-2 font-light cursor-pointer"
                  onClick={() => navigate("/container")}
                >
                  <span>
                    <img src={arrowL} alt=""></img>
                  </span>
                  <p className="text-sm grey-text">All Containers</p>
                </div>
                <div className="text-sm sm:text-xl md:text-2xl flex items-center">
                  <span className=" text-[#344336] mr-[6px]">Cont. Number</span>
                  <span className="grey-text-1 font-light uppercase">
                    {container_data?.container_number
                      ? `#${container_data?.container_number}`
                      : "N/A"}
                  </span>
                    <div className={`py-1 px-2 ml-1.5 rounded-full w-fit text-center ${getStatusBg(container_data?.container_status?.toLowerCase())}`}>
                      <p className={`text-xs capitalize text-center ${getStausTextColor(container_data?.container_status?.toLowerCase())}`}>
                        { container_data?.container_status === "file opening" ? <span>In Progress</span> : container_data?.container_status === "file closed" ? <span>Completed</span> : container_data?.container_status }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3" />
            {loadingFrame && (
              <div>
                <LoadingSpinner
                  height="12"
                  loadingText="Loading tracking info."
                />
              </div>
            )}
            <iframe
              title="Tracking"
              src={container_data?.inland_tracking_url}
              width="100%"
              height="700px"
              onLoad={() => setLoadingFrame(false)}
            ></iframe>
          </>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const { getting_containers, container_data, error } = state.shipment;
  return { getting_containers, container_data, error };
};

export default connect(mapStateToProps, { getContainerById })(ContainerDetails);
