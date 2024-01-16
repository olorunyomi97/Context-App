import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";

//components
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";

const ServiceAcceptance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [attestation, setAttestation] = useState(true);

  const fetching_data = false;

  const onSubmit = (data: any) => {};

  return (
    <>
      {fetching_data ? (
        <>
          {" "}
          <PageLoading />{" "}
        </>
      ) : (
        <>
          {" "}
          <div className="mb-10">
            <h3 className="text-xl font-semibold black-text">
              Billing Address
            </h3>
            <p className="grey-text text-xs mt-1">
              Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec
              est orci facilisi velit cursus quisque amet.
            </p>
          </div>
          <div className="lg:w-7/12">
            <CustomCheckBox
              name="service_acceptance"
              id="service_acceptance"
              label="Service Acceptance"
              isRequired={true}
              isDisabled={false}
              onChange={(e: boolean) => setAttestation(e)}
              defaultChecked={attestation}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ServiceAcceptance;
