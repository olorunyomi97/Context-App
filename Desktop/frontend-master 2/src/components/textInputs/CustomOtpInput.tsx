import { FC } from "react";
import OtpInput from "react-otp-input";
import { Controller } from "react-hook-form";

interface Props {
  control: object;
  name: string;
  id?: string;
  label?: string;
  isRequired: boolean;
  isDisabled?: boolean;
  type?: string;
  placeholder?: string;
  icon?: string;
  errors?: object;
  defaultValue?: string;
  min?: string; //for date type
  max?: string;
}

const CustomOtpInput: FC<Props> = ({
  control,
  name,
  id,
  label,
  isRequired,
  isDisabled = false,

  errors,
  defaultValue,
}): JSX.Element => {
  return (
    <div className=" mb-3">
      <label className="text-xs font-medium black-text" htmlFor={id}>
        {label}

        {/* {isRequired && <span className="co-lightred"> * </span>} */}
      </label>
      <div className="mt-1">
        <Controller
          //  @ts-ignore
          control={control}
          defaultValue={defaultValue}
          name={name}
          rules={{
            required: isRequired ? true : false,
          }}
          render={({ field: { onChange, value = "" } }) => (
            <>
              <div className="">
                <OtpInput
                  // className="form-input py-3 text-xl h-[56px] w-[45px] custom-input customotp-input black-text mr-2"
                  renderInput={(props) => <input {...props} style={{ width: "45px"}} className="custom-input text-xl h-[56px] px-4 w-[56px] customotp-input black-text mr-2" />}
                  value={value}
                  onChange={onChange}
                  numInputs={6}
                  inputType={"tel"}
                  //   focusStyle={{ borderWidth: 0 }}
                  inputStyle="md:ml-1"
                  //   separator={<span>-</span>}
                />
              </div>
            </>
          )}
        />

        {/* @ts-ignore */}
        {errors[name] && (
          <div className="mt-2 error-text">
            {/* @ts-ignore */}
            {errors[name]["message"] ? (
              //  @ts-ignore
              <p>{errors[name]["message"]}</p>
            ) : (
              <p>{label ? label : name} is required.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomOtpInput;
