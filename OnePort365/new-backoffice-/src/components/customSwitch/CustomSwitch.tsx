import React from "react";
import Switch from "react-switch";

const CustomSwitch = ({ checked, onChange }: any) => {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      onColor="#3ab44a"
      offColor="#d1d5db"
      uncheckedIcon={false}
      checkedIcon={false}
      height={16}
      width={26}
    />
  );
};

export default CustomSwitch;
