import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProofOfPaymentDrawer from "components/invoice/ProofOfPaymentDrawer";

const BankDetailsDrawer = (props: any) => {
  const { isOpen, setIsOpen, invoice } = props;
  const [isProofOpen, setIsProofOpen] = useState(false);

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
          className="ion-ios-arrow-round-back py-1.5 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></i>

        <div className="flex  mt-10 mb-5">
          <div className="">
            <h3 className="text-xl black-text font-semibold">
              Bank Transfer Details
            </h3>
            <p className="text-sm grey-text">
              Use the details below to make a direct transfer.
            </p>
          </div>

          <p className="text-lg black-text font-semibold ml-auto">
            Invoice No: {invoice?.job_number}
          </p>
        </div>

        <div className="">
          <div className="solid-br flex rounded-t-lg p-5">
            <p className="black-text text-sm">Account Number</p>
            <p className="black-text text-sm ml-auto font-semibold">
              {invoice?.invoice_account_details[0]?.account_no}
            </p>
          </div>
          <div className="left-divider right-divider flex p-5">
            <p className="black-text text-sm">Account Name</p>
            <p className="black-text text-sm ml-auto font-semibold">
              {invoice?.invoice_account_details[0]?.account_name}
            </p>
          </div>
          <div className="solid-br flex rounded-b-lg p-5">
            <p className="black-text text-sm"> Bank Name</p>
            <p className="black-text text-sm ml-auto font-semibold">
              {invoice?.invoice_account_details[0]?.bank_name}
            </p>
          </div>
        </div>

        <div className=" solid-br p-5 rounded-lg my-7">
          <p className="black-text font-semibold">Payment Instructions</p>

          <p className="text-sm black-text mt-3">
            1. All payments should be made in full to the account details
            provided above, except otherwise agreed. <br />
            2. Confirm that your invoice sent to your mail correlates with the
            invoices details shown above. <br />
            3. Upload your proof of payment below.
            {/* Tristique quis viverra congue at id ac tortor ultrices. <br />
            Odio turpis ut tincidunt faucibus feugiat mattis. <br />
            Cursus eros in cras vitae nullam molestie. Arcu ac, posuere nulla
            lobortis euismod. <br />
            Erat tortor dolor tortor vitae vulputate. <br />
            Urna diam lacus pharetra elementum, tempus leo. <br />
            Faucibus in pulvinar sit ac consequat id ullamcorper non, fermentum. */}
          </p>
        </div>

        <div className="flex">
          <div
            className="solid-br py-2 px-4 bg-green ml-auto rounded cursor-pointer"
            onClick={() => setIsProofOpen(true)}
          >
            <p className="text-sm white-text mr-2 font-semibold">
              Proof of payment
            </p>
          </div>
        </div>
      </SlidingPane>

      <ProofOfPaymentDrawer
        isOpen={isProofOpen}
        setIsOpen={setIsProofOpen}
        invoice={invoice}
      />
    </>
  );
};

export default BankDetailsDrawer;
