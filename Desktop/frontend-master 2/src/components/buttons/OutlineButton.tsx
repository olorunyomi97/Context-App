import React, { FC } from "react";
// import "./index.scss";

interface Props {
  title: string;
  style: object;
  onClick: any;
  loading: boolean;
  disabled: boolean;
  icon: string;
  type?: any;
}
const OutlineButton: FC<Props> = ({
  title,
  style = {},
  onClick,
  icon,
  type,
  loading = false,
  disabled = false,
}): JSX.Element => {
  return (
    <div>
      <button
        className={`btn solid-br text-sm py-3 px-4 rounded flex items-center justify-center ${loading || disabled ? "opacity-50" : ""
          }`}
        type={type ? type : "submit"}
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}{" "}
        {icon && (
          // <i className={`${icon} text-lg mr-2`} style={{ fontSize: 25 }}></i>
          <img className="mr-2.5" src={icon} alt="" />
        )}{" "}
        {title}
      </button>
    </div>
  );
};

export default OutlineButton;
