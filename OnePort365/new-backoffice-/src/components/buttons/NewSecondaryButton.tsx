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
const NewSecondaryButton: FC<Props> = ({
  title,
  style = {},
  onClick,
  icon,
  loading = false,
  disabled = false,
}): JSX.Element => {
  return (
    <div>
      <button
        className="btn bg-grey black-text text-sm py-2 w-full rounded flex items-center justify-center"
        // type="submit"
        style={style}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}{" "}
        {icon && (
          <i className={`${icon} text-lg mr-2`} style={{ fontSize: 25 }}></i>
        )}{" "}
        {title}
      </button>
    </div>
  );
};

export default NewSecondaryButton;
