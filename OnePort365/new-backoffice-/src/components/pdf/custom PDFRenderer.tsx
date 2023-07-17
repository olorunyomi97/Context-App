import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const CustomPDFRenderer = (props: any) => {
    //react pdf worker
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const { url } = props;

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    return (
        <>
            <div className="mt-5 bg-grey rounded p-4">
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
        </>
    );
};

export default CustomPDFRenderer;
