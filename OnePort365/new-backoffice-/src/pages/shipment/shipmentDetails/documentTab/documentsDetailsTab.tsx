import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import OceanExportDocs from "./documentPartials/oceanExportDocs";
import OceanImportDocs from "./documentPartials/oceanImportDocs";
import ExportHaulageDocs from "./documentPartials/exportHaulageDocs";
import ImportHaulageDocs from "./documentPartials/importHaulageDocs";

const DocumentsDetails = (props: any) => {
    const params = useParams();
    const { single_shipment } = props;
    const single_shipment_data = single_shipment?.data?.data?.shipment_data
    console.log(single_shipment_data)

    return (
        <div className="mobile-padding">
            {
                single_shipment_data?.shipment_transport_type === 'ocean_freight' && single_shipment_data?.shipment_type === 'export' ? (
                    <>
                        <OceanExportDocs
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : single_shipment_data?.shipment_transport_type === 'ocean_freight' && single_shipment_data?.shipment_type === 'import' ? (
                    <>
                        <OceanImportDocs
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : single_shipment_data?.shipment_transport_type === 'haulage' && single_shipment_data?.shipment_type === 'export' ? (
                    <>
                        <ExportHaulageDocs
                            single_shipment_data={single_shipment_data}
                        />
                    </>
                ) : single_shipment_data?.shipment_transport_type === 'haulage' && single_shipment_data?.shipment_type === 'import' ? (
                    <>
                        <ImportHaulageDocs
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

export default DocumentsDetails;