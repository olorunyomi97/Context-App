import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

//style
import "./index.css";

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
}): JSX.Element => {
	// const [defalt, setDefault] = useState<any>();
	//useEffect to fire a re-render immediately a default value is set
	// useEffect(() => {
	// 	setDefault(defaultValue);
	// }, [defaultValue]);
	// console.log(defaultValue);

	return (
		<div className="w-100" style={{ marginTop: "-20px" }}>
			<label className="text-xs black-text font-medium" htmlFor={id}>
				{label}
				{/* {isRequired && <span className="co-lightred"> * </span>} */}
			</label>{" "}
			<br />
			{icon === "info" ? (
				<>
					<label className="text-xs green-text my-2" htmlFor={id}>
						Don’t know what policy type is{" "}
						<i className="text-lg ion-ios-help bg-green p-0.1 px-2 rounded-full white-text"></i>
					</label>
				</>
			) : (
				<></>
			)}
			<div className="">
				<Controller
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
								console.log("first", val);
								onChange(val);
							}}
							placeholder={placeholder}
							name={name}
							options={options}
						//   classNamePrefix="form-input px-4 py-1.5 custom-input w-full black-text"
						/>
					)}
				/>
			</div>
			{/* @ts-ignore */}
			{errors[name] && (
				<div className="mt-2 error-text">
					<p>{label ? label : name} is required.</p>
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
