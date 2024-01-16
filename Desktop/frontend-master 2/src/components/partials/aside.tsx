import React from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { connect } from "react-redux";

//style
import "./index.css";

//icons
import { ReactComponent as ShipmentIcon } from "assets/icons/shipment.svg";
import { ReactComponent as ShipmentIconActive } from "assets/icons/shipment-active.svg";

import { ReactComponent as DashboardIcon } from "assets/icons/dashboard.svg";
import { ReactComponent as DashboardIconActive } from "assets/icons/dashboard-active.svg";

import { ReactComponent as DocumentIcon } from "assets/icons/document.svg";
import { ReactComponent as DocumentIconActive } from "assets/icons/document-active.svg";

import { ReactComponent as QuoteIcon } from "assets/icons/quote.svg";
import { ReactComponent as QuoteIconActive } from "assets/icons/quote-active.svg";

import { ReactComponent as InvoiceIcon } from "assets/icons/invoice.svg";
import { ReactComponent as InvoiceIconActive } from "assets/icons/invoice-active.svg";

import { ReactComponent as SettingIcon } from "assets/icons/setting.svg";
import { ReactComponent as SettingIconActive } from "assets/icons/setting-active.svg";

import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

import onePortLogo from "assets/icons/oneport-logo.png";

//redux
import { logoutUser } from "store/actions";

const Aside = (props: any): JSX.Element => {
  const { activeTab, openAside, SetOpenAside, logoutUser } = props;

  const logout = () => {
    logoutUser();
    window.location.reload();
  };

  return (
    <>
      {/* desktop aside  */}
      <div className="dashboard-aside flex flex-col desktop-only shadow-lg">
        <div className="px-5">
          <div className="py-8">
            <Link to="/">
              <img
                src={onePortLogo}
                className="w-28 h-10 image-logo desktop-only"
                alt="oneport logo"
              />
            </Link>
          </div>

          <div className="pt-3">
            <Link to="/dashboard">
              <div className="flex items-center tab-item py-2.5">
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
            {/* <Link to="/quotes">
              <div className="flex items-center tab-item py-2.5">
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
            </Link> */}

            <Link to="/shipments">
              <div className="flex items-center tab-item py-2.5">
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
              <div className="flex items-center tab-item py-2.5">
                {activeTab === "document" ? (
                  <DocumentIconActive width="2rem" height="2rem" />
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

            {/* <Link to="/recently-searched-rates">
              <div className="flex items-center tab-item py-2.5">
                {activeTab === "rate" ? (
                  <DocumentIconActive width="2rem" height="2rem" />
                ) : (
                  <DocumentIcon width="2.5rem" height="2.5rem" />
                )}

                <p
                  className={`${
                    activeTab === "rate" ? "ml-5 font-semibold" : "ml-3"
                  } text-sm black-text`}
                >
                  Rates
                </p>
              </div>
            </Link> */}

            <Link to="/invoices">
              <div className="flex items-center tab-item py-2.5">
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
              <div className="flex items-center tab-item py-2.5">
                {activeTab === "setting" ? (
                  <SettingIconActive width="2rem" height="2rem" />
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

        <div className=" px-5 absolute bottom-0 w-1/12">
          <hr className="w-44 2xl:w-56" />
          <div
            className="flex items-center py-5 cursor-pointer"
            onClick={() => logout()}
          >
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
            width="70%"
            shouldCloseOnEsc={true}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              SetOpenAside(false);
            }}
          >
            <div className="">
              <div className="flex justify-between">
                <div className="">
                  <Link to="/">
                    <img
                      src={onePortLogo}
                      className="w-28 h-10 image-logo"
                      alt="oneport logo"
                    />
                  </Link>
                </div>
                <i
                  className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
                  onClick={() => SetOpenAside(false)}
                ></i>
              </div>

              <div className="px-2">
                <div className="pt-10">
                  <Link to="/dashboard">
                    <div className="flex items-center tab-item py-4">
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
                  {/* <Link to="/quotes">
                    <div className="flex items-center tab-item py-4">
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
                  </Link> */}
                  <Link to="/shipments">
                    <div className="flex items-center tab-item py-4">
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
                    <div className="flex items-center tab-item py-4">
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
                  {/* 
                  <Link to="/rates">
                    <div className="flex items-center tab-item py-4">
                      {activeTab === "rate" ? (
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
                          activeTab === "rate" ? "ml-5 font-semibold" : "ml-6"
                        } text-sm black-text`}
                      >
                        Rates
                      </p>
                    </div>
                  </Link> */}
                  <Link to="/invoices">
                    <div className="flex items-center tab-item py-4">
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
                    <div className="flex items-center tab-item py-4">
                      {activeTab === "setting" ? (
                        <SettingIconActive width="2rem" height="2rem" />
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
                  <div
                    className="flex items-center py-5 cursor-pointer"
                    onClick={() => logout()}
                  >
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

export default connect(null, { logoutUser })(Aside);
