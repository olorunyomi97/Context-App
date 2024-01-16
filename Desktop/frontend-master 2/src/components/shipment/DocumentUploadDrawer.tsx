import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//components
import CustomDnD from "components/customDnD/CustomDnD";
import CustomSelect from "components/selectInputs/CustomSelect";

//icons
import PrimaryButton from "components/buttons/PrimaryButton";

const DocumentUploadDrawer = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { isOpen, setIsOpen } = props;
  const [paymentFile, setPaymentFile] = useState("");
  const error = "";

  const exportSelectOptions = [
    { label: "NXP form", value: "NXP" },
    { label: "PFI form", value: "PFI" },
  ];

  const onSubmit = () => {};

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

        <div className="flex items-center mt-10 mb-5">
          <div className="">
            <h3 className="text-xl black-text font-semibold">
              Documents Upload
            </h3>
            <p className="text-sm grey-text">
              Rhoncus dui convallis lorem egestas molestie vitae nibh.
            </p>
          </div>
        </div>

        <div className="mt-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <CustomSelect
                control={control}
                name={"document_type"}
                id={"document_type"}
                label={"Select Document type to upload"}
                placeholder={"Select document type"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                options={exportSelectOptions}
                icon=""
              />
            </div>

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
                />
              </div>
            </div>
          </form>
        </div>
      </SlidingPane>
    </>
  );
};

export default DocumentUploadDrawer;
