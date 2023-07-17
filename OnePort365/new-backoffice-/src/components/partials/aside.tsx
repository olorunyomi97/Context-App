import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import onePortLogo from "assets/images/oneport-logo.png";
import NewOnePortLogo from "assets/logos/new-logo.png";
import Dashboard from "assets/aside-logo/dashboard.png";
import Admin from "assets/aside-logo/admin.png";
import Customer from "assets/aside-logo/customer.png";
import Invoice from "assets/aside-logo/invoice.png";
import Shipment from "assets/aside-logo/shipment.png";
import Containers from "assets/aside-logo/container.png";
import Quote from "assets/aside-logo/quote-request.png";
import Booking from "assets/aside-logo/booking.png";
import Settings from "assets/aside-logo/settings.png";
import Logout from "assets/aside-logo/poweroff.png";
import "./index.css";
import LogoutModal from "components/partials/logoutModal";
import { logoutUser } from "store/actions";

const Aside = (props: any): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const { activeTab, openAside, SetOpenAside } = props;
	let admin_data = useSelector((state: any) => state.auth.admin_data);
	//   @ts-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data"));
	// ? JSON.parse(localStorage.getItem("admin_data"))
	// : JSON.parse(localStorage.getItem("admin_data"));

	return (
		<>
			{/* Desktop Aside */}
			<div className="dashboard-aside flex flex-col right-divider desktop-only">
				<div className="px-5">
					<div className="py-5">
						<Link to="/dashboard">
							<img
								alt=""
								src={NewOnePortLogo}
								className="w-18 h-10 desktop-only"
							/>
						</Link>
					</div>

					<div className="py-5">
						<div className="pl-3 flex items-center mb-3">
							<div className="flex items-center">
								<p className="navigation-menu-text">MENU</p>
							</div>
						</div>

						<NavLink to="/dashboard" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Dashboard} width="60%" height="50%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Dashboard</p>
									</div>
								</div>
							)}
						</NavLink>

						{/* Adnin */}

						{admin_data.role == "super_admin" ? (
							<>
								<NavLink to="/admins" style={{ textDecoration: "none" }}>
									{({ isActive }) => (
										<div
											className={
												isActive
													? "flex items-center mb-3 pb-2 border-b-2 solid-break"
													: "flex items-center mb-3"
											}
										>
											<p className="pl-3">
												<img src={Admin} width="60%" height="60%" />
											</p>
											<div className="flex items-center ">
												<p className="navigation-text">Admin</p>
											</div>
										</div>
									)}
								</NavLink>
							</>
						) : (
							<></>
						)}

						{/* Admin */}

						{/* Shipping */}

						<NavLink to="/customers" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Customer} width="60%" height="50%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Customers</p>
									</div>
								</div>
							)}
						</NavLink>

						<NavLink to="/bookings" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Booking} width="60%" height="60%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Bookings</p>
									</div>
								</div>
							)}
						</NavLink>

						<NavLink
							to="/shipments"
							style={{ textDecoration: "none" }}
						>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Shipment} width="60%" height="60%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Shipments</p>
									</div>
								</div>
							)}
						</NavLink>



						{/* <NavLink to="/new-quotes" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-5 pb-2 border-b-2 solid-break"
											: "flex items-center mb-5"
									}
								>
									<p className="pl-3">
										<img src={Quote} width="60%" height="60%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Quotes</p>
									</div>
								</div>
							)}
						</NavLink> */}

						<NavLink to="/containers" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Containers} width="60%" height="60%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Containers</p>
									</div>
								</div>
							)}
						</NavLink>

						<NavLink to="/invoices" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Invoice} width="60%" height="50%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Invoices</p>
									</div>
								</div>
							)}
						</NavLink>

						<NavLink to="/loan-applications" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Invoice} width="60%" height="50%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Loan Applications</p>
									</div>
								</div>
							)}
						</NavLink>

						{/* payment */}


					</div>
				</div>

				<div className="mb-3 px-4 absolute bottom-0 w-3/12">
					<div className="flex items-center">
						<NavLink to="/settings" style={{ textDecoration: "none" }}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "flex items-center mb-3 pb-2 border-b-2 solid-break"
											: "flex items-center mb-3"
									}
								>
									<p className="pl-3">
										<img src={Settings} width="55%" height="50%" />
									</p>
									<div className="flex items-center ">
										<p className="navigation-text">Settings</p>
									</div>
								</div>
							)}
						</NavLink>
					</div>
					<div className="flex items-center">
						<Link
							to="#"
							onClick={() => {
								setIsOpen(true);
								// window.localStorage.removeItem('token')
							}}
							style={{ textDecoration: "none" }}
						>
							<div className="flex items-center mb-5">
								<p className="pl-3">
									<img src={Logout} width="60%" height="50%" />
								</p>
								<div className="flex items-center ">
									<p className="navigation-text">Logout</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<LogoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
			{/* Desktop Aside */}

			{/* Mobile Aside */}
			{openAside ? (
				<>
					<SlidingPane
						className="custom-slider sliding-aside"
						overlayClassName="some-custom-overlay-class"
						isOpen={openAside}
						from="left"
						hideHeader={true}
						width="50%"
						shouldCloseOnEsc={true}
						onRequestClose={() => {
							// triggered on "<" on left top click or on outside click
							SetOpenAside(false);
						}}
					>
						<div
							className=""
						// style={{
						//     background: '#286a3a'
						// }}
						>
							<div className="flex">
								<i
									className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer ml-auto"
									onClick={() => SetOpenAside(false)}
								></i>
							</div>

							<div className="pl-3 flex items-center mb-5">
								<div className="flex items-center">
									<p className="navigation-menu-text">MENU</p>
								</div>
							</div>

							<NavLink to="/dashboard" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Dashboard} width="60%" height="50%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Dashboard</p>
										</div>
									</div>
								)}
							</NavLink>

							{/* Adnin */}

							{admin_data.role == "super_admin" ? (
								<>
									<NavLink to="/admins" style={{ textDecoration: "none" }}>
										{({ isActive }) => (
											<div
												className={
													isActive
														? "flex items-center mb-10 border-b-2 solid-break pb-2"
														: "flex items-center mb-10"
												}
											>
												<p className="pl-3">
													<img src={Admin} width="60%" height="60%" />
												</p>
												<div className="flex items-center ">
													<p className="navigation-text">Admin</p>
												</div>
											</div>
										)}
									</NavLink>
								</>
							) : (
								<></>
							)}

							<NavLink to="/customers" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Customer} width="60%" height="50%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Customers</p>
										</div>
									</div>
								)}
							</NavLink>

							<NavLink to="/shipments" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Shipment} width="60%" height="60%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Shipments</p>
										</div>
									</div>
								)}
							</NavLink>

							<NavLink to="/bookings" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-5 pb-2 border-b-2 solid-break"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Booking} width="60%" height="60%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Bookings</p>
										</div>
									</div>
								)}
							</NavLink>

							<NavLink to="/containers" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Containers} width="60%" height="60%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Containers</p>
										</div>
									</div>
								)}
							</NavLink>

							<NavLink to="/invoices" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Invoice} width="60%" height="50%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Invoices</p>
										</div>
									</div>
								)}
							</NavLink>

							<NavLink
								to="/loan-applications"
								style={{ textDecoration: "none" }}
							>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Invoice} width="60%" height="50%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Loan Applications</p>
										</div>
									</div>
								)}
							</NavLink>

							{/* payment */}

							<NavLink to="/settings" style={{ textDecoration: "none" }}>
								{({ isActive }) => (
									<div
										className={
											isActive
												? "flex items-center mb-10 border-b-2 solid-break pb-2"
												: "flex items-center mb-10"
										}
									>
										<p className="pl-3">
											<img src={Settings} width="60%" height="50%" />
										</p>
										<div className="flex items-center ">
											<p className="navigation-text">Settings</p>
										</div>
									</div>
								)}
							</NavLink>

							{/* <div className="px-2">
                            <div className="pt-14">
                                <Link to="/dashboard">
                                    <div className="flex items-center tab-item py-4">
                                    {activeTab === "dashboard" ? (
                                        <DashboardIconActive width="2rem" height="2rem" />
                                    ) : (
                                        <DashboardIcon width="2.5rem" height="2.5rem" />
                                    )}

                                    <p
                                        className={`${
                                        activeTab === "dashboard"
                                            ? "ml-5 font-semibold"
                                            : "ml-3"
                                        } text-sm black-text`}
                                    >
                                        Dashboard
                                    </p>
                                    </div>
                                </Link>

                                {
                                    admin_data.role == "super_admin" ? (
                                        <Link to="/admins">
                                        <div className="flex items-center tab-item py-4">
                                            {activeTab === "admin" ? (
                                                <AdminIconActive width="2rem" height="2rem" />
                                            ) : (
                                                <AdminIcon
                                                width="1rem"
                                                height="2rem"
                                                className="ml-3"
                                                />
                                            )}
        
                                            <p
                                                className={`${
                                                activeTab === "quote" ? "ml-5 font-semibold" : "ml-6"
                                                } text-sm black-text`}
                                            >
                                                Admins
                                            </p>
                                        </div>
                                    </Link>
                                    ) : (
                                        <></>
                                    )
                                }

                                <Link to="/customers">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "customer" ? (
                                            <CustomerIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <CustomerIcon
                                            width="1rem"
                                            height="2rem"
                                            className="ml-3"
                                            />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "quote" ? "ml-5 font-semibold" : "ml-6"
                                            } text-sm black-text`}
                                        >
                                            Customers
                                        </p>
                                    </div>
                                </Link>


                                <Link to="/quotes">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "quote" ? (
                                            <QuoteIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <QuoteIcon
                                            width="1rem"
                                            height="2rem"
                                            className="ml-3"
                                            />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "quote" ? "ml-5 font-semibold" : "ml-6"
                                            } text-sm black-text`}
                                        >
                                            Quotes
                                        </p>
                                    </div>
                                </Link>

                                <Link to="/invoices">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "invoice" ? (
                                            <InvoiceIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <InvoiceIcon
                                            width="1rem"
                                            height="2rem"
                                            className="ml-3"
                                            />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "invoice"
                                                ? "ml-5 font-semibold"
                                                : "ml-6"
                                            } text-sm black-text`}
                                        >
                                            Invoices
                                        </p>
                                    </div>
                                </Link>

                                <Link to="/documents">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "document" ? (
                                            <ShipmentIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <DocumentIcon width="2.5rem" height="2.5rem" />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "document"
                                                ? "ml-5 font-semibold"
                                                : "ml-3"
                                            } text-sm black-text`}
                                        >
                                            Documents
                                        </p>
                                    </div>
                                </Link>


                                <Link to="/shipments">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "shipment" ? (
                                            <ShipmentIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <ShipmentIcon width="2.5rem" height="2.5rem" />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "shipment"
                                                ? "ml-5 font-semibold"
                                                : "ml-3"
                                            } text-sm black-text`}
                                        >
                                            Shipments
                                        </p>
                                    </div>
                                </Link>

                                <Link to="/shipment-tracking">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "tracking" ? (
                                            <TrackingIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <TrackingIcon
                                            width="1rem"
                                            height="2rem"
                                            className="ml-3"
                                            />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "invoice"
                                                ? "ml-5 font-semibold"
                                                : "ml-6"
                                            } text-sm black-text`}
                                        >
                                            Tracking
                                        </p>
                                    </div>
                                </Link>

                                <Link to="/contacts">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "contact" ? (
                                            <DocumentIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <DocumentIcon width="2.5rem" height="2.5rem" />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "document"
                                                ? "ml-5 font-semibold"
                                                : "ml-3"
                                            } text-sm black-text`}
                                        >
                                            Contacts
                                        </p>
                                    </div>
                                </Link>
                                <Link to="/settings">
                                    <div className="flex items-center tab-item py-4">
                                        {activeTab === "setting" ? (
                                            <SettingIconActive width="2rem" height="2rem" />
                                        ) : (
                                            <SettingIcon width="2.5rem" height="2.5rem" />
                                        )}

                                        <p
                                            className={`${
                                            activeTab === "setting"
                                                ? "ml-5 font-semibold"
                                                : "ml-3"
                                            } text-sm black-text`}
                                        >
                                            Settings
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex items-center py-5 pl-4">
                                <LogoutIcon width="1.1rem" height="1.1rem"/>
                                <Link 
                                    to=""
                                    onClick={()=>{
                                        setIsOpen(true)
                                    }}
                                    className={`ml-3 text-sm black-text `}
                                >   
                                    Logout
                                </Link>
                            </div>
                        </div> */}
						</div>
					</SlidingPane>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default connect(null, { logoutUser })(Aside);
