import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

function CreditFacilityDetail() {
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
          <TopBar
            title={"Oneport365 Loan Application"}
            SetOpenAside={SetOpenAside}
          />

          {loading ? (
            <>
              <PageLoading title={"credit facility summary"} />
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

                  {/* company details  */}
                  <div className="solid-br rounded-lg">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Company Details
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Registered Company Name
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          VAT Registration Number
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Company Registration Number
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Physical Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">City</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">State</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Telephone Number</p>
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
                          Tax Exemption Certificate
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Importers Code</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* credit application  */}
                  <div className="solid-br rounded-lg my-10">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Credit Application
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Co. Invoice Contact Name
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Invoice Contact Designation
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Email Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Co. Shipping Contact Names
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Shipping Contact Designation
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Email Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Bank</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Branch</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Branch Code</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Account Name</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Account Type</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Trade Reference 1</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Phone Number</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Trade Reference 2</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Phone Number</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* billing address  */}
                  <div className="solid-br rounded-lg">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Billing Address
                      </p>
                    </div>

                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Registered Company Name
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Postal Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">City</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">State</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Phone Number</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Physical Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* collection/pickup  */}
                  <div className="solid-br rounded-lg my-10">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Collection/Pick Up
                      </p>
                    </div>

                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Registered Company Name
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>

                      <div className="flex mb-3">
                        <p className="text-xs black-text">Physical Address</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">City</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">State</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Phone Number</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Timings for Pick-up and Delivery
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">
                          Please confirm if you work on Saturdays
                        </p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* products/services solicited */}
                  <div className="solid-br rounded-lg">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Products/Services Solicited
                      </p>
                    </div>

                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Ocean Freights</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* credit facility requested */}
                  <div className="solid-br rounded-lg my-10">
                    <div className="p-5 bottom-divider">
                      <p className="font-semibold black-text">
                        Credit Facility Requested
                      </p>
                    </div>

                    <div className="p-5">
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Value</p>
                        <p className="text-xs black-text font-medium ml-auto">
                          tannaye.test@gmail.com
                        </p>
                      </div>
                      <div className="flex mb-3">
                        <p className="text-xs black-text">Loan Tenure</p>
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
}

export default CreditFacilityDetail;
