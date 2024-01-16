import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomDnD from "components/customDnD/CustomDnD";
import DataSheetSuccessModal from "components/shipmentDataSheet/DataSheetSuccessModal";

const DocumentSubmission = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [NXPdoc, setNXPdoc] = useState("");
  const [NXPerror, setNXPerror] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { loading, previousStep, nextStep } = props;

  const onSubmit = () => {
    nextStep();
  };

  return (
    <>
      <div className="mb-10">
        <h3 className="text-xl font-semibold black-text">
          Document Submission
        </h3>
        <p className="grey-text text-xs mt-1">
          Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec est
          orci facilisi velit cursus quisque amet.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
        <div className="">
          <CustomInput
            control={control}
            name={"name"}
            id={"name"}
            label={"Name"}
            placeholder={"enter name"}
            isRequired={true}
            type={"text"}
            errors={errors}
            isDisabled={false}
            defaultValue={""}
            min={""}
            max={""}
            icon=""
          />
        </div>

        <div className="mb-3">
          <label className="text-xs font-medium black-text">
            Signature and Stamp
          </label>
          <div className="mt-1">
            <CustomDnD
              handleChange={setNXPdoc}
              file={NXPdoc}
              error={NXPerror}
              name={"NXP Form"}
              defaultValue={
                // rates_documents.length
                //   ? rates_documents[0].original_file_name
                //   :
                ""
              }
            />
          </div>
        </div>

        <div className="">
          <CustomInput
            control={control}
            name={"designation"}
            id={"designation"}
            label={"Designation"}
            placeholder={"Enter designation"}
            isRequired={true}
            type={"text"}
            errors={errors}
            isDisabled={false}
            defaultValue={""}
            min={""}
            max={""}
            icon=""
          />
        </div>

        <div className="">
          <CustomInput
            control={control}
            name={"date"}
            id={"date"}
            label={"Date"}
            placeholder={"dd/mm/yy"}
            isRequired={true}
            type={"date"}
            errors={errors}
            isDisabled={false}
            defaultValue={""}
            min={""}
            max={""}
            icon=""
          />
        </div>

        <div className="grid grid-cols-3 mt-10 items-center">
          <div className="">
            {/* @ts-ignore */}
            <SecondaryButton
              title="Back"
              icon="ion-ios-arrow-round-back"
              onClick={previousStep}
            />
          </div>
          <div className="mx-auto"></div>
          <div className="">
            {/* @ts-ignore */}
            <PrimaryButton title="Submit" loading={loading} />
          </div>
        </div>
      </form>

      <DataSheetSuccessModal modalIsOpen={openModal} closeModal={closeModal} />
    </>
  );
};

export default DocumentSubmission;
