import React from "react";
import { useForm } from "react-hook-form";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomInput from "components/textInputs/CustomInput";

const ContainerDetails = (props: any) => {
  const { control, errors, removeContainer, index, defaultValue } = props;

  return (
    <>
      {index === 0 ? (
        <> </>
      ) : (
        <>
          <div className="flex">
            <div className="mobile-only ml-auto">
              <div className="bg-red p-1 h-8 w-8 flex items-center justify-center rounded-lg">
                <i
                  className="ion-ios-trash white-text text-xl "
                  onClick={() => removeContainer(index)}
                ></i>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="" key={index}>
        <div className="grid lg:grid-cols-10 grid-cols-2 gap-4 items-center mb-7">
          <div className="col-span-1">
            <p className="black-text text-xs font-semibold">Load {index + 1}</p>
          </div>
          <div className="col-span-2">
            <CustomInput
              control={control}
              name={`container_count_${index}`}
              id={`container_count_${index}`}
              label={"No of container(s)"}
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
          </div>

          <div className="col-span-2">
            <CustomSelect
              control={control}
              name={`container_size_${index}`}
              id={`container_size_${index}`}
              label={"Size of Container"}
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
          </div>

          <div className="col-span-2">
            <CustomSelect
              control={control}
              name={`container_type_${index}`}
              id={`container_type_${index}`}
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

          {/* <div className="grid grid-cols-2 gap-4 items-center"> */}
          <div className="col-span-2">
            <CustomInput
              control={control}
              name={`weight_${index}`}
              id={`weight_${index}`}
              label={"Weight per container (TON)"}
              placeholder={""}
              isRequired={true}
              type={"number"}
              errors={errors}
              isDisabled={false}
              defaultValue={defaultValue?.container_weight}
              min={"1"}
              max={""}
              icon=""
            />
          </div>
          {index === 0 ? (
            <> </>
          ) : (
            <>
              <div className="col-span-1 desktop-only mt-4">
                <div className="bg-red p-1 h-8 w-8  flex items-center justify-center rounded-lg">
                  <i
                    className="ion-ios-trash white-text text-xl "
                    onClick={() => removeContainer(index)}
                  ></i>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContainerDetails;
