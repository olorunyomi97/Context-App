import { FC, useState } from "react";
import "./index.css";
import { Controller } from "react-hook-form";
import PasswordStrengthMeter from "components/passwordStrengthMeter";
import moment from "moment";

import eye from "assets/dock/eye.svg";
import eyeclose from "assets/dock/eyeclose.svg";
import green from "assets/dock/caretright-green.svg";

interface Props {
  control: object;
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  type: string;
  placeholder: string;
  icon?: any;
  errors: object;
  defaultValue: string;
  min: string; //for date type
  max: string;
  extra?: boolean;
  style?: any;
  isMargined?: boolean
}

const CustomInput: FC<Props> = ({
  control,
  name,
  id,
  label,
  isRequired,
  isDisabled = false,
  type,
  placeholder,
  icon,
  errors,
  defaultValue,
  min, //for date type
  max,
  extra = false,
  style,
  isMargined = true
}): JSX.Element => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStatus, setPasswordStatus] = useState(0);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  console.log("object>>>", defaultValue);

  return (
    <div className={`${isMargined ? "mb-3" : ""}`}>
      <label className="text-sm font-light grey-text" htmlFor={id}>
        {label}
      </label>
      <div className={`${isMargined ? "mt-1" : "mt-3"}`}>
        <Controller
          //  @ts-ignore
          control={control}
          defaultValue={defaultValue}
          name={name}
          rules={{
            required: isRequired ? true : false,
          }}
          // @ts-ignore
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <div className="d-flex align-items-center">
                  <div className="relative">
                    <input
                      id={id}
                      name={name}
                      autoComplete="off"
                      className={`form-input px-4 py-3 custom-input w-full font-light black-text border-grey-2  ${
                        isDisabled ? "input-disabled" : ""
                      }`}
                      style={style}
                      type={
                        type === "password-with-strength-meter" ||
                        type === "password"
                          ? passwordShown
                            ? "text"
                            : "password"
                          : type
                      }
                      value={value}
                      onChange={(val) => {
                        onChange(val);
                        setPasswordValue(val.target.value);
                      }}
                      placeholder={placeholder}
                      disabled={isDisabled}
                      min={type === "number" && !min ? "0" : min}
                      max={max}
                      defaultValue={
                        type === "number"
                          ? parseInt(defaultValue)
                          : type === "date"
                          ? defaultValue
                          : defaultValue
                      }
                    />
                    <img
                      src={
                        type === "password" ||
                        type === "password-with-strength-meter"
                          ? passwordShown
                            ? eyeclose
                            : eye
                          : icon
                      }
                      alt=""
                      className="absolute top-1/2 right-5 translate-y-[-50%]"
                      onClick={() => {
                        if (
                          type === "password-with-strength-meter" ||
                          type === "password"
                        )
                          togglePasswordVisibility();
                      }}
                    />
                  </div>

                  {extra && (
                    <div className="relative mt-6">
                      <label className="text-sm font-light grey-text">
                        Confirm Password
                      </label>
                      <input
                        id={"confirm_pwd"}
                        name={"confirm_pwd"}
                        autoComplete="off"
                        className={`form-input px-4 py-3 custom-input w-full black-text border-grey-2  ${
                          isDisabled ? "input-disabled" : ""
                        }`}
                        type={
                          type === "password-with-strength-meter" ||
                          type === "password"
                            ? passwordShown
                              ? "text"
                              : "password"
                            : type
                        }
                        value={value}
                        onChange={(val) => {
                          onChange(val);
                          setConfirmPassword(val.target.value);
                        }}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        min={type === "number" && !min ? "0" : min}
                        max={max}
                        defaultValue={
                          type === "number"
                            ? parseInt(defaultValue)
                            : type === "date"
                            ? defaultValue
                            : defaultValue
                        }
                      />
                      <img
                        src={
                          type === "password" ||
                          type === "password-with-strength-meter"
                            ? passwordShown
                              ? green
                              : eye
                            : icon
                        }
                        alt=""
                        className="absolute top-1/2 right-5 translate-y-[-50%]"
                        onClick={() => {
                          if (
                            type === "password-with-strength-meter" ||
                            type === "password"
                          )
                            togglePasswordVisibility();
                        }}
                      />
                    </div>
                  )}

                  {/* {type === "password-with-strength-meter" ||
                    type === "password" ? (
                    <>
                      <i
                        className="password-icon"
                        onClick={() => togglePasswordVisibility()}
                      >
                        {passwordShown ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 30 30"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 30 30"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </i>
                    </>
                  ) : (
                    <></>
                  )} */}
                </div>
              </>
            );
          }}
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

        {!extra && (
          <div className="passwordStrengthBar">
            {type === "password-with-strength-meter" ? (
              <>
                <PasswordStrengthMeter
                  password={passwordValue}
                  minLength={8}
                  setPasswordStatus={setPasswordStatus}
                  passwordStatus={passwordStatus}
                  // onChangeScore={(score, feedback) => {
                  //
                  // }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CustomInput.displayName = "CustomInput";

export default CustomInput;
