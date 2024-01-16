import { useState } from "react";
// import BootstrapTable from "react-bootstrap-table-next";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import Layout from "components/layout/Layout";

//icons
import documentIcon from "assets/icons/document.svg";
import arrowUp from "assets/icons/arrow-up.svg";
import movement from "assets/icons/movement.svg";
import ShipmentDetailsDrawer from "components/shipment/ShipmentDetailsDrawer";

const Document = () => {
  const [tab, setTab] = useState("All Shipments");
  const [documents, setDocuments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openAside, SetOpenAside] = useState(false);

  return (
    <>
      {/* <div className="flex"> */}
      {/* <Aside
          activeTab="document"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        /> */}

      <Layout>
        {/* <TopBar title={"Documents"} SetOpenAside={SetOpenAside} /> */}

        <div className="lg:px-14 md:pt-6 lg:pt-10 container mx-auto w-full">
          {documents.length ? (
            <>
              <div className="mt-4">
                {/* desktop view  */}
                <table className="desktop-only">
                  <tr className="pb-5">
                    <th className="grey-text uppercase text-xs font-semibold text-left pl-3 pb-3">
                      shipment type
                    </th>
                    <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">
                      origin
                    </th>
                    <th></th>
                    <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">
                      destination
                    </th>
                    <th className="grey-text uppercase text-xs font-semibold text-left pb-3">
                      date of issue
                    </th>
                    <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">
                      shipping id
                    </th>
                    <th></th>
                  </tr>
                  <tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
                    <td className="py-5 pl-3">
                      <div className="flex items-center">
                        <img
                          src={arrowUp}
                          alt=""
                          width={40}
                          height={40}
                          className="bg-light-green p-2 rounded-full"
                        />
                        <p className="ml-2 black-text font-semibold text-sm">
                          Export
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="mx-10">
                        <p className="black-text font-semibold text-sm">
                          Apapa
                        </p>
                        <p className="grey-text text-xs">lagos, Nigeria</p>
                      </div>
                    </td>

                    <td>
                      <img
                        src={movement}
                        alt=""
                        width={101}
                        height={12}
                        className=""
                      />
                    </td>
                    <td>
                      <div className="mx-10">
                        <p className="black-text font-semibold text-sm">
                          Arlington
                        </p>
                        <p className="grey-text text-xs">va, USA</p>
                      </div>
                    </td>
                    <td>
                      <p className="black-text font-semibold text-sm">
                        {" "}
                        Apr 02, 2022
                      </p>
                    </td>
                    <td>
                      <p className="mx-10 black-text font-semibold text-sm">
                        588393926
                      </p>
                    </td>
                    <td>
                      <Link
                        to="#"
                        className="bg-green white-text text-sm py-3 px-4 w-full rounded mr-3"
                        onClick={() => setIsOpen(true)}
                      >
                        Add Document
                      </Link>
                    </td>
                  </tr>
                  <tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
                    <td className="py-5 pl-3">
                      <div className="flex items-center">
                        <img
                          src={arrowUp}
                          alt=""
                          width={40}
                          height={40}
                          className="bg-light-green p-2 rounded-full"
                        />
                        <p className="ml-2 black-text font-semibold text-sm">
                          Export
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="mx-10">
                        <p className="black-text font-semibold text-sm">
                          Apapa
                        </p>
                        <p className="grey-text text-xs">lagos, Nigeria</p>
                      </div>
                    </td>

                    <td>
                      <img
                        src={movement}
                        alt=""
                        width={101}
                        height={12}
                        className=""
                      />
                    </td>
                    <td>
                      <div className="mx-10">
                        <p className="black-text font-semibold text-sm">
                          Arlington
                        </p>
                        <p className="grey-text text-xs">va, USA</p>
                      </div>
                    </td>
                    <td>
                      <p className="black-text font-semibold text-sm">
                        {" "}
                        Apr 02, 2022
                      </p>
                    </td>
                    <td>
                      <p className="mx-10 black-text font-semibold text-sm">
                        588393926
                      </p>
                    </td>
                    <td>
                      <Link
                        to="#"
                        className="bg-green white-text text-sm py-3 px-4 w-full rounded mr-3"
                        onClick={() => setIsOpen(true)}
                      >
                        Add Document
                      </Link>
                    </td>
                  </tr>
                </table>

                {/* mobile view  */}
                <div className="bg-grey py-2 mobile-only">
                  {documents.map((data) => {
                    return (
                      <div className="bg-white mb-3">
                        <div className="flex items-center py-3 px-7 bottom-divider">
                          <img
                            src={arrowUp}
                            alt=""
                            width={35}
                            height={35}
                            className="bg-light-green p-2 rounded-full"
                          />
                          <p className="ml-2 black-text font-semibold text-sm">
                            Export
                          </p>

                          <p className="ml-auto black-text font-semibold text-sm">
                            ID: 588393926
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8 py-3 px-7 bottom-divider items-center">
                          <div className="">
                            <p className="black-text font-semibold text-sm">
                              Apapa
                            </p>
                            <p className="grey-text text-xs">lagos, Nigeria</p>
                          </div>

                          <div className="px-5">
                            <img
                              src={movement}
                              alt=""
                              width={80}
                              height={12}
                              className=""
                            />
                          </div>

                          <div className="text-right">
                            <p className="black-text font-semibold  text-sm">
                              Arlington
                            </p>
                            <p className="grey-text text-xs">va, USA</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
                          <div className="">
                            <p className="black-text font-semibold text-sm">
                              Apr 02, 2022
                            </p>
                          </div>
                          <div className=""></div>
                          {/* <div className=""> */}

                          <Link
                            to="#"
                            className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
                            onClick={() => setIsOpen(true)}
                          >
                            Add Document
                          </Link>
                          {/* </div> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <ShipmentDetailsDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
          ) : (
            <>
              <div
                className="flex flex-col item-center justify-center solid-br rounded"
                style={{ minHeight: 500 }}
              >
                <img
                  src={documentIcon}
                  alt=""
                  width={113}
                  height={113}
                  className="mx-auto mt-52"
                />

                <div className="mx-auto my-2">
                  <p className="grey-text my-3">
                    {/* You have no recorded documents yet */}
                    Documents are coming soon...
                  </p>
                  <Link to="/new-shipment">
                    <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-52">
                      Start New Shipment
                    </p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
      {/* </div> */}
    </>
  );
};

export default Document;
