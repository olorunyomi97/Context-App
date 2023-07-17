import React, { FC } from "react";
import { string, bool, func } from "prop-types";
import "./index.css";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

interface Props {
	name: string;
	id: string;
	label: string;
	isRequired: boolean;
	isDisabled: boolean;
	onChange: any;
	defaultChecked: boolean;
}

const CustomCheckBox: FC<Props> = ({
	name,
	id,
	label,
	isRequired,
	isDisabled,
	onChange,
	defaultChecked,
}): JSX.Element => {
	// console.log("the onchange", onChange);
	return (
		<div>
			<div className="flex">
				<div className="checkbox">
					<input
						type="checkbox"
						name={name}
						id={id}
						className="mr-2"
						disabled={isDisabled}
						required={isRequired}
						onChange={onChange}
						defaultChecked={defaultChecked}
					/>
					<label className="text-sm black-text" htmlFor={id}>
						{label === "terms" ? (
							<>
								<label htmlFor={id}>
									I agree to OnePort365{" "}
									<Link
										to="/terms-of-service"
										target="_blank"
										className="green-text"
									>
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										to="/privacy-policy"
										target="_blank"
										className="green-text"
									>
										Privacy Policy
									</Link>
								</label>
							</>
						) : (
							label
						)}
					</label>
					<span></span>
				</div>
			</div>
		</div>
	);
};

export default CustomCheckBox;
