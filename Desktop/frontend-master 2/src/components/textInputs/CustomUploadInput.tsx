import { FC, useState } from "react";
import { Controller } from "react-hook-form";

interface Props {
  id: string;
  control: object;
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string | undefined;
  errors: object;
  isRequired: boolean;
}

const CustomUploadInput: FC<Props> = ({
  id,
  control,
  name,
  label,
  placeholder,
  defaultValue,
  errors,
  isRequired,
}): JSX.Element => {
  const [filename, setFileName] = useState<any>("");

  //handles file submission
  const handleFileChange = (val) => {
    let selected = val.target.files[0];
    setFileName(selected.name);
  };

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
                <span className="text-xs font-medium black-text">{label}</span>
                <div className="flex items-center mt-1">
                  <label
                    htmlFor={id}
                    className="text-xs rounded-l-md font-semibold w-1/5 cursor-pointer h-[38px] flex items-center bg-[#3bb54b] text-white justify-center px-1"
                  >
                    Choose File
                  </label>
                  <p className="border-solid border-y-[1px] border-r-[1px] w-4/5 border-[#d1d5db] h-[38px] rounded-r-md flex items-center pl-3 text-xs">
                    {filename}
                  </p>
                </div>
                <input
                  id={id}
                  type="file"
                  onChange={(val) => {
                    onChange(val.target.files);
                    handleFileChange(val);
                  }}
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

export default CustomUploadInput;
