import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

//icons
import success from "assets/icons/success.svg";

//redux
import { confirmPayment } from "store/actions";

const ConfirmTransaction = (props: any) => {
  const [openAside, SetOpenAside] = useState(false);

  const { initiating_payment, payment_response, confirmPayment } = props;

  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);

  const trx_ref = urlParams.get("trxref");

  useEffect(() => {
    if (trx_ref) {
      const data = {
        transaction_reference: trx_ref,
      };

      confirmPayment(data);
    }
  }, []);

  // console.log(payment_response);

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

          {initiating_payment ? (
            <>
              <PageLoading title={"transaction status..."} />
            </>
          ) : (
            // payment_response?.invoice_status.toLowerCase() === "paid" ?
            <>
              <div className=" flex flex-col items-center justify-center h-4/6">
                <img src={success} alt="" width={125} className="mx-auto" />

                <div className="text-center">
                  <p className="text-2xl black-text font-semibold mb-3">
                    Successful
                  </p>
                  <p className="text-sm grey-text font-medium mb-5">
                    Your invoice payment was successful
                  </p>
                  <div className="flex">
                    <Link
                      to="/invoices"
                      className="px-4 py-2 bg-grey rounded mr-1 black-text text-xs font-semibold"
                    >
                      View invoices
                    </Link>
                    <Link
                      to="/shipments"
                      className="px-4 py-2 bg-green rounded ml-1 white-text text-xs font-semibold"
                    >
                      View shipments
                    </Link>
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

const mapStateToProps = (state: any) => {
  const { error, initiating_payment, payment_response } = state.invoice;
  return { error, initiating_payment, payment_response };
};

export default connect(mapStateToProps, { confirmPayment })(ConfirmTransaction);
