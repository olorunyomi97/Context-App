import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

const LoanHistoryDetail = () => {
  const params = useParams();

  const [openAside, SetOpenAside] = useState(false);

  useEffect(() => {}, []);

  const loading = false;

  return (
    <>
      <div className="lg:flex">
        <Aside
          activeTab="invoice"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Loan Application"} SetOpenAside={SetOpenAside} />

          {loading ? (
            <>
              <PageLoading title={"loan application summary"} />
            </>
          ) : (
            <>
              <div className="dashboard-content-scroll">
                <div className="px-7 lg:px-14 lg:pt-10 container lg:w-7/12">
                  <div className="md:flex items-center mb-10">
                    <div className="flex items-center">
                      <Link to={`/quote-summary/${params.id}`}>
                        <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                      </Link>
                      <p className="text-lg black-text font-semibold">
                        Shipment ID:{" "}
                        {params.id ? params.id.substring(0, 9) : ""}
                      </p>
                    </div>
                    <div className=" ml-auto flex items-center">
                      <p className="text-sm grey-text mr-2">STATUS</p>
                      <p className="bg-light-green green-text rounded-full text-xs font-semibold py-2 px-4 ">
                        Approved
                      </p>
                    </div>
                  </div>

                  {/* customer details  */}
                  <div className="solid-br rounded-lg">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Customer Details
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Email</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Company Structure</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Company Structure</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Business Name</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Business Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          12, Balogun street, Lagos.
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">RC Number</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">TIN</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>

                      {/* director 1  */}
                      <p className="text-sm font-semibold mt-5 mb-3">
                        Director 1
                      </p>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Full Name</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Email</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">BVN</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Date of Birth</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Means Of ID Number</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          LLC
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">CAC Certificate</p>
                        <p className="text-xs green-text font-medium ml-auto">
                          View
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">CAC</p>
                        <p className="text-xs green-text font-medium ml-auto">
                          View
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* loan application  */}
                  <div className="solid-br rounded-lg my-10">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Loan Application
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Product Service Type
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Cargo Destination</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Loan Amount</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Monthly Business Turnover
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Business Sector</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Active Period</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Nature of Business</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Product of Required Service
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Invoice Document</p>
                        <p className="text-xs green-text font-medium ml-auto">
                          View
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Invoice Date</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Account Reference</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Application ID</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Invoice Value</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoanHistoryDetail;
