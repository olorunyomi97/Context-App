import React from 'react';
import { useParams } from "react-router-dom";
import OceanExportDocsUpload from './documentViewPartials/oceanExportDocsUpload';
import ExportHaulageDocsUpload from './documentViewPartials/exportHaulageDocsUpload';
import OceanImportUploadDocs from './documentViewPartials/oceanImportUploadDocs';
import ImportHaulageUploadDocs from './documentViewPartials/importHaulageUploadDocs';


const DocumentView = (props: any) => {
    const params = useParams();
    const { single_shipment } = props;
    const single_shipment_data = single_shipment?.data?.data?.shipment_data
    console.log(single_shipment_data)

    return (
        <div className=''>
            {
                single_shipment_data?.shipment_transport_type === 'ocean_freight' && single_shipment_data?.shipment_type === 'export' ? (
                    <>
                        <OceanExportDocsUpload
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : single_shipment_data?.shipment_transport_type === 'ocean_freight' && single_shipment_data?.shipment_type === 'import' ? (
                    <>
                        <OceanImportUploadDocs
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : single_shipment_data?.shipment_transport_type === 'haulage' && single_shipment_data?.shipment_type === 'export' ? (
                    <>
                        <ExportHaulageDocsUpload
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : single_shipment_data?.shipment_transport_type === 'haulage' && single_shipment_data?.shipment_type === 'import' ? (
                    <>
                        <ImportHaulageUploadDocs
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}


export default DocumentView