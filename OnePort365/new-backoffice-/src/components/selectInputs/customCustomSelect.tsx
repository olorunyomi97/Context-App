import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import Select, { components } from "react-select";
//icons
import caretdown from "assets/icons/caret-down.svg";
import chevronup from "assets/icons/chevron-up.svg";
//style
import "./index.css";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg width="14" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.833 1.082 6.999 6.915 1.166 1.082" stroke="#4B5563" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>      </components.DropdownIndicator>)
    );
};
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
    defaultValue: any;
    options: any;
    setOriginPort?: any
}
const CustomSelect: FC<Props> = ({
    options,
    control,
    name,
    id,
    label,
    isRequired,
    isDisabled,
    placeholder,
    icon,
    errors,
    defaultValue,
    setOriginPort
}): JSX.Element => {
    return (
        <div className="w-100 mb-3">      <label className="text-sm grey-text font-light" htmlFor={id}>        {label}
        </label>{" "}
            <br />      {icon === "info" ? (
                <>          <label className="text-xs green-text my-2" htmlFor={id}>            Don’t know what policy type is{" "}
                    <i className="text-lg ion-ios-help bg-green p-0.1 px-2 rounded-full white-text"></i>          </label>        </>) : (
                <></>)}
            <div className="mt-1">        <Controller
                //  @ts-ignore
                control={control}
                defaultValue={defaultValue}
                name={name}
                rules={{
                    required: isRequired ? true : false,
                }}
                render={({ field: { onChange, value } }) => (
                    <Select
                        defaultValue={defaultValue ? defaultValue : null}
                        value={value}
                        onChange={(val: any, p) => {
                            onChange(val);
                            setOriginPort(val)
                        }}
                        // styles={colorStyles}
                        components={{ DropdownIndicator }}
                        placeholder={placeholder}
                        name={name}
                        options={options}
                    //   classNamePrefix="form-input px-4 py-1.5 custom-input w-full black-text"
                    />)}
            />      </div>      {/* @ts-ignore */}
            {errors[name] && (
                <div className="mt-2 error-text">
                    <p>{label ? label : name} is required.</p>
                </div>)
            }
        </div>);
};
export default CustomSelect;