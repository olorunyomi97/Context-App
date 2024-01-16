import React, { FC } from "react";
// import "./index.scss";

interface Props {
  title: string;
  style?: object;
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  type?: any;
}
const SecondaryButtons: FC<Props> = ({
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
        className={`btn bg-[#109b320d] green-text px-3.5 text-sm py-4 w-full rounded flex items-center justify-center ${
          disabled ? "opacity-70" : ""
        }`}
        type={type ? type : "submit"}
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}{" "}
        {icon ? <img src={icon} alt="cross" className="mr-2" /> : <></>}
        {title}
      </button>
    </div>
  );
};

export default SecondaryButtons;
