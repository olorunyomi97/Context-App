import React from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//style
import "./index.css";

//icons
import { ReactComponent as ShipmentIcon } from "assets/icons/shipment.svg";
import { ReactComponent as ShipmentIconActive } from "assets/icons/shipment-active.svg";

import { ReactComponent as DashboardIcon } from "assets/icons/dashboard.svg";
import { ReactComponent as DashboardIconActive } from "assets/icons/dashboard-active.svg";

import { ReactComponent as DocumentIcon } from "assets/icons/document.svg";

import { ReactComponent as QuoteIcon } from "assets/icons/quote.svg";
import { ReactComponent as QuoteIconActive } from "assets/icons/quote-active.svg";

import { ReactComponent as InvoiceIcon } from "assets/icons/invoice.svg";
import { ReactComponent as InvoiceIconActive } from "assets/icons/invoice-active.svg";

import { ReactComponent as SettingIcon } from "assets/icons/setting.svg";

import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

const Aside = (props: any): JSX.Element => {
  const { activeTab, openAside, SetOpenAside } = props;

  return (
    <>
      {/* desktop aside  */}
      <div className="dashboard-aside flex flex-col right-divider desktop-only">
        <div className="px-5">
          <div className="py-8">
            <Link to="/">
              <img
                src="oneport-logo.png"
                className="w-18 h-10 image-logo desktop-only"
              />
            </Link>
          </div>

          <div className="pt-14">
            <Link to="/dashboard">
              <div className="flex items-center tab-item">
                {activeTab === "dashboard" ? (
                  <DashboardIconActive width="2rem" height="2rem" />
                ) : (
                  <DashboardIcon width="2.5rem" height="2.5rem" />
                )}

                <p
                  className={`${
                    activeTab === "dashboard" ? "ml-5 font-semibold" : "ml-3"
                  } text-sm black-text`}
                >
                  Dashboard
                </p>
              </div>
            </Link>

            <Link to="/shipments">
              <div className="flex items-center tab-item py-4">
                {activeTab === "shipment" ? (
                  <ShipmentIconActive width="2rem" height="2rem" />
                ) : (
                  <ShipmentIcon width="2.5rem" height="2.5rem" />
                )}

                <p
                  className={`${
                    activeTab === "shipment" ? "ml-5 font-semibold" : "ml-3"
                  } text-sm black-text`}
                >
                  Shipments
                </p>
              </div>
            </Link>

            <Link to="/documents">
              <div className="flex items-center tab-item">
                {activeTab === "document" ? (
                  <ShipmentIconActive width="2rem" height="2rem" />
                ) : (
                  <DocumentIcon width="2.5rem" height="2.5rem" />
                )}

                <p
                  className={`${
                    activeTab === "document" ? "ml-5 font-semibold" : "ml-3"
                  } text-sm black-text`}
                >
                  Documents
                </p>
              </div>
            </Link>

            <Link to="/quotes">
              <div className="flex items-center tab-item py-4">
                {activeTab === "quote" ? (
                  <QuoteIconActive width="2rem" height="2rem" />
                ) : (
                  <QuoteIcon width="1rem" height="2rem" className="ml-3" />
                )}

                <p
                  className={`${
                    activeTab === "quote" ? "ml-5 font-semibold" : "ml-6"
                  } text-sm black-text`}
                >
                  Quotes
                </p>
              </div>
            </Link>

            <Link to="/invoices">
              <div className="flex items-center tab-item ">
                {activeTab === "invoice" ? (
                  <InvoiceIconActive width="2rem" height="2rem" />
                ) : (
                  <InvoiceIcon width="1rem" height="2rem" className="ml-3" />
                )}

                <p
                  className={`${
                    activeTab === "invoice" ? "ml-5 font-semibold" : "ml-6"
                  } text-sm black-text`}
                >
                  Invoices
                </p>
              </div>
            </Link>

            <Link to="/settings">
              <div className="flex items-center tab-item py-4">
                {activeTab === "setting" ? (
                  <ShipmentIconActive width="2rem" height="2rem" />
                ) : (
                  <SettingIcon width="2.5rem" height="2.5rem" />
                )}

                <p
                  className={`${
                    activeTab === "setting" ? "ml-5 font-semibold" : "ml-3"
                  } text-sm black-text`}
                >
                  Settings
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className=" px-5 absolute bottom-0 w-3/12">
          <hr className="w-52" />
          <div className="flex items-center py-5">
            <LogoutIcon width="1.1rem" height="1.1rem" />

            <p className={` ml-3 text-sm black-text`}>Logout</p>
          </div>
        </div>
      </div>

      {/* mobile aside */}
      {openAside ? (
        <>
          <SlidingPane
            className="custom-slider"
            overlayClassName="some-custom-overlay-class"
            isOpen={openAside}
            from="left"
            hideHeader={true}
            width="330px"
            shouldCloseOnEsc={true}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              SetOpenAside(false);
            }}
          >
            <div className="">
              <div className="flex ">
                <i
                  className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer ml-auto"
                  onClick={() => SetOpenAside(false)}
                ></i>
              </div>

              <div className="px-2">
                <div className="pt-14">
                  <Link to="/dashboard">
                    <div className="flex items-center tab-item">
                      {activeTab === "dashboard" ? (
                        <DashboardIconActive width="2rem" height="2rem" />
                      ) : (
                        <DashboardIcon width="2.5rem" height="2.5rem" />
                      )}

                      <p
                        className={`${
                          activeTab === "dashboard"
                            ? "ml-5 font-semibold"
                            : "ml-3"
                        } text-sm black-text`}
                      >
                        Dashboard
                      </p>
                    </div>
                  </Link>

                  <Link to="/shipments">
                    <div className="flex items-center tab-item py-8">
                      {activeTab === "shipment" ? (
                        <ShipmentIconActive width="2rem" height="2rem" />
                      ) : (
                        <ShipmentIcon width="2.5rem" height="2.5rem" />
                      )}

                      <p
                        className={`${
                          activeTab === "shipment"
                            ? "ml-5 font-semibold"
                            : "ml-3"
                        } text-sm black-text`}
                      >
                        Shipments
                      </p>
                    </div>
                  </Link>

                  <Link to="/documents">
                    <div className="flex items-center tab-item">
                      {activeTab === "document" ? (
                        <ShipmentIconActive width="2rem" height="2rem" />
                      ) : (
                        <DocumentIcon width="2.5rem" height="2.5rem" />
                      )}

                      <p
                        className={`${
                          activeTab === "document"
                            ? "ml-5 font-semibold"
                            : "ml-3"
                        } text-sm black-text`}
                      >
                        Documents
                      </p>
                    </div>
                  </Link>

                  <Link to="/quotes">
                    <div className="flex items-center tab-item py-8">
                      {activeTab === "quote" ? (
                        <QuoteIconActive width="2rem" height="2rem" />
                      ) : (
                        <QuoteIcon
                          width="1rem"
                          height="2rem"
                          className="ml-3"
                        />
                      )}

                      <p
                        className={`${
                          activeTab === "quote" ? "ml-5 font-semibold" : "ml-6"
                        } text-sm black-text`}
                      >
                        Quotes
                      </p>
                    </div>
                  </Link>

                  <Link to="/invoices">
                    <div className="flex items-center tab-item ">
                      {activeTab === "invoice" ? (
                        <InvoiceIconActive width="2rem" height="2rem" />
                      ) : (
                        <InvoiceIcon
                          width="1rem"
                          height="2rem"
                          className="ml-3"
                        />
                      )}

                      <p
                        className={`${
                          activeTab === "invoice"
                            ? "ml-5 font-semibold"
                            : "ml-6"
                        } text-sm black-text`}
                      >
                        Invoices
                      </p>
                    </div>
                  </Link>

                  <Link to="/settings">
                    <div className="flex items-center tab-item py-8">
                      {activeTab === "setting" ? (
                        <ShipmentIconActive width="2rem" height="2rem" />
                      ) : (
                        <SettingIcon width="2.5rem" height="2.5rem" />
                      )}

                      <p
                        className={`${
                          activeTab === "setting"
                            ? "ml-5 font-semibold"
                            : "ml-3"
                        } text-sm black-text`}
                      >
                        Settings
                      </p>
                    </div>
                  </Link>

                  {/* <div className="flex items-center tab-item ml-3">
                    <LogoutIcon width="1.1rem" height="1.1rem" />

                    <p className={` ml-5 text-sm black-text`}>Logout</p>
                  </div> */}
                </div>

                <div className="absolute bottom-0 pl-5">
                  <hr className="w-52" />
                  <div className="flex items-center py-5">
                    <LogoutIcon width="1.1rem" height="1.1rem" />

                    <p className={` ml-3 text-sm black-text`}>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </SlidingPane>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default Aside;
