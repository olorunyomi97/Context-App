import React, { FC } from "react";
// import "./index.scss";

const Spinner = () => <div className="spinner mr-2"></div>;


interface Props {
  title: string;
  style?: object;
  onClick?: any;
  loading?: boolean;
  disabled: boolean;
  icon?: any;
  class_names?: string;
}
const PrimaryButtons: FC<Props> = (props): JSX.Element => {
  const {
    title,
    style = {},
    onClick,
    loading = false,
    disabled = false,
    icon,
    class_names
  } = props;
  return (
    <div>
      <button
        className={`btn bg-green-2 ${
          (loading || disabled) && "opacity-50"
        } white-text text-sm py-3 w-full rounded ${class_names}`}
        type="submit"
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        <div className="flex items-center justify-center px-4">
          {loading && <Spinner />}
          {icon ? <img src={icon} alt="cross" className="mr-2" /> : <></>}
          {title}
        </div>
      </button>
    </div>
  );
};

export default PrimaryButtons;
