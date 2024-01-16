import React, { FC } from "react";

import "./index.css";

interface Props {
  title: string;
  style?: object;
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  iconRight?: boolean;
  isColored?: boolean;
  manrope?: boolean;
}

const Spinner = () => <div className="spinner mr-2"></div>;

const Button: FC<Props> = (props): JSX.Element => {
  const {
    title,
    style = {},
    onClick,
    loading = false,
    disabled = false,
    icon,
    iconRight = false,
    isColored = false,
    manrope = false,
  } = props;
  return (
    <div>
      <button
        className={`btn ${isColored ? "dock-button" : "bg-green-3"} ${
          (loading || disabled) && "opacity-50"
        } white-text text-sm py-3 px-6 w-full rounded`}
        type="submit"
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        <div
          className={`flex items-center justify-center px-4 ${
            manrope ? "manro font-medium" : ""
          }`}
        >
          {loading && <Spinner />}
          {icon ? (
            <img
              src={icon}
              alt="cross"
              className={`${iconRight ? "mr-2 order-1 ml-2" : "mr-2"} `}
            />
          ) : (
            <></>
          )}
          {title}
        </div>
      </button>
    </div>
  );
};

export default Button;
