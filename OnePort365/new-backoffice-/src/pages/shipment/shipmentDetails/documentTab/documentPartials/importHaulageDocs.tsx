import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomDnD from "components/customDnD/CustomDnD";
import CustomDocsDnD from "components/customDocsDnD/customDocsDnd";
import { getSingleShipment, uploadShipmentDocs } from "store/actions";

const ImportHaulageDocs = (props: any) => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm();
    const { single_shipment_data, loading } = props;
    const params = useParams();

    const [proforma, setProforma] = useState("");
    const [proformaError, setProformaError] = useState(false);

    const [productCertificate, setProductCertificate] = useState("");
    const [productCertificateError, setProductCertificateError] = useState(false);

    const [marineInsuranceCertificate, setMarineInsuranceCertificate] = useState("");
    const [marineInsuranceCertificateError, setMarineInsuranceCertificateError] = useState(false);

    const [formM, setFormM] = useState("");
    const [formMError, setFormMError] = useState(false);

    const [bl, setbL] = useState("");
    const [blError, setBlError] = useState(false);

    const [commercialInvoiceFile, setCommercialInvoiceFile] = useState("");
    const [commercialInvoiceError, setCommercialInvoiceError] = useState(false);

    const [packingList, setPackingList] = useState("");
    const [packingListError, setPackingListError] = useState(false);

    const [combinedCertificate, setCombinedCertificate] = useState("");
    const [combinedCertificateError, setCombinedCertificateError] = useState(false);

    const [paar, setPaar] = useState("");
    const [paarError, setPaarError] = useState(false);

    const [hsCode, setHsCode] = useState("");
    const [hsCodeError, setHsCodeError] = useState(false);

    const [regulatoryPermit, setRegulatoryPermit] = useState("");
    const [regulatoryPermitError, setRegulatoryPermitError] = useState(false);

    useEffect(() => {
        props.getSingleShipment(params.id)
    }, [])

    const uploadDoc = (name, doc) => {
        const formData = new FormData();
        formData.append("shipment_file", doc);
        formData.append("document_name", name);

        const newData = {
            id: params.id,
            data: formData,
            document_name: name,
        };
        console.log(newData);
        console.log(doc)
        console.log('document_name >>>', name);
        props.uploadShipmentDocs(newData, null)
    };

    const onSubmit = () => {
        // updateDataSheetAside();
    };

    return (
        <div>
            {
                loading ? (
                    <div className="text-center my-3 ml-5">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            <PrimaryButton title="Loading" loading={loading} />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p className="text-lg black-text font-semibold mb-0">Upload Necessary Documents</p>
                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Proforma Invoice
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('proforma_invoice', doc)}
                                            file={proforma}
                                            error={proformaError}
                                            name={"proforma_invoice"}
                                            id={"proforma_invoice"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[0]?.document_name === 'proforma_invoice' ? 'proforma_invoice' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'proforma_invoice' ? 'proforma_invoice' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Product Certification
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('product_certification', doc)}
                                            file={productCertificate}
                                            error={productCertificateError}
                                            name={"product_certification"}
                                            id={"product_certification"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[1]?.document_name === 'product_certification' ? 'product_certification' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'product_certification' ? 'product_certification' : '')}
                                        />
                                    </div>
                                </div>



                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Marine Insurance Certificate
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('marine_insurance_certificate', doc)}
                                            file={marineInsuranceCertificate}
                                            error={marineInsuranceCertificateError}
                                            name={"marine_insurance_certificate"}
                                            id={"marine_insurance_certificate"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[2]?.document_name === 'marine_insurance_certificate' ? 'marine_insurance_certificate' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'marine_insurance_certificate' ? 'marine_insurance_certificate' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Form M
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('form_m', doc)}
                                            file={formM}
                                            error={formMError}
                                            name={"form_m"}
                                            id={"form_m"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[3]?.document_name === 'form_m' ? 'form_m' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'form_m' ? 'form_m' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Bill of Lading
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('bill_of_lading', doc)}
                                            file={bl}
                                            error={blError}
                                            name={"bill_of_lading"}
                                            id={"bill_of_lading"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[4]?.document_name === 'bill_of_lading' ? 'bill_of_lading' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'bill_of_lading' ? 'bill_of_lading' : '')}
                                        />
                                    </div>
                                </div>



                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Commercial Invoice (include NXP number)
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('commercial_invoice', doc)}
                                            file={commercialInvoiceFile}
                                            error={commercialInvoiceError}
                                            name={"commercial_invoice"}
                                            id={"commercial_invoice"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[5]?.document_name === 'commercial_invoice' ? 'commercial_invoice' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'commercial_invoice' ? 'commercial_invoice' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Packing List
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('packing_list', doc)}
                                            file={packingList}
                                            error={packingListError}
                                            name={"packing_list"}
                                            id={"packing_list"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[6]?.document_name === 'packing_list' ? 'packing_list' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'packing_list' ? 'packing_list' : '')}
                                        />
                                    </div>
                                </div>



                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Combined Certificate of Value And Origin
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('combined_certificate_of_origin', doc)}
                                            file={combinedCertificate}
                                            error={combinedCertificateError}
                                            name={"combined_certificate_of_origin"}
                                            id={"combined_certificate_of_origin"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[7]?.document_name === 'combined_certificate_of_origin' ? 'combined_certificate_of_origin' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'combined_certificate_of_origin' ? 'combined_certificate_of_origin' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        PAAR (Pre Arrival Assessment Report)
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('paar', doc)}
                                            file={paar}
                                            error={paarError}
                                            name={"paar"}
                                            id={"paar"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[8]?.document_name === 'paar' ? 'paar' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'paar' ? 'paar' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        HS Code
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('hs_code', doc)}
                                            file={hsCode}
                                            error={hsCodeError}
                                            name={"hs_code"}
                                            id={"hs_code"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[9]?.document_name === 'hs_code' ? 'hs_code' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'hs_code' ? 'hs_code' : '')}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-xs font-medium black-text">
                                        Regulatory Permit
                                    </label>
                                    <div className="mt-1">
                                        <CustomDocsDnD
                                            handleChange={(doc) => uploadDoc('regulatory_permit', doc)}
                                            file={regulatoryPermit}
                                            error={regulatoryPermitError}
                                            name={"regulatory_permit"}
                                            id={"regulatory_permit"}
                                            onClick={onSubmit}
                                            pdfOnly={false}
                                            // defaultValue={single_shipment_data?.document_details[10]?.document_name === 'regulatory_permit' ? 'regulatory_permit' : ''}
                                            defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'regulatory_permit' ? 'regulatory_permit' : '')}
                                        />
                                    </div>
                                </div>


                                {/* <div className="grid grid-cols-3 mt-10 items-center ">
                                    <div className=""></div>
                                    <div className=" mx-auto"></div>
                                    <div className="">
                                        @ts-ignore
                                        <PrimaryButton title="Submit" loading={loading} />
                                    </div>
                                </div> */}

                            </form>
                        </div>
                    </>
                )
            }
        </div>
    )
}

// export default ImportHaulageDocs 

const mapStateToProps = (state: any) => {
    const { loading } = state.shipments;
    return { loading };
};
export default connect(mapStateToProps, { getSingleShipment, uploadShipmentDocs })(ImportHaulageDocs);
