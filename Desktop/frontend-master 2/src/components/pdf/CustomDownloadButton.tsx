import React from "react";
import { Link } from "react-router-dom";

// icons
import downloadIcon from "assets/icons/download.svg";

const CustomDownloadButton = (props: any) => {
  const { url } = props;

  return (
    <>
      <Link to={url} target="_blank" className="ml-auto" download>
        <div className="solid-br py-2 px-4  rounded flex items-center cursor-pointer">
          <p className="text-sm black-text mr-2 font-semibold desktop-only">
            Download
          </p>
          <img src={downloadIcon} alt="" width={20} height={20} />
        </div>
      </Link>
    </>
  );
};

export default CustomDownloadButton;
