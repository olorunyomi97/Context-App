import React, { FC, useState, useEffect } from "react";
import "./index.css";
import { Controller } from "react-hook-form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

//helper
import { parseGeoCoding } from "helpers";

interface Props {
    control: object;
    name: string;
    id: string;
    label: string;
    isRequired: boolean;
    isDisabled: boolean;
    placeholder: string;
    errors: object;
    defaultValue: any;
    icon: string;
    allowWorldWide?: boolean;
}

const CustomGoogleInput: FC<Props> = ({
    control,
    name,
    id,
    label,
    isRequired,
    isDisabled = false,
    placeholder,
    errors = {},
    defaultValue = "",
    icon,
    allowWorldWide = true,
}): JSX.Element => {

    return (
        <>
            <div className="mb-3">
                <label className="text-sm font-light grey-text" htmlFor={id}>{label}</label>
                <div className="mt-1">
                    <Controller
                        //  @ts-ignore
                        control={control}
                        defaultValue={{ label: defaultValue, value: defaultValue }}
                        name={name}
                        rules={{
                            required: isRequired ? true : false,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>                {icon ? <i className={`${icon} left-icon grey-text`} /> : <></>}
                                <GooglePlacesAutocomplete
                                    apiKey={process.env.REACT_APP_GOOGLE_PLACES}
                                    apiOptions={{ language: "en" }}
                                    autocompletionRequest={
                                        allowWorldWide
                                            ? {}
                                            : {
                                                // componentRestrictions: {
                                                //     country: ["ng"],
                                                // },
                                            }
                                    }
                                    className="form-input px-4 py-3 custom-input icon w-full black-text overflow-x"
                                    name={name}
                                    styles={{
                                        outlineColor: "none",
                                        whiteSpace: "pre-wrap",
                                    }}
                                    placeholder={placeholder}
                                    selectProps={{
                                        // @ts-ignore
                                        "aria-placeholder": placeholder,
                                        // defaultInputValue: defaultValue,
                                        defaultValue: { label: defaultValue, value: defaultValue },
                                        isDisabled: isDisabled,
                                        value: value,
                                        onChange: (values: any) => {
                                            onChange(values);
                                            parseGeoCoding(values);
                                        },
                                        noOptionsMessage: () => placeholder,
                                        placeholder,
                                    }}
                                />              </>)}
                    />          {/* @ts-ignore */}
                    {errors[name] && (
                        <p className="mt-2 error-text">{label} is required</p>)}
                </div>
            </div>
        </>
    );
};

export default CustomGoogleInput;

// import React, { FC, useState, useEffect } from "react";
// import "./index.css";
// import { Controller } from "react-hook-form";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

// //helper
// import { parseGeoCoding } from "helpers";

// interface Props {
//     control: object;
//     name: string;
//     id: string;
//     label: string;
//     isRequired: boolean;
//     isDisabled: boolean;
//     placeholder: string;
//     errors: object;
//     defaultValue: any;
//     icon: string;
// }

// const NewCustomGoogleInput: FC<Props> = ({ control, name, id, label, isRequired, isDisabled = false, placeholder, errors = {}, defaultValue, icon }): JSX.Element => {
//     const [address, setAddress] = useState("");
//     useEffect(() => { address === "" ? setAddress(" ") : setAddress(defaultValue.label) }, [address]);

//     return (
//         <>
//             <div className=" mb-3">
//                 <label className="text-sm black-text" htmlFor={id}>
//                     {label}

//                     {/* {isRequired && <span className="co-lightred"> * </span>} */}
//                 </label>
//                 <div className="mt-1">
//                     <Controller
//                         //  @ts-ignore
//                         control={control}
//                         defaultValue={defaultValue}
//                         name={name}
//                         rules={{
//                             required: isRequired ? true : false,
//                         }}
//                         render={({ field: { onChange, value } }) => (
//                             <>
//                                 {icon ? <i className={`${icon} left-icon grey-text`} /> : <></>}

//                                 <GooglePlacesAutocomplete
//                                     apiKey={process.env.REACT_APP_GOOGLE_PLACES}
//                                     apiOptions={{ language: "en" }}
//                                     autocompletionRequest={{
//                                         componentRestrictions: {
//                                             country: ["ng"],
//                                             // country: [
//                                             //     "us",
//                                             //     "ca",
//                                             //     "ar",
//                                             //     "be",
//                                             //     "br",
//                                             //     "cn",
//                                             //     "cr",
//                                             //     "cz",
//                                             //     "dk",
//                                             //     "fr",
//                                             //     "de",
//                                             //     "gh",
//                                             //     "hk",
//                                             //     "in",
//                                             //     "ie",
//                                             //     "jp",
//                                             //     "ke",
//                                             //     "mx",
//                                             //     "nl",
//                                             //     "nz",
//                                             //     "ni",
//                                             //     "kp",
//                                             //     "py",
//                                             //     "pl",
//                                             //     "pt",
//                                             //     "qa",
//                                             //     "ru",
//                                             //     "sa",
//                                             //     "sc",
//                                             //     "sl",
//                                             //     "sg",
//                                             //     "sk",
//                                             //     "si",
//                                             //     "za",
//                                             //     "kr",
//                                             //     "es",
//                                             //     "se",
//                                             //     "ch",
//                                             //     "tw",
//                                             //     "th",
//                                             //     "tg",
//                                             //     "tt",
//                                             //     "tr",
//                                             //     "vi",
//                                             //     "ug",
//                                             //     "ua",
//                                             //     "ae",
//                                             //     "gb",
//                                             //     "uy",
//                                             //     "ve",
//                                             //     "vn",
//                                             //     "ye"
//                                             // ]
//                                         },
//                                     }}
//                                     // autocompletionRequest={{}}
//                                     // @ts-ignore
//                                     // defaultValue={{ label: defaultValue, value: defaultValue }}
//                                     // @ts-ignore
//                                     className="form-input px-4 py-1.5 custom-input icon w-full black-text overflow-x"
//                                     name={name}
//                                     styles={{
//                                         outlineColor: "none",
//                                         whiteSpace: "pre-wrap",
//                                     }}
//                                     selectProps={{
//                                         defaultInputValue: defaultValue.label,
//                                         // defaultValue: { label: defaultValue, value: defaultValue },

//                                         value: value,
//                                         onChange: (values: any) => {
//                                             onChange(values);

//                                             parseGeoCoding(values);
//                                         },
//                                         // noOptionsMessage: () => "Input pickup location",
//                                         placeholder,
//                                     }}
//                                 />
//                             </>
//                         )}
//                     />

//                     {/* @ts-ignore */}
//                     {errors[name] && <p className="mt-2 error-text">pickup location is required</p>}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default NewCustomGoogleInput;

