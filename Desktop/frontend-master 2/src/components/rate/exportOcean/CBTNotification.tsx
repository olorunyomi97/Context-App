import React, { useState } from "react";

//icons
import info from "assets/icons/cbt-info.svg";
import close from "assets/icons/cbt-close.svg";

interface CBTProps {
  style?: any;
  haulage?: boolean;
  width?: string;
  text?: string;
  shipInfo?: boolean;
  isClosable?: boolean;
  containerInfo?: boolean
}

const CBTNotification = ({
  style,
  haulage = true,
  width,
  text,
  containerInfo = false,
  shipInfo = false,
  isClosable = true,
}: CBTProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(true);

  return (
    <>
      {showInfo && (
        <div
          className={`bg-[#4b83f026] rounded text-xs md:text-sm py-2 pl-4 pr-6 w-full xl:w-[${width}]`}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-1 md:flex-row md:space-x-2.5 md:items-center">
              <p className="flex items-center space-x-2.5 mt-1 md:self-start">
                <span>
                  <img src={info} alt="info" className="min-w-[14px]" />
                </span>
                <span className={`text-[#4B83F0] font-bold ${shipInfo ? "min-w-[94px]" : ""}`}>
                  {shipInfo ? "Please Note:-" : containerInfo ? "Note" : "Information"}
                </span>
              </p>
              <p className={`text-[#34373F] font-normal ${containerInfo ? "sato" : ""}`}>
                {text}
              </p>
            </div>
            {isClosable && (
              <div>
                <img
                  src={close}
                  alt="close"
                  className="w-3 cursor-pointer"
                  onClick={() => setShowInfo(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CBTNotification;
