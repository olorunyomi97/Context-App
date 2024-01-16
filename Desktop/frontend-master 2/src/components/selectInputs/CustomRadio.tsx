import { FC } from "react";
import "./index.css";

interface Props {
  selected?: boolean;
  label: string;
  onClick?: any;
  style?: React.CSSProperties | undefined;
}

const CustomRadio: FC<Props> = ({
  selected,
  label,
  onClick,
  style,
}): JSX.Element => {
  return (
    <div className={`cursor-pointer w-fit`} onClick={onClick} style={style}>
      <div className="flex items-center">
        {selected ? (
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" fill="#139C33" />
            <circle cx="8" cy="8" r="3" fill="#fff" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="6.5" stroke="#E5E7EB" />
          </svg>
        )}
        <p
          className={`${selected ? "green-text" : "grey-text-4"} text-sm ml-1`}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default CustomRadio;
