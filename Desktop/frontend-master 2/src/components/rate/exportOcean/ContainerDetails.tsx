import React from "react";

//icons
import deleteIcon from "assets/icons/delete.svg";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomDefaultSelect from "components/selectInputs/CustomDefaultSelect";

//libraries
var converter = require("number-to-words");

const ContainerDetails = (props: any) => {
  const { control, errors, index, defaultValue, removeContainer, uid } = props;
  // console.log("defaultVal>>>", defaultValue.container_size)

  // console.log("first>>>",  uid)
  return (
    <>
      <div>
        <div className="mt-6 flex gap-y-5 md:gap-y-0 flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base black-text-3">
              {" "}
              {/**converts the first letter to capital, the converter function makes it ordinal */}
              {converter
                .toWordsOrdinal(index + 1)
                .charAt(0)
                .toUpperCase() +
                converter.toWordsOrdinal(index + 1).slice(1)}{" "}
              Container
            </p>
            <p className="text-sm grey-text-4">
              Please provide your container details
            </p>
          </div>
          {index === 0 ? (
            <></>
          ) : (
            <div
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => removeContainer(uid)}
            >
              <div>
                <img src={deleteIcon} alt="" />
              </div>
              <span className="text-xs text-[#991B1B] font-medium">
                Delete Container
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
          <CustomInput
            control={control}
            name={`container_count_${uid}`}
            id={`container_count_${uid}`}
            label={"Container Count"}
            placeholder={""}
            isRequired={true}
            type={"number"}
            errors={errors}
            isDisabled={false}
            defaultValue={defaultValue?.container_count}
            min={""}
            max={""}
            icon=""
          />
          <CustomInput
            control={control}
            name={`weight_${uid}`}
            id={`weight_${uid}`}
            label={"Estimated Container Weight (Tons)"}
            placeholder={""}
            isRequired={true}
            type={"number"}
            errors={errors}
            isDisabled={false}
            defaultValue={defaultValue?.container_weight}
            min={""}
            max={""}
            icon=""
          />
          <CustomDefaultSelect
            control={control}
            name={`container_size_${uid}`}
            id={`container_size_${uid}`}
            label={"Container Size"}
            placeholder={``}
            isRequired={true}
            errors={errors}
            isDisabled={false}
            options={[
              { label: "20 FT", value: "20FT" },
              { label: "40 FT", value: "40FT" },
              { label: "40 HC FT", value: "40HC FT" },
            ]}
            defaultValue={{
              label: defaultValue?.container_size,
              value: defaultValue?.container_size,
            }}
            icon=""
          />
          <CustomDefaultSelect
            control={control}
            name={`container_type_${uid}`}
            id={`container_type_${uid}`}
            label={"Type of Container"}
            placeholder={``}
            isRequired={true}
            errors={errors}
            isDisabled={false}
            options={[
              { label: "Dry", value: "dry" },
              { label: "Reefer", value: "reefer" },
            ]}
            defaultValue={{
              label: defaultValue?.container_type,
              value: defaultValue?.container_type,
            }}
            icon=""
          />
        </div>
      </div>
    </>
  );
};

export default ContainerDetails;
