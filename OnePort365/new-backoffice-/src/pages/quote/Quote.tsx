import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomTabs from "components/customTabs/CustomTabs";
import NewCustomTabs from "components/customTabs/NewCustomTabs";
import PendingAdminAction from "./partials/pendingAdminActionTab/pendingAdminAction";
import PendingCustomerAction from "./partials/pendingCustomerActionTab/pendingCustomerAction";
import AcceptedQuotes from "./partials/acceptedQuotesTab/acceptedQuotes";
import MyQuotes from "./partials/myQuotesTab/myQuotes";
import MyCreatedQuotes from "./partials/myCreatedQuotes/myCreatedQuotes";
import RejectedQuotes from "./partials/rejectedQuotesTab/rejectedQuotes";
import AllQuotes from "./partials/allQuotes/allQuotes";
import QuoteFilter from "./partials/QuotesFilter/filter";
import SearchFilter from "./partials/QuotesSearch/search";
import { useSelector } from "react-redux";


const Quote = () => {
	let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	const role = (admin_data.role)
	console.log(role);

    const params = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
	const tab_section = urlParams.get("tab_section");
	

	const [openAside, SetOpenAside] = useState(false);
	const [quotes, setQuotes] = useState([1, 2]);
	const [tab, setTab] = useState(role === "super_admin" ? "All" : "My Quotes");
	

	const tab_result = [
		role === "super_admin" ? "All" : <div style={{color: 'white'}}>`</div>,
		"My Quotes", 
		"Created",
		"Pending Admin" ,  
		"Pending Customer", 
		"Accepted", 
		// "Rejected Quotes"
	]
  

  return (
    <div className="flex">
		<Aside activeTab="quote"
			openAside={openAside}
			SetOpenAside={SetOpenAside}
		/>
		<div className="dashboard-content">
			<TopBar title={"Quotes"} SetOpenAside={SetOpenAside}/>
			<div className="">
				<div className="lg:px-14 lg:pt-20 container mx-auto  w-full">
				{quotes.length ? (
					<>
						{/* <div className='grid grid-cols-1 gap-4'>
							<div className="col-span-2 mb-3">
								<QuoteFilter/>
							</div>
							<div className="col-span-2 mb-3">
								<SearchFilter/>
							</div>
						</div> */}
						<div className="mb-5 rounded-full flex ml-auto">
							<div className="">
								<QuoteFilter/>
							</div>
						</div>
						
						<NewCustomTabs 
						tabs={
							tab_result 
						} activeTab={tab} setActiveTab={setTab} />
						{	
							
							admin_data.role === "super_admin" && tab === "All"  ? (
								<AllQuotes />
							) : tab === "Pending Admin" ? (
								<PendingAdminAction />
							) : tab === "Pending Customer" ? (
								<PendingCustomerAction  />
							): tab === "Accepted" ? (
								<AcceptedQuotes />
							): tab === "My Quotes" ? ( 
								<MyQuotes  />
							) : tab === "Created" ? (
								<MyCreatedQuotes />
							) : (
								< RejectedQuotes/>
							)
						}
						{/* {	
							tab === "Pending Admin Action" ? (
								<PendingAdminAction />
							) : tab === "Pending Customer Action" ? (
								<PendingCustomerAction  />
							): tab === "Accepted Quotes" ? (
								<AcceptedQuotes />
							):( 
								<MyQuotes  />
							)
						} */}

						{/* {	
							tab === "Pending Admin Action" ? (
								<PendingAdminAction />
							) : tab === "my Quotes" ? (
								<MyQuotes  />
							): tab === "Pending Customer Action" ? (
								<PendingCustomerAction />
							):( 
								<AcceptedQuotes  />
							)
						} */}
					</>
				) : (
					<>
					</>
				)}
				</div>
			</div>
		</div>

    </div>
  );
};

export default Quote;
