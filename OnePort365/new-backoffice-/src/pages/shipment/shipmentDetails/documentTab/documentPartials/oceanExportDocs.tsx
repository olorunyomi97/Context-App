import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomDocsDnD from "components/customDocsDnD/customDocsDnd";
import { getSingleShipment, uploadShipmentDocs } from "store/actions";

const OceanExportDocs = (props: any) => {
	const { handleSubmit, control, reset, formState: { errors } } = useForm();
	const { loading, single_shipment_data } = props;
	const params = useParams();

	const [nxpFile, setNxpFile] = useState("");
	const [nxpError, setNxpError] = useState(false);

	const [proforma, setProforma] = useState("");
	const [proformaError, setProformaError] = useState(false);

	const [shippingDatasheet, setShippingDatasheet] = useState("");
	const [shippingDatasheetError, setShippingDatasheetError] = useState(false);

	const [packingList, setPackingList] = useState("");
	const [packingListError, setPackingListError] = useState(false);

	const [commercialInvoiceFile, setCommercialInvoiceFile] = useState("");
	const [commercialInvoiceError, setCommercialInvoiceError] = useState(false);

	const [cciFile, setCciFile] = useState("");
	const [cciError, setCciError] = useState(false);

	const [sgdFile, setSgdFile] = useState("");
	const [sgdError, setSgdError] = useState(false);

	const [customExportClearance, setCustomExportClearance] = useState("");
	const [customExportClearanceError, setCustomExportClearanceError] = useState(false);

	const [oblFile, setOblFile] = useState("");
	const [oblError, setOblError] = useState(false);

	const [postShipmentDocs, setPostShipmentDocs] = useState("");
	const [postShipmentDocsError, setPostShipmentDocsError] = useState(false);


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
			{loading ? (
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
									Approved NXP Form
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('nxp_document', doc)}
										file={nxpFile}
										error={nxpError}
										name={"nxp_document"}
										id={"nxp_document"}
										pdfOnly={false}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'nxp_document' ? 'nxp_document' : '')}
									/>
								</div>
							</div>

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
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'proforma_invoice' ? 'proforma_invoice' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'proforma_invoice' ? 'proforma_invoice' : '')}
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="text-xs font-medium black-text">
									Shipping Datasheet
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('shipping_datasheet', doc)}
										file={shippingDatasheet}
										error={shippingDatasheetError}
										name={"shipping_datasheet"}
										id={"shipping_datasheet"}
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'shipping_datasheet' ? 'shipping_datasheet' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'shipping_datasheet' ? 'shipping_datasheet' : '')}
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
										pdfOnly={false}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'packing_list' ? 'packing_list' : false)}
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
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'commercial_invoice' ? 'commercial_invoice' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'commercial_invoice' ? 'commercial_invoice' : false)}
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="text-xs font-medium black-text">
									CCI Clean Certificate of inspection
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('cci', doc)}
										file={cciFile}
										error={cciError}
										name={"cci"}
										id={"cci"}
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'cci' ? 'cci' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'cci' ? 'cci' : '')}
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="text-xs font-medium black-text">
									SGD And Inspection Act
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('sgd', doc)}
										file={sgdFile}
										error={sgdError}
										name={"sgd"}
										id={"sgd"}
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'sgd' ? 'sgd' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'sgd' ? 'sgd' : '')}
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="text-xs font-medium black-text">
									Custom Export Clearance
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('custom_export_clearance', doc)}
										file={customExportClearance}
										error={customExportClearanceError}
										name={"custom_export_clearance"}
										id={"custom_export_clearance"}
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'custom_export_clearance' ? 'custom_export_clearance' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'custom_export_clearance' ? 'custom_export_clearance' : '')}
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="text-xs font-medium black-text">
									OBL / SEAWAY BILL / TELEX
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('obl', doc)}
										file={oblFile}
										error={oblError}
										name={"obl"}
										id={"obl"}
										pdfOnly={false}
										// defaultValue={single_shipment_data?.document_details?.document_name === 'obl' ? 'obl' : ''}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'obl' ? 'obl' : '')}
									/>
								</div>
							</div>

							<div className="mb-3">
								<label className="text-xs font-medium black-text">
									Post Shipment Documents
								</label>
								<div className="mt-1">
									<CustomDocsDnD
										handleChange={(doc) => uploadDoc('post_shipment_docs', doc)}
										file={postShipmentDocs}
										error={postShipmentDocsError}
										name={"post_shipment_docs"}
										id={"post_shipment_docs"}
										pdfOnly={false}
										defaultValue={single_shipment_data?.document_details?.filter((item: any) => item?.document_name === 'post_shipment_docs' ? 'post_shipment_docs' : '')}
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
			)}
		</div>
	);
};

// export default OceanExportDocs
const mapStateToProps = (state: any) => {
	const { loading } = state.shipments;
	return { loading };
};
export default connect(mapStateToProps, { getSingleShipment, uploadShipmentDocs })(OceanExportDocs);
