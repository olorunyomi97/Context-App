import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";
import SingleLoanProvider from "components/creditFacility/SingleLoanProvider";
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";

const LoanProvider = () => {
  const [openAside, SetOpenAside] = useState(false);
  const [selectedLoanProvider, setSelectedLoanProvider] = useState("");
  const loanProviders = [1, 2, 3];

  const onSelectLoanProvider = (id: string) => {
    setSelectedLoanProvider(id);
  };

  const loading = false;

  const params = useParams();

  useEffect(() => {}, []);

  const onSubmit = () => {
    window.location.replace(
      `${window.location.origin}/loan-application/${params.id}`
    );
  };

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="invoice"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Loan Providers"} SetOpenAside={SetOpenAside} />

          {loading ? (
            <>
              <PageLoading title={"loan providers"} />
            </>
          ) : (
            <>
              <div className="dashboard-content-scroll">
                <div className="px-7 pt-5 lg:px-14 lg:pt-10 container mx-auto  w-full">
                  <div className="">
                    <p className="text-lg black-text font-semibold">
                      Loan providers
                    </p>
                    <p className="text-sm grey-text my-3">
                      select from the lists of providers listed below.
                    </p>
                  </div>
                  <div className="">
                    <p className="text-sm grey-text mb-10 text-right">
                      3 Providers available
                    </p>
                  </div>

                  {loanProviders.map((data: any, index: number) => {
                    return (
                      <>
                        <SingleLoanProvider
                          selectedLoanProvider={selectedLoanProvider}
                          onSelectLoanProvider={onSelectLoanProvider}
                          data={data}
                          id={index}
                        />
                      </>
                    );
                  })}

                  <div className="flex my-10">
                    <div className="ml-auto mr-3">
                      {/* @ts-ignore  */}
                      <OutlineButton
                        // loading={loading.requesting_follow_up}
                        // disabled={loading.requesting_follow_up || loading.accepting_quote}
                        title={"Cancel"}
                        // onClick={() => onContact()}
                        style={{ width: "10rem" }}
                      />
                    </div>

                    {/* @ts-ignore  */}
                    <PrimaryButton
                      // loading={loading.accepting_quote}
                      // disabled={loading.accepting_quote || loading.requesting_follow_up}
                      onClick={() => onSubmit()}
                      title="Proceed"
                      style={{ width: "10rem" }}
                    />
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

export default LoanProvider;
