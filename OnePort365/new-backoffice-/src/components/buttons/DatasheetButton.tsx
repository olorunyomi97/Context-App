import React, { FC } from "react";
// import "./index.scss";

interface Props {
  title: string;
  style: object;
  onClick: any;
  loading: boolean;
  disabled: boolean;
  icon: string;
}
const PrimaryButton: FC<Props> = (props): JSX.Element => {
  const {
    title,
    style = {},
    onClick,
    loading = false,
    disabled = false,
    icon,
  } = props;
  return (
    <div>
      <button
        className={`btn bg-green ${
          loading && "opacity-75"
        } white-text text-sm py-3 w-full rounded`}
        type="submit"
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        <div className="flex items-center justify-center">
          {loading && <i className="fa fa-spinner fa-pulse mr-2"></i>}
          {title}
          {icon ? <i className={`${icon} ml-2 text-xl`}></i> : <></>}
        </div>
      </button>
    </div>
  );
};

export default PrimaryButton;
