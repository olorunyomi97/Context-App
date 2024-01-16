import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

const LoanHistory = () => {
  const [openAside, SetOpenAside] = useState(false);

  const loan_history = [1, 2, 3];
  const loading = false;
  return (
    <div className="lg:flex">
      <Aside
        activeTab="invoice"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />

      <div className="">
        <TopBar title={"Loan History"} SetOpenAside={SetOpenAside} />

        {loading ? (
          <>
            <PageLoading title={"loan history"} />
          </>
        ) : (
          <>
            <div className="dashboard-content-scroll">
              <div className="lg:px-14 lg:pt-10 container mx-auto  w-full">
                {/* desktop view  */}
                <table className="desktop-only">
                  <thead>
                    <tr className="pb-5">
                      <th className="grey-text uppercase text-xs font-semibold text-left pl-3 pb-3">
                        Loan Number
                      </th>
                      <th className="grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
                        Date
                      </th>
                      <th className="grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
                        Amount
                      </th>
                      <th className="grey-text uppercase text-xs font-semibold text-left pr-5  pl-5 pb-3">
                        Provider
                      </th>
                      <th className="grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
                        Loan Term
                      </th>
                      <th className="grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
                        Extension request
                      </th>
                      <th className="grey-text uppercase text-xs font-semibold text-left pl-5 pb-3">
                        status
                      </th>
                      <th className="px-16"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {loan_history.length > 0 &&
                      loan_history.map((data: any, index: number) => {
                        return (
                          <tr
                            className="right-divider top-divider bottom-divider left-divider rounded w-full"
                            key={index}
                          >
                            <td className="py-5 pl-3">
                              <p className="black-text font-semibold text-sm">
                                #576900
                              </p>
                            </td>
                            <td className="py-5 pl-5">
                              <p className="black-text font-semibold text-sm">
                                12 July, 2022
                              </p>
                            </td>
                            <td className="py-5 pl-5">
                              <p className="black-text font-semibold text-sm">
                                N50,000.00
                              </p>
                            </td>
                            <td className="py-5 pl-5">
                              <p className="black-text font-semibold text-sm">
                                Extinversa
                              </p>
                            </td>
                            <td className="py-5 pl-5">
                              <p className="black-text font-semibold text-sm">
                                28 Days
                              </p>
                            </td>
                            <td className="py-5 pl-5">
                              <p className="black-text font-semibold text-sm">
                                N / A
                              </p>
                            </td>
                            <td className="py-5 px-5 pr-10">
                              <p className="bg-light-green green-text py-2 px-3 font-semibold text-xs text-center rounded-full capitalize">
                                Approved
                              </p>
                            </td>
                            <td>
                              <Link
                                to={`/loan-history/details/${data._id}`}
                                className="bg-green white-text text-sm py-3 px-4 w-full rounded mr-3"
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoanHistory;
