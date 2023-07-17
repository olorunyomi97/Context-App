import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import "react-datepicker/dist/react-datepicker.css";
import { getAllInvoices } from "store/actions";
import invoice from "assets/aside-logo/invoice.png"
import InvoiceIcon from "assets/icons/invoice.svg";
import OutlineButton from "components/buttons/OutlineButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Invoice = (props: any) => {
	const { invoices, loading } = props;
	console.log(invoices);
	const [openAside, SetOpenAside] = useState(false);
	const [filteredInvoices, setFilteredInvoices] = useState([]);

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		props.getAllInvoices();
	}, [getAllInvoices])

	useEffect(() => {
		setFilteredInvoices(invoices);
	}, [invoices]);

	return (
		<div className="flex">
			<Aside
				activeTab="invoice"
				openAside={openAside}
				SetOpenAside={SetOpenAside}
			/>
			<div className="">
				<TopBar title={"Invoice"} SetOpenAside={SetOpenAside} />
				<div className="dashboard-content lg:px-14 lg:pt-20 container mx-auto  w-full">
					<main className="px-4 pt-8 lg:pt-10 lg:px-10">
						<div className="flex flex-col justify-between md:flex-row md:items-center">
						</div>

						<div className="flex flex-col justify-center items-center h-[calc(99vh_-_152px)]">
							{/* <div className="mb-8"><img src={invoice} alt="" /></div> */}
							<img src={InvoiceIcon} alt="" width={100} height={100} className="mx-auto" />
							<p className="font-semibold text-2xl md:text-4xl black-text max-w-[545px] text-center">Hello, {admin_data?.firstname} {admin_data?.lastname}! We are working on invoices</p>
							<p className="text-lg md:text-xl mt-5 font-light max-w-[610px] text-center grey-text">Our team is hard at work developing useLocation. It's not available just yet, but you'll be the first to know when it's ready.</p>

							<div className="flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-16 items-center max-w-[610px] mt-12 md:border-[1px] md:border-solid md:border-{#e5e7eb} rounded py-2 md:pr-1 md:pl-4">
								<p className="grey-text-1 font-light">Head back to the dashboard</p>
								<OutlineButton title="Dashboard" style={{ color: "#3AB44A", border: "1px solid #3AB44A" }} onClick={() => navigate("/dashboard")} disabled={false} loading={false} icon={''} />
							</div>
						</div>
					</main>

				</div>
			</div>
		</div>
	);
};

// export default Invoice;

const mapStateToProps = (state: any) => {
	const { invoices, error, loading } = state.invoices;
	return { invoices, error, loading };
};

export default connect(mapStateToProps, { getAllInvoices })(Invoice);

