import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";

//components
import CustomRadio from "components/selectInputs/CustomRadio";
import PrimaryButton from "components/buttons/PrimaryButton";
import PageLoading from "components/partials/pageLoading";
import SecondaryButton from "components/buttons/SecondaryButton";

const ProductsSolicited = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [airFreight, setAirFreight] = useState(true);
  const [oceanFreight, setOceanFreight] = useState(true);
  const [clearance, setClearance] = useState(true);
  const [warehousing, setWarehousing] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="mb-10">
            <h3 className="text-xl font-semibold black-text">
              Products/Services Solicited
            </h3>
            <p className="grey-text text-xs mt-1">
              Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec
              est orci facilisi velit cursus quisque amet.
            </p>
          </div>

          <div className="mb-24 lg:w-7/12">
            <div className=" mb-3">
              <p className="text-xs black-text font-medium mb-2">
                Air Freight Export
                {/* (do if  statement here for import and export) */}
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={airFreight}
                    label={"Yes"}
                    onClick={() => setAirFreight(!airFreight)}
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!airFreight}
                    label={"No"}
                    onClick={() => setAirFreight(!airFreight)}
                  />
                </div>
              </div>
            </div>

            <div className=" mb-3">
              <p className="text-xs black-text font-medium mb-2">
                Ocean Freight Export
                {/* (do if  statement here for import and export) */}
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={oceanFreight}
                    label={"Yes"}
                    onClick={() => setOceanFreight(!oceanFreight)}
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!oceanFreight}
                    label={"No"}
                    onClick={() => setOceanFreight(!oceanFreight)}
                  />
                </div>
              </div>
            </div>

            <div className=" mb-3">
              <p className="text-xs black-text font-medium mb-2">
                Clearance & Delivery
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={clearance}
                    label={"Yes"}
                    onClick={() => setClearance(!clearance)}
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!clearance}
                    label={"No"}
                    onClick={() => setClearance(!clearance)}
                  />
                </div>
              </div>
            </div>

            <div className=" mb-3">
              <p className="text-xs black-text font-medium mb-2">Warehousing</p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={warehousing}
                    label={"Yes"}
                    onClick={() => setWarehousing(!warehousing)}
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!warehousing}
                    label={"No"}
                    onClick={() => setWarehousing(!warehousing)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-10 items-center">
              <div className="">
                {/* @ts-ignore */}
                <SecondaryButton
                  title="Back"
                  icon="ion-ios-arrow-round-back"
                  //   onClick={previousStep}
                />
              </div>
              <div className="mx-auto"></div>
              <div className="">
                {/* @ts-ignore */}
                <PrimaryButton
                  title="Save & Continue"
                  //   loading={completing_datasheet}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsSolicited;
