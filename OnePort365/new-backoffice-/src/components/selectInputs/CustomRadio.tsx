import { FC } from "react";
import "./index.css";

interface Props {
  selected: boolean;
  label: string;
  onClick: any;
}

const CustomRadio: FC<Props> = ({ selected, label, onClick }): JSX.Element => {
  return (
    <div
      className={`cursor-pointer px-4 py-2.5 ${
        selected ? "radio-selected" : "radio-not-selected"
      } w-full mb-3`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {selected ? (
          <svg
            width="20"
            height="18"
            viewBox="0 0 22 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22.5C6.477 22.5 2 18.023 2 12.5C2 6.977 6.477 2.5 12 2.5C17.523 2.5 22 6.977 22 12.5C22 18.023 17.523 22.5 12 22.5ZM12 16.5C13.0609 16.5 14.0783 16.0786 14.8284 15.3284C15.5786 14.5783 16 13.5609 16 12.5C16 11.4391 15.5786 10.4217 14.8284 9.67157C14.0783 8.92143 13.0609 8.5 12 8.5C10.9391 8.5 9.92172 8.92143 9.17157 9.67157C8.42143 10.4217 8 11.4391 8 12.5C8 13.5609 8.42143 14.5783 9.17157 15.3284C9.92172 16.0786 10.9391 16.5 12 16.5Z"
              fill="#3AB44A"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="15"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0.5C8.02219 0.5 6.08879 1.08649 4.4443 2.1853C2.79981 3.28412 1.51809 4.8459 0.761209 6.67317C0.00433284 8.50043 -0.193701 10.5111 0.192152 12.4509C0.578004 14.3907 1.53041 16.1725 2.92894 17.5711C4.32746 18.9696 6.10929 19.922 8.0491 20.3079C9.98891 20.6937 11.9996 20.4957 13.8268 19.7388C15.6541 18.9819 17.2159 17.7002 18.3147 16.0557C19.4135 14.4112 20 12.4778 20 10.5C20 9.18678 19.7413 7.88642 19.2388 6.67317C18.7363 5.45991 17.9997 4.35752 17.0711 3.42893C16.1425 2.50035 15.0401 1.76375 13.8268 1.2612C12.6136 0.758658 11.3132 0.5 10 0.5ZM10 18.5C8.41775 18.5 6.87104 18.0308 5.55544 17.1518C4.23985 16.2727 3.21447 15.0233 2.60897 13.5615C2.00347 12.0997 1.84504 10.4911 2.15372 8.93928C2.4624 7.38743 3.22433 5.96197 4.34315 4.84315C5.46197 3.72433 6.88743 2.9624 8.43928 2.65372C9.99113 2.34504 11.5997 2.50346 13.0615 3.10896C14.5233 3.71447 15.7727 4.73984 16.6518 6.05544C17.5308 7.37103 18 8.91775 18 10.5C18 12.6217 17.1572 14.6566 15.6569 16.1569C14.1566 17.6571 12.1217 18.5 10 18.5Z"
              fill="#D1D5DB"
            />
          </svg>
        )}
        <p className={`${selected ? "green-text" : "black-text"} ml-1`}>
          {/* <i
            className={`ion-ios-radio-button-${selected ? "on" : "off"} mr-2`}
          ></i> */}

          {label}
        </p>
      </div>
    </div>
  );
};

export default CustomRadio;
