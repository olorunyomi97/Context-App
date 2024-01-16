import { useState } from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//icons
import transferIcon from "assets/icons/transfer.svg";
import cardIcon from "assets/icons/card.svg";
import PaymentMode from "components/invoice/PaymentMode";
import BankDetailsDrawer from "components/invoice/BankDetailsDrawer";

const PaymentDrawer = (props: any) => {
  const { isOpen, setIsOpen, invoice } = props;
  const [isPaymentModeOpen, setIsPaymentModeOpen] = useState(false);
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);

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
          <h3 className="text-xl black-text font-semibold">Payment Method</h3>

          <p className="text-lg black-text font-semibold ml-auto">
            Invoice No: {invoice?.job_number}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className=" flex flex-col  justify-center item-center rounded  active-br-hover"
            style={{
              borderWidth: 2,
              minHeight: 321,
              borderColor: "#e5e7eb",
            }}
            onClick={() => setIsBankDetailsOpen(true)}
          >
            <div className="bg-light-green rounded-full p-3 py-4 mx-auto">
              <img src={transferIcon} alt="" width={61} height={50} />
            </div>
            <div className="mt-3 mx-auto">
              <p className="black-text font-semibold">Bank transfer</p>
            </div>
          </div>
          <div
            className={`flex flex-col  justify-center item-center rounded ${
              invoice?.invoice_currency.toUpperCase() === "NGN"
                ? "active-br-hover"
                : ""
            }`}
            style={{ borderWidth: 2, minHeight: 321, borderColor: "#e5e7eb" }}
            onClick={() => {
              invoice?.invoice_currency.toUpperCase() === "NGN" ? (
                setIsPaymentModeOpen(true)
              ) : (
                <></>
              );
            }}
          >
            <div className="bg-grey rounded-full p-4  mx-auto ">
              <img src={cardIcon} alt="" width={40} height={40} />
            </div>
            <div className="mt-3 mx-auto">
              <p className="black-text font-semibold">Card payment</p>
            </div>
            {invoice?.invoice_currency.toUpperCase() !== "NGN" ? (
              <div className="mt-3 mx-auto">
                <p className="grey-text text-xs text-center ">
                  This payment method is only available <br /> for Naira
                  payments
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </SlidingPane>

      <PaymentMode
        isOpen={isPaymentModeOpen}
        setIsOpen={setIsPaymentModeOpen}
        invoice={invoice}
      />

      <BankDetailsDrawer
        isOpen={isBankDetailsOpen}
        setIsOpen={setIsBankDetailsOpen}
        invoice={invoice}
      />
    </>
  );
};

export default PaymentDrawer;
