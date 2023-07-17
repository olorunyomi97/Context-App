import { FileUploader } from "react-drag-drop-files";

//style
import "./index.css";

// icons
import fileIcon from "assets/icons/file.svg";
import deleteIcon from "assets/icons/delete.svg";

const fileTypes = ["PDF", "PNG", "JPG"];

console.log();

export default function CustomDocsDnD({
    handleChange,
    file,
    error,
    name,
    pdfOnly = true,
    defaultValue,
}: any) {
    // console.log('DND >>>', defaultValue);
    // console.log('Default DND >>>', defaultValue[0]?.document_name);
    return (
        <FileUploader
            handleChange={handleChange}
            name="file"
            types={pdfOnly ? [fileTypes[0]] : fileTypes}
            children={
                <>
                    <div className={`custom-dnd pl-5 pt-2 pb-2 items-center ${file || defaultValue ? "" : "justify-center flex-col "}`}>
                        {file || defaultValue.length > 0 ? (
                            <>
                                <div className="bg-light-green pl-2 pr-2rounded-full mr-3 inline-block">
                                    <img src={fileIcon} alt="" width={15} />
                                </div>
                                <div className="">
                                    <p className="text-sm black-text font-semibold">
                                        {file.name || defaultValue[0]?.document_name}
                                    </p>

                                    <p className="text-xs grey-text mt-2">
                                        {file.size ? `${file.size}kb - ` : ""} 100% uploaded{" "}
                                    </p>
                                </div>
                                <div
                                    className="bg-light-red p-2 rounded-full ml-auto cursor-pointer inline-block"
                                // onClick={() => handleChange("")}
                                >
                                    <img src={deleteIcon} alt="" width={15} />
                                </div>
                            </>
                        ) : (
                            <>
                                <svg
                                    width="24"
                                    height="30"
                                    viewBox="0 0 24 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.77778 16.4444H16.4444M12.1111 12.1111L12.1111 20.7778M19.3333 28H4.88889C3.2934 28 2 26.7066 2 25.1111V4.88889C2 3.2934 3.2934 2 4.88889 2H12.9572C13.3403 2 13.7077 2.15218 13.9786 2.42307L21.7992 10.2436C22.07 10.5145 22.2222 10.8819 22.2222 11.265V25.1111C22.2222 26.7066 20.9288 28 19.3333 28Z"
                                        stroke="#3AB44A"
                                        stroke-width="2.67"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>

                                <p className="text-sm black-text mt-2 text-sm">
                                    <span className="green-text ">Click to upload a file</span> or
                                    drag and drop
                                </p>

                                <p className="text-xs mt-1 grey-text">
                                    {/* {pdfOnly
                                        ? fileTypes[0]
                                        : `${fileTypes[0]}, ${fileTypes[1]}, ${fileTypes[2]}`}{" "} */}
                                    PDF, PNG, JPG upto 5mb
                                </p>
                            </>
                        )}
                    </div>
                    {error ? (
                        <>
                            <p className="mt-2 error-text">{name} is required</p>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            }
        />
    );
}
