import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

//components
import PrimaryButton from "components/buttons/PrimaryButton";
import { formatCurrency } from "helpers";

//icons

//redux
import { initializePayment } from "store/actions";

//helpers
import mixpanel from "helpers/mixpanel";

const PaymentMode = (props: any) => {
  const { isOpen, setIsOpen, invoice, initializePayment, initiating_payment } =
    props;

  const [modeOfPayment, setModeOfPayment] = useState("outright");
  const [amount, setAmount] = useState(0);

  let user = useSelector((state: any) => state.auth.user_data);
  let localStorageUser = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data")!)
    : null;

  user = user ? user : localStorageUser;

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    // @ts-ignore
    amount: parseInt(amount * 100),
    publicKey: "pk_test_7ef0929bad6cd1b77c44d66f876cc049e8be89d9",
  };

  useEffect(() => {
    if (modeOfPayment === "tranches") {
      setAmount(
        parseFloat(invoice?.invoice_amount) +
          parseFloat(invoice?.invoice_amount) * 0.05
      );
    } else {
      setAmount(parseFloat(invoice?.invoice_amount));
    }
  }, [modeOfPayment, invoice?.invoice_amount]);

  // const onSuccess = (reference) => {
  //   window.location.replace(`${window.location.origin}/invoices`);
  // };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
  };

  // const initializePayment = usePaystackPayment(config);

  const onSubmit = () => {
    const data = {
      invoice_id: invoice?._id,
      data: {
        transaction_channel: "paystack",
        is_tranche: modeOfPayment === "tranches" ? true : false,
        redirect_url: `${window.location.origin}/invoices/confirm-transaction/${invoice?._id}`,
      },
    };
    initializePayment(data);

    mixpanel.track("Pay Now", {
      email: user.email,
    });
  };

  return (
    <>
      <SlidingPane
        className="custom-slider"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen}
        hideHeader={true}
        width="756px"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsOpen(false);
        }}
      >
        <i
          className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></i>

        <div className="flex items-center my-10">
          <h3 className="text-xl black-text font-semibold">Payment Mode</h3>

          <p className="text-lg black-text font-semibold ml-auto">
            Invoice No: {invoice?.job_number}
          </p>
        </div>

        <div className="mt-10">
          <label className="text-sm black-text font-medium">
            Select mode of payment
          </label>
          <div className="">
            <select
              className="text-input text-sm black-text solid-br pr-4 pl-1 py-1.5 rounded mt-1"
              onChange={(e) => setModeOfPayment(e.target.value)}
            >
              <option value="outright">Outright Payment</option>
              <option value="tranches">Payment in 2 Tranches</option>
            </select>
          </div>
        </div>

        {modeOfPayment === "tranches" ? (
          <>
            <div className="bg-light-yellow p-3 mt-10 rounded">
              <p className="grey-text text-xs">
                Payment in tranches is a 80% percent commitment and 20 percent
                on shipping completion.
              </p>
              <p className="grey-text text-xs mt-2">
                Payment in tranches attract a 0.1% service charge upfront
              </p>
            </div>
          </>
        ) : (
          <> </>
        )}

        <div className="mt-10 bg-light-green text-center p-10">
          <p className="black-text text-sm">
            Shipping Fees:{" "}
            <span className="text-lg font-semibold">
              {modeOfPayment === "tranches"
                ? `${formatCurrency(
                    invoice?.invoice_amount_pending * 0.8,
                    invoice?.invoice_currency
                  )}`
                : `${formatCurrency(
                    invoice?.invoice_amount_pending,
                    invoice?.invoice_currency
                  )}`}
            </span>
          </p>
          {modeOfPayment === "tranches" ? (
            <p className="black-text text-sm mt-4">
              Tranches Service Charge:{" "}
              <span className="text-base font-semibold">
                {formatCurrency(
                  parseFloat(invoice?.invoice_amount_pending) * 0.01,
                  invoice?.invoice_currency
                )}{" "}
              </span>
            </p>
          ) : (
            <></>
          )}

          <div className="my-4">
            <p className="black-text text-sm">
              Total Amount:{" "}
              <span className="text-lg font-semibold">
                {modeOfPayment === "tranches"
                  ? `${formatCurrency(
                      invoice?.invoice_amount_pending * 0.8 +
                        parseFloat(invoice?.invoice_amount_pending) * 0.01,
                      invoice?.invoice_currency
                    )}`
                  : `${formatCurrency(
                      invoice?.invoice_amount_pending,
                      invoice?.invoice_currency
                    )}`}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex">
          <div className="w-2/5">
            {" "}
            {/* @ts-ignore */}
            <PrimaryButton
              title="Pay Now"
              // @ts-ignore
              onClick={() => onSubmit()}
              loading={initiating_payment}
              style={{
                fontSize: "18px",
              }}
            />
          </div>
        </div>
      </SlidingPane>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { initiating_payment, error } = state.invoice;
  return { initiating_payment, error };
};

export default connect(mapStateToProps, { initializePayment })(PaymentMode);
