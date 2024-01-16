import { FC, useState } from "react";
import { Controller } from "react-hook-form";

//icons
import exportImg from "assets/icons/export-upload.svg";

interface Props {
  id: string;
  control: object;
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string | undefined;
  errors: object;
  isRequired: boolean;
  disabled: boolean;
  handleFileChange: (any) => void;
}

const ShipmentUploadInput: FC<Props> = ({
  id,
  control,
  name,
  label,
  placeholder,
  defaultValue,
  errors,
  isRequired,
  handleFileChange,
  disabled,
}): JSX.Element => {
  const [filename, setFileName] = useState<any>("");

  //handles file submission
  // const handleFileChange = (val) => {
  //     let selected = val.target.files[0]
  //     setFileName(selected.name)

  //     if (val.target.files[0].size < 10000000) {
  //         setUploadError("Maximum file size of 10MB")
  //         return
  //     } else if (['application/pdf',].includes(val.target.files[0]?.type)) {
  //         setUploadError("Only PDF format allowed.")
  //         return
  //     }
  //     submit({
  //         ship_doc: val.target.files
  //     })
  // }
  // const [uploadError, setUploadError] = useState("")
  return (
    <>
      <Controller
        //  @ts-ignore
        control={control}
        defaultValue={defaultValue}
        name={name}
        rules={{
          required: isRequired ? true : false,
          validate: {
            lessThan10MB: (files) =>
              files[0]?.size < 10000000 || "Maximum file size of 10MB",
            acceptedFormats: (files) =>
              ["application/pdf"].includes(files[0]?.type) ||
              "Only PDF format allowed.",
          },
        }}
        // @ts-ignore
        render={({ field: { onChange, value } }) => {
          return (
            <div>
              <div className="">
                {/* <span className="text-xs font-medium black-text">{label}</span> */}
                <div
                  className={`flex items-center mt-1 ${
                    disabled && "opacity-40"
                  }`}
                >
                  <label htmlFor={id} className="cursor-pointer">
                    <span className="w-[15%] self-center mt-4">
                      <img src={exportImg} alt="" />
                    </span>
                  </label>
                  {/* <p className="border-solid border-y-[1px] border-r-[1px] w-4/5 border-[#d1d5db] h-[38px] rounded-r-md flex items-center pl-3 text-xs">{filename}</p> */}
                </div>
                <input
                  id={id}
                  type="file"
                  onChange={(val) => {
                    onChange(val.target.files);
                    handleFileChange(val);
                  }}
                  disabled={disabled}
                />
              </div>
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
          );
        }}
      />
    </>
  );
};
// control={control}
//       defaultValue={defaultValue}
//       name={name}
//       rules={{
//         required: isRequired ? true : false,
//       }}

export default ShipmentUploadInput;
