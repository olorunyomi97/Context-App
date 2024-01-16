import { useState } from "react";
import { Link } from "react-router-dom";

//icons
import upload from "assets/icons/upload.svg";
import documentGreen from "assets/icons/file.svg";
import deleteIcon from "assets/icons/delete.svg";
import DocumentUploadDrawer from "./DocumentUploadDrawer";

const ShipmentDocuments = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="">
        <div className="flex items-center mb-7">
          <p className="text-base grey-text font-semibold">Uploaded Documents</p>

          <div className="ml-auto">
            <Link to="#" className="bg-green white-text text-sm py-3 px-4 w-full rounded flex" onClick={() => setIsOpen(true)}>
              Upload Document{" "}
              <img src={upload} alt="" width={15} height={15} className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="">
          <div className="solid-br rounded py-5 px-5 flex items-center  ">
            <img src={documentGreen} alt="" width={30} height={30} className="bg-light-green p-2 mr-3 rounded-full" />
            <div className="">
              <p className="black-text font-semibold">NXP Form.pdf</p>
              <p className="grey-text text-sm">535kb</p>
            </div>

            <div className="ml-auto">
              <img src={deleteIcon} alt="" width={30} height={30} className="bg-light-red p-2 rounded-full" />
            </div>
          </div>

          <div className="solid-br rounded py-5 px-5 flex items-center  mt-5">
            <img src={documentGreen} alt="" width={30} height={30} className="bg-light-green p-2 mr-3 rounded-full" />
            <div className="">
              <p className="black-text font-semibold">PFI Form.pdf</p>
              <p className="grey-text text-sm">535kb</p>
            </div>

            <div className="ml-auto">
              <img src={deleteIcon} alt="" width={30} height={30} className="bg-light-red p-2 rounded-full" />
            </div>
          </div>
        </div>

        <DocumentUploadDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default ShipmentDocuments;
