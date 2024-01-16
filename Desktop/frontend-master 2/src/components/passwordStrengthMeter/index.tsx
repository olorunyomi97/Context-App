import React, { FC } from "react";
import "./index.css";
import {
  checkPasswordHasCapital,
  checkPasswordHasMin,
  checkPasswordHasSpecialCharacter,
  checkPasswordHasSpecialDigit,
  // checkPassword,
} from "helpers/passwordCheckerHelper";

export const checkPassword = (
  password: string,
  setPasswordStatus: any,
  minLength: number
): number => {
  let strength = 0;

  // Password must have a figure.
  if (checkPasswordHasSpecialDigit(password)) {
    strength += 1;
  }
  // Password must have a capital letter
  if (checkPasswordHasCapital(password)) {
    strength += 1;
  }
  //Password must be 6 or more characters long
  if (checkPasswordHasMin(password, minLength)) {
    strength += 1;
  }
  //Password must have special character
  if (checkPasswordHasSpecialCharacter(password)) {
    strength += 1;
  }

  if (setPasswordStatus) {
    setPasswordStatus(strength);
  }
  return strength;
};

interface Props {
  password: string;
  setPasswordStatus: any;
  passwordStatus: number;
  minLength: number;
}

const PasswordStrengthMeter: FC<Props> = ({
  password,
  setPasswordStatus,
  passwordStatus,
  minLength,
}): JSX.Element => {
  const testResult = checkPassword(password, setPasswordStatus, minLength); //zxcvbn(password);
  const num = (testResult * 100) / 4;
  const checkForCapital = checkPasswordHasCapital(password);
  const checkForLength = checkPasswordHasMin(password, minLength);
  const checkForSpecialCharacters = checkPasswordHasSpecialCharacter(password);
  const checkForSpecialDigits = checkPasswordHasSpecialDigit(password);

  const createPassLabel = () => {
    if (testResult >= 4) {
      return "strong";
    } else if (testResult < 4 && testResult >= 3) {
      return "fair";
    } else if (testResult < 3 && testResult >= 2) {
      return "weak";
    } else if (testResult < 2) {
      return "very weak";
    } else {
      return "";
    }
  };

  const funcProgressColor = () => {
    if (testResult >= 4) {
      return "#3ab44a";
    } else if (testResult < 4 && testResult >= 3) {
      return "#9bc158";
    } else if (testResult < 3 && testResult >= 2) {
      return "#FFAD00";
    } else if (testResult < 2) {
      return "#EA1111";
    } else {
      return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "4px",
    borderRadius: 5,
  });

  return (
    <>
      <div className="progress" style={{ height: "7px", marginTop: "15px" }}>
        <div className="progress-bar mt-2" style={changePasswordColor()}></div>
      </div>
      <p
        className="text-sm font-light mt-2"
        style={{
          color: funcProgressColor(),
        }}
      >
        {testResult ? `This password is ${createPassLabel()}` : ""}
      </p>

      <div className="flex flex-col mt-3">
        <small
          className={`text-sm ${
            checkForLength ? "green-text" : "grey-text font-light"
          }`}
        >
          <i
            className={`mr-1 ion-ios-radio-button-${
              checkForLength ? "on" : "off"
            }`}
          ></i>{" "}
          Password must be {minLength} or more characters long
        </small>
        <small
          className={`mt-3 text-sm  ${
            checkForCapital ? "green-text" : "grey-text font-light"
          }`}
        >
          <i
            className={`mr-1 ion-ios-radio-button-${
              checkForCapital ? "on" : "off"
            }`}
          ></i>{" "}
          Password must have a capital letter
        </small>
        <small
          className={`mt-3 text-sm ${
            checkForSpecialCharacters ? "green-text" : "grey-text font-light"
          }`}
        >
          <i
            className={`mr-1 ion-ios-radio-button-${
              checkForSpecialCharacters ? "on" : "off"
            }`}
          ></i>{" "}
          Password must have a special character
        </small>
        <small
          className={`mt-3 text-sm ${
            checkForSpecialDigits ? "green-text" : "grey-text font-light"
          }`}
        >
          <i
            className={`mr-1 ion-ios-radio-button-${
              checkForSpecialDigits ? "on" : "off"
            }`}
          ></i>{" "}
          Password must have a number.
        </small>
        <br />
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
