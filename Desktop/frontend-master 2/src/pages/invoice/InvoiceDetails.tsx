import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomPDFRenderer from "components/pdf/CustomPDFRenderer";
import CustomDownloadButton from "components/pdf/CustomDownloadButton";
import PageLoading from "components/partials/pageLoading";

import PaymentDrawer from "components/invoice/PaymentDrawer";
import BankDetailsDrawer from "components/invoice/BankDetailsDrawer";
import ProofOfPaymentDrawer from "components/invoice/ProofOfPaymentDrawer";
// icons
import downloadIcon from "assets/icons/download.svg";

//redux
import { getInvoiceById } from "store/actions";

const InvoiceDetails = (props: any) => {
  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const rate_id = query.get("rate");

  const [isOpen, setIsOpen] = useState(false);
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
  const [isProofOpen, setIsProofOpen] = useState(false);
  const [openAside, SetOpenAside] = useState(false);
  const [openLoan, SetOpenLoan] = useState(false);

  const { loading, invoice_data, getInvoiceById } = props;

  useEffect(() => {
    getInvoiceById({ rate_id, invoice_id: params.id });
  }, []);

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="invoice"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Invoices"} SetOpenAside={SetOpenAside} />

          {loading ? (
            <>
              <PageLoading title={"invoice details"} />
            </>
          ) : openLoan ? (
            <>
              <div className=" px-7 pt-5 lg:px-14 lg:pt-10 container mx-auto  w-full">
                <div className="solid-br flex flex-col justify-center items-center py-32">
                  <p className="text-lg black-text font-semibold">
                    Is the desired loan amount greater than 5 million naira ?
                  </p>
                  <div className="flex my-5">
                    <div
                      className="solid-br py-2 px-4 rounded cursor-pointer ml-auto"
                      onClick={() => setIsOpen(true)}
                    >
                      <p className="text-sm black-text mr-2 px-7 font-semibold ">
                        Yes
                      </p>
                    </div>

                    <Link
                      to="/loan-providers/65983274392"
                      className="solid-br py-2 px-4 bg-green rounded ml-3  px-10 cursor-pointer"
                      onClick={() => SetOpenLoan(true)}
                    >
                      <p className="text-sm white-text mr-2 font-semibold">
                        No
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="dashboard-content-scroll">
                <div className=" px-7 pt-5 lg:px-14 lg:pt-10 container mx-auto  w-full">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {/* @to-do change to the proper id  */}
                      <Link to={`/shipment-invoice/${rate_id}`}>
                        <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                      </Link>
                      <p className="text-lg black-text font-semibold">
                        Invoice No: {params.id?.substring(5, 16)}
                      </p>
                    </div>

                    {invoice_data.single_invoice_details && (
                      <CustomDownloadButton
                        url={
                          invoice_data.single_invoice_details.invoice_location
                        }
                      />
                    )}
                  </div>

                  {invoice_data.single_invoice_details && (
                    <CustomPDFRenderer
                      url={invoice_data.single_invoice_details.invoice_location}
                    />
                  )}

                  <div className="flex my-5">
                    <div
                      className="solid-br py-2 px-4 rounded cursor-pointer ml-auto"
                      onClick={() => setIsOpen(true)}
                    >
                      <p className="text-sm black-text mr-2 font-semibold">
                        Proceed to payment
                      </p>
                    </div>

                    <div
                      className="solid-br py-2 px-4 bg-green rounded ml-3 cursor-pointer"
                      onClick={() => SetOpenLoan(true)}
                    >
                      <p className="text-sm white-text mr-2 font-semibold">
                        Apply for Loan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <PaymentDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsBankDetailsOpen={setIsBankDetailsOpen}
          />

          <BankDetailsDrawer
            isOpen={isBankDetailsOpen}
            setIsOpen={setIsBankDetailsOpen}
            setIsProofOpen={setIsProofOpen}
          />

          <ProofOfPaymentDrawer
            isOpen={isProofOpen}
            setIsOpen={setIsProofOpen}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, invoice_data } = state.invoice;
  return { error, loading, invoice_data };
};

export default connect(mapStateToProps, { getInvoiceById })(InvoiceDetails);
