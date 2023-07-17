import { FC, useState } from "react";
import "./index.css";
import { Controller } from "react-hook-form";
import PasswordStrengthMeter from "components/passwordStrengthMeter";

interface Props {
  control: object;
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  placeholder: string;
  icon: string;
  errors: object;
  defaultValue: string;
}

const CustomTextarea: FC<Props> = ({
  control,
  name,
  id,
  label,
  isRequired,
  isDisabled = false,
  placeholder,
  icon,
  errors,
  defaultValue,
}): JSX.Element => {
  return (
    <div className=" mb-3">
      <label className="text-sm black-text" htmlFor={id}>
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
          render={({ field: { onChange, value } }) => (
            <>
              <div className="d-flex align-items-center">
                <textarea
                  autoComplete="off"
                  className="form-input px-4 py-1.5 custom-input w-full black-text"
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                  }}
                  rows={4}
                  placeholder={placeholder}
                  disabled={isDisabled}
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

export default CustomTextarea;
