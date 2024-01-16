import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ComponentBox from "./SingleInsurance";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

//components
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import CustomDefaultSelect from "components/selectInputs/CustomDefaultSelect";

//icons
import disclaimer from "assets/icons/disclaimer.svg";

//redux
import { getInsurance } from "store/actions";

function ExportOceanInsurance(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [clauseType, setClauseType] = useState("A");

  const location = useLocation();
  const shipment_id = location.state.id;

  const { getInsurance, loading, insurance } = props;

  useEffect(() => {
    getInsuranceByClauseType(clauseType);
  }, []);

  const getInsuranceByClauseType = (clause_type: string) => {
    getInsurance({
      shipment_id,
      query: `clause_type=${clause_type}&insurer_country=NG`,
    });
  };

  const {
    oceanInsurance,
    setOceanInsurance,
    selectedInsurance,
    setSelectedInsurance,
  } = props;

  return (
    <div className="lg:flex">
      <div>
        <div className="mt-8 mx-3 mb-6 ">
          <div className="mb-8">
            <div className="flex items-center gap-x-3 mb-2">
              <CustomCheckBox
                name=""
                id=""
                label="Ocean Insurance"
                isRequired={true}
                defaultChecked={oceanInsurance}
                isDisabled={false}
                onChange={(e: boolean) => setOceanInsurance(!oceanInsurance)}
              />
              <p className="text-xs text-[#1C60FF] px-2 py-1 rounded-3xl bg-[#d0e4ff66]">
                Recommended
              </p>
            </div>
            <p className="text-sm grey-text font-light">
              Ensure your cargo is insured
            </p>
          </div>

          {/* down */}
          {oceanInsurance && (
            <div className="flex flex-col gap-y-[32px] xl:flex-row md:gap-x-[1.44%]">
              <div className="">
                <div className="w-[100%] mb-6">
                  <div className="mb-3 w-[100%] ">
                    <CustomDefaultSelect
                      control={control}
                      name={"type_of_insurance_clause"}
                      id={"type_of_insurance_clause"}
                      label={"Type of Insurance Clause"}
                      placeholder={"Select Clause"}
                      isRequired={true}
                      errors={errors}
                      isDisabled={false}
                      defaultValue={{ label: "Clause A", value: "Clause A" }}
                      customOnChange={(val: any) => {
                        setClauseType(val.value);
                        getInsuranceByClauseType(val.value);
                      }}
                      options={[
                        { label: "Clause A", value: "A" },
                        { label: "Clause C", value: "C" },
                      ]}
                      icon=""
                    />
                  </div>
                </div>
                {/* disclaimer */}

                <div className="flex rounded gap-x-3 border py-5 px-6 black-text-3 bg-[#05197a05]">
                  <div>
                    <img src={disclaimer} alt="" className="min-w-[16px]" />
                  </div>
                  <div>
                    {clauseType === "A" ? (
                      <p className="text-sm text-[#1F2937] mb-2 font-light">
                        <span className="font-bold">Clause A</span> covers
                        losses due to breakage, chipping, denting, bruising,
                        theft, non-delivery, all water damage, etc. Also, covers
                        Clause C.
                      </p>
                    ) : (
                      <p className="text-sm text-[#1F2937] mb-2 font-light">
                        <span className="font-bold">Clause C</span> covers the
                        shipment against events such as fire, discharge of cargo
                        in case of distress, explosion, accidents like sinking,
                        capsizing, derailment, collision etc.
                      </p>
                    )}

                    {/* <p className="text-sm underline text-[#05197A]">
                    View More Details
                  </p> */}
                  </div>
                </div>
              </div>

              {/* middle vertical line */}
              <div className="hidden xl:block md:w-[2px] md:h-[191px] md:bg-[#F3F4F6]"></div>

              {/* right */}
              {loading ? (
                <i className="grey-text w-full">Getting insurance rates...</i>
              ) : (
                <div className="w-full grid grid-cols-2 gap-6">
                  {insurance.length ? (
                    insurance?.map((insuranceDetails: any, index: number) => {
                      return (
                        <ComponentBox
                          key={index}
                          insuranceDetails={insuranceDetails}
                          selectedInsurance={selectedInsurance}
                          setSelectedInsurance={setSelectedInsurance}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { loading, error, insurance } = state.additionalDetails;
  return {
    loading,
    error,
    insurance,
  };
};

export default connect(mapStateToProps, { getInsurance })(ExportOceanInsurance);
