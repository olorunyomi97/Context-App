import { useState, useEffect } from "react";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";
import CustomerDetails from "components/creditFacility/CustomerDetails";
import LoanApplicationForm from "components/creditFacility/LoanApplicationForm";

const LoanApplication = () => {
  const [openAside, SetOpenAside] = useState(false);
  const [step, setStep] = useState(1);

  const loading = false;

  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="invoice"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title="Loan Application" SetOpenAside={SetOpenAside} />

          {loading ? (
            <>
              <PageLoading title={"loan application"} />
            </>
          ) : (
            <div className="dashboard-content-scroll">
              <div className="px-7 pt-5 lg:px-14 lg:pt-10 container">
                <div className="lg:grid grid-cols-2">
                  <div className="">
                    <div className="flex mb-10">
                      <div className="">
                        <p className="text-lg black-text font-semibold">
                          {step === 1 ? "Customer Details" : "Loan Application"}
                        </p>
                        <p className="text-xs grey-text mt-2">
                          Fill in your information.{" "}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-sm grey-text">step {step} of 2 </p>
                      </div>
                    </div>

                    <div className="">
                      {step === 1 ? (
                        <>
                          <CustomerDetails nextStep={nextStep} />
                        </>
                      ) : (
                        <>
                          <LoanApplicationForm previousStep={previousStep} />{" "}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoanApplication;
