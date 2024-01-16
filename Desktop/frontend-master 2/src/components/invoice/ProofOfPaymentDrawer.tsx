import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useParams, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";

//components
import CustomDnD from "components/customDnD/CustomDnD";

//icons
import PrimaryButton from "components/buttons/PrimaryButton";

//redux
import { uploadProofOfPayment } from "store/actions";

//helpers
import mixpanel from "helpers/mixpanel";

const ProofOfPaymentDrawer = (props: any) => {
  const { isOpen, setIsOpen, invoice } = props;
  const [paymentFile, setPaymentFile] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const location = useLocation();

  const { uploading_proof, uploadProofOfPayment } = props;

  let user = useSelector((state: any) => state.auth.user_data);
  let localStorageUser = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data")!)
    : null;

  user = user ? user : localStorageUser;

  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    if (paymentFile) {
      setError("");

      const formData = new FormData();
      formData.append("proof_of_payment", paymentFile);
      formData.append("quote_id", invoice?._id);

      const data = {
        invoice_id: params.id,
        data: formData,
      };

      uploadProofOfPayment(data, onCloseDrawer);

      mixpanel.track("Pay Now", {
        email: user.email,
      });
    } else {
      setError("please upload proof of payment");
    }
  };

  return (
    <>
      <SlidingPane
        className="custom-slider"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen}
        hideHeader={true}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsOpen(false);
        }}
      >
        <i
          className="ion-ios-arrow-round-back py-1.5 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></i>

        <div className="flex items-center mt-10 mb-5">
          <div className="">
            <h3 className="text-lg lg:text-xl black-text font-semibold">
              Proof of payment
            </h3>
            <p className="text-xs lg:text-sm grey-text desktop-only">
              Please upload a proof of payment.
            </p>
          </div>

          <p className="text-sm lg:text-lg black-text font-semibold ml-auto">
            Invoice No: {invoice?.job_number}
          </p>
        </div>

        <div className="">
          <CustomDnD
            handleChange={setPaymentFile}
            file={paymentFile}
            error={error}
            name={"Proof of Payment"}
            pdfOnly={false}
          />

          <div className="flex">
            <div className="mt-5 ml-auto">
              {/* @ts-ignore  */}
              <PrimaryButton
                title="Upload"
                style={{ paddingRight: 25, paddingLeft: 25 }}
                loading={uploading_proof}
                disabled={uploading_proof}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </SlidingPane>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { uploading_proof } = state.invoice;

  return { uploading_proof };
};

export default connect(mapStateToProps, { uploadProofOfPayment })(
  ProofOfPaymentDrawer
);
