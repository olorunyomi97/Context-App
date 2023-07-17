import { FC, useState } from "react";
import "./index.css";
import { Controller } from "react-hook-form";
import PasswordStrengthMeter from "components/passwordStrengthMeter";
import moment from "moment";
interface Props {
	control: object;
	name: string;
	id: string;
	label: string;
	isRequired: boolean;
	isDisabled: boolean;
	type: string;
	placeholder: string;
	icon: string;
	errors: object;
	defaultValue: string;
	min: string; //for date type
	max: string;
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
}): JSX.Element => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [passwordValue, setPasswordValue] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [passwordStatus, setPasswordStatus] = useState(0);
	const [noSpecialChracters, setNoSpecialCharacters] = useState(0);

	// const []
	const togglePasswordVisibility = () => {
		setPasswordShown(!passwordShown);
	};

	// console.log("object>>>", defaultValue)
	return (
		<div className="mb-3">
			<label className="text-sm font-light grey-text"
				htmlFor={id}
			>
				{label}
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
					// @ts-ignore
					render={({ field: { onChange, value } }) => {
						return (
							<>
								<div className="d-flex align-items-center">
									{/* <div className="relative"> */}
									<input
										id={id}
										name={name}
										autoComplete="off"
										className={`form-input px-4 py-3 custom-input w-full black-text border-grey-2 uppercase  ${isDisabled ? "input-disabled" : ""}`}
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
										min={min}
										max={max}
										defaultValue={
											type === "number"
												? parseInt(defaultValue)
												: type === "date"
													? defaultValue
													: defaultValue
										}
										maxLength={11}
										pattern="[^\s!@#$%^&*()|:;]+"
									/>                  {/* <img src={icon} alt="" className="absolute top-1/2 right-5 translate-y-[-50%]" /> */}
									{/* </div> */}
									{type === "password-with-strength-meter" || type === "password" ?
										(
											<>
												<i
													className="password-icon"
													onClick={() => togglePasswordVisibility()}
												>                          {passwordShown ? (
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
													</svg>) : (
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
													</svg>)}
												</i>
											</>) : (
											<></>)}
								</div>
							</>);
					}}
				/>        {/* @ts-ignore */}
				{errors[name] && (
					<div className="mt-2 error-text">            {/* @ts-ignore */}
						{errors[name]["message"] ? (
							//  @ts-ignore
							<p>{errors[name]["message"]}</p>) : (
							<p>{label ? label : name} is required.</p>)}
					</div>)}
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
						</>) : (
						<></>)}
				</div>
			</div>
		</div>
	);
};
CustomInput.displayName = "CustomInput";
export default CustomInput;


// import { FC, useEffect, useState } from "react";
// import "./index.css";
// import { Controller } from "react-hook-form";
// import PasswordStrengthMeter from "components/passwordStrengthMeter";

// interface Props {
// 	control: object;
// 	name: string;
// 	id: string;
// 	label: string;
// 	isRequired: boolean;
// 	isDisabled: boolean;
// 	type: string;
// 	placeholder: string;
// 	icon: string;
// 	errors: object;
// 	defaultValue: string;
// 	min: string; //for date type
// 	max: string;
// }

// const CustomInput: FC<Props> = ({
// 	control,
// 	name,
// 	id,
// 	label,
// 	isRequired,
// 	isDisabled = false,
// 	type,
// 	placeholder,
// 	icon,
// 	errors,
// 	defaultValue,
// 	min, //for date type
// 	max,
// }): JSX.Element => {
// 	const [passwordShown, setPasswordShown] = useState(false);
// 	const [passwordValue, setPasswordValue] = useState("");
// 	const [passwordStrength, setPasswordStrength] = useState(0);
// 	const [passwordStatus, setPasswordStatus] = useState(0);
// 	// const [defalt, setDefault] = useState<any>();

// 	const togglePasswordVisibility = () => {
// 		setPasswordShown(!passwordShown);
// 	};

// 	//useEffect to fire a re-render immediately a default value is set
// 	// useEffect(() => {
// 	//   setDefault(defaultValue);
// 	// }, [defaultValue]);

// 	return (
// 		<div className=" mb-3">
// 			<label className="text-xs font-medium black-text" htmlFor={id}>
// 				{label}

// 				{/* {isRequired && <span className="co-lightred"> * </span>} */}
// 			</label>
// 			<div className="mt-1">
// 				<Controller
// 					//  @ts-ignore
// 					control={control}
// 					defaultValue={defaultValue}
// 					name={name}
// 					rules={{
// 						required: isRequired ? true : false,
// 					}}
// 					// @ts-ignore
// 					render={({ field: { onChange, value } }) => {
// 						return (
// 							<>
// 								<div className="d-flex align-items-center">
// 									<input
// 										autoComplete="off"
// 										className={`form-input px-4 py-1.5 custom-input w-full black-text  ${isDisabled ? "input-disabled" : ""
// 											}`}
// 										type={
// 											type === "password-with-strength-meter" ||
// 												type === "password"
// 												? passwordShown
// 													? "text"
// 													: "password"
// 												: type
// 										}
// 										value={value}
// 										onChange={(val) => {
// 											onChange(val);
// 											setPasswordValue(val.target.value);
// 										}}
// 										placeholder={placeholder}
// 										disabled={isDisabled}
// 										min={min}
// 										max={max}
// 										defaultValue={type === "number" ? parseInt(defaultValue) : defaultValue
// 										}
// 									/>
// 									{type === "password-with-strength-meter" ||
// 										type === "password" ? (
// 										<>
// 											<i
// 												className="password-icon"
// 												onClick={() => togglePasswordVisibility()}
// 											>
// 												{passwordShown ? (
// 													<svg
// 														xmlns="http://www.w3.org/2000/svg"
// 														className="h-6 w-6"
// 														fill="none"
// 														viewBox="0 0 30 30"
// 														stroke="currentColor"
// 														strokeWidth={1}
// 													>
// 														<path
// 															strokeLinecap="round"
// 															strokeLinejoin="round"
// 															d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
// 														/>
// 													</svg>
// 												) : (
// 													<svg
// 														xmlns="http://www.w3.org/2000/svg"
// 														className="h-6 w-6"
// 														fill="none"
// 														viewBox="0 0 30 30"
// 														stroke="currentColor"
// 														strokeWidth={1}
// 													>
// 														<path
// 															strokeLinecap="round"
// 															strokeLinejoin="round"
// 															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// 														/>
// 														<path
// 															strokeLinecap="round"
// 															strokeLinejoin="round"
// 															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// 														/>
// 													</svg>
// 												)}
// 											</i>
// 										</>
// 									) : (
// 										<></>
// 									)}
// 								</div>
// 							</>
// 						);
// 					}}
// 				/>
// 				{/* @ts-ignore */}
// 				{errors[name] && (
// 					<div className="mt-2 error-text">
// 						{/* @ts-ignore */}
// 						{errors[name]["message"] ? (
// 							//  @ts-ignore
// 							<p>{errors[name]["message"]}</p>
// 						) : (
// 							<p>{label ? label : name} is required.</p>
// 						)}
// 					</div>
// 				)}

// 				<div className="passwordStrengthBar">
// 					{type === "password-with-strength-meter" ? (
// 						<>
// 							<PasswordStrengthMeter
// 								password={passwordValue}
// 								minLength={8}
// 								setPasswordStatus={setPasswordStatus}
// 								passwordStatus={passwordStatus}
// 							// onChangeScore={(score, feedback) => {
// 							//
// 							// }}
// 							/>
// 						</>
// 					) : (
// 						<></>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// CustomInput.displayName = "CustomInput";

// export default CustomInput;
