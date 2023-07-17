import { useState } from "react";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomTabs from "components/customTabs/CustomTabs";
import RequestCallback from "./contactPartials/requestCallback";
import LeaveMessage from "./contactPartials/leaveMessage";
import ClosedMessages from "./contactPartials/closedMessages";

const Contact = () => {
    const [contacts, setContacts] = useState([1, 2]);
    const [tab, setTab] = useState("Contacts leaving a message");
	const [openAside, SetOpenAside] = useState(false);

    return (
        <div className="flex">
		<Aside 
			activeTab="contacts" 
			openAside={openAside}
			SetOpenAside={SetOpenAside}
		/>
		<div className="">
			<TopBar title={"Contacts"} SetOpenAside={SetOpenAside}/>
			<div className="dashboard-content">
				<div className="px-14 pt-20 container mx-auto  w-full">
				{contacts.length ? (
					<>
						<CustomTabs tabs={["Contacts leaving a message" ,  "Contacts requesting a callback", "Closed Messages" ]} activeTab={tab} setActiveTab={setTab} />
						{	
							tab === "Contacts leaving a message" ? (
                                <LeaveMessage  />
								
							) : tab === "Contacts requesting a callback" ? (
								<RequestCallback />
							) : (
								<ClosedMessages />
							)
						}

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
    )
}

export default Contact