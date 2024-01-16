import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const CustomSearchSelect = (props: any) => {
  const {
    options,
    control,
    name,
    id,
    label,
    isRequired,
    errors,
    defaultValue,
    placeholder,
    isDisabled,
    callbackFunc = null,
  } = props;

  const filterOptions = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<[]>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  return (
    <>
      <div className="w-100 mb-3">
        <label className="text-xs black-text font-medium" htmlFor={id}>
          {label}
        </label>
        <br />

        <div className="mt-1">
          <Controller
            //  @ts-ignore
            control={control}
            defaultValue={defaultValue}
            name={name}
            rules={{
              required: isRequired ? true : false,
            }}
            render={({ field: { onChange, value } }) => (
              <AsyncSelect
                isDisabled={isDisabled}
                defaultValue={defaultValue ? defaultValue : null}
                value={value}
                onChange={(val: any, p) => {
                  onChange(val);
                  if (callbackFunc) {
                    callbackFunc(val); //for Countries, States, Cities plugin
                  }
                }}
                placeholder={placeholder}
                name={name}
                cacheOptions
                defaultOptions={options}
                loadOptions={promiseOptions}
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
    </>
  );
};

export default CustomSearchSelect;
