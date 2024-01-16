import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomStepAside from "components/customSteps/CustomStepAside";
import CompanyDetails from "components/creditFacility/CompanyDetails";
import CreditApplication from "components/creditFacility/CreditApplication";
import BillingAddress from "components/creditFacility/BillingAddress";
import Connection from "components/creditFacility/Connection";
import ProductsSolicited from "components/creditFacility/ProductsSolicited";
import CreditFacilityRequested from "components/creditFacility/CreditFacilityRequested";
import ServiceAcceptance from "components/creditFacility/ServiceAcceptance";

function CreditFacility() {
  const [openAside, SetOpenAside] = useState(false);
  const [step, setStep] = useState<number>(4);
  const [items, setItems] = useState<object[]>([
    {
      name: "Company Details",
      id: "company",
      submitted: false,
    },
    {
      name: "Credit Application",
      id: "credit_application",
      submitted: false,
    },
    {
      name: "Billing Address",
      id: "billing_address",
      submitted: false,
    },
    {
      name: "Collection/Pickup",
      id: "collection",
      submitted: false,
    },
    {
      name: "Products Solicited",
      id: "products_solicited",
      submitted: false,
    },
    {
      name: "Credit Facility Requested",
      id: "credit_facility_requested",
      submitted: false,
    },
    {
      name: "Service Acceptance",
      id: "company",
      submitted: false,
    },
  ]);
  return (
    <>
      <div className="lg:flex">
        <Aside
          activeTab="quote"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar
            title={"Oneport365 Credit Facility"}
            SetOpenAside={SetOpenAside}
          />

          <div className="container flex">
            <div className="lg:w-1/4">
              <CustomStepAside items={items} step={step} setStep={setStep} />
            </div>

            <div className="lg:w-3/4 dashboard-content-scroll">
              <div className="lg:px-14 px-5 pt-5 lg:pt-16">
                {step === 0 ? (
                  <>
                    <CompanyDetails />
                  </>
                ) : step === 1 ? (
                  <>
                    <CreditApplication />
                  </>
                ) : step === 2 ? (
                  <>
                    <BillingAddress />
                  </>
                ) : step === 3 ? (
                  <>
                    <Connection />
                  </>
                ) : step === 4 ? (
                  <>
                    <ProductsSolicited />
                  </>
                ) : step === 5 ? (
                  <>
                    <CreditFacilityRequested />
                  </>
                ) : step === 6 ? (
                  <>
                    <ServiceAcceptance />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditFacility;
