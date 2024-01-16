import React from "react";
import { connect } from "react-redux";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

//redux
import { useSelector } from "react-redux";

//icons
import cross from "assets/icons/cross.svg";
import tray from "assets/icons/tray.svg";
import search from "assets/icons/search.svg";
import arrowL from "assets/icons/arrow-left2.svg";
import norate from "assets/icons/norate.svg";
import dot from "assets/icons/vertical-dot.svg";

//components
import Layout from "components/layout/Layout";
import TeamTable from "components/team/TeamTable";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import InviteTeamModal from "components/team/InviteTeamModal";
import DeactivateTeamModal from "components/team/DeactivateTeamModal";
import LoadingSpinner from "components/partials/LoadingSpinner";

//actions
import { getTeammates } from "store/actions";
import PageLoading from "components/partials/pageLoading";

const NoTeamMember = () => (
  <>
    <div>
      <img src={norate} alt="" className="" />
    </div>
    <div className="mt-10">
      <p className="text-xl grey-text text-center">No Team Members Yet</p>
      <p className="text-sm grey-text-1 max-w-[320px] text-center">
        You haven’t added any member to your team. Click the button to add new
        members
      </p>
    </div>
  </>
);

const MobileActions = ({
  setEditTeamMember,
  isChosen,
  setShowDeactivateTeam,
}) => (
  <div className="w-36 bg-white rounded-lg px-1 py-1 shadow-lg">
    <p
      className="text-sm py-2 black-text-3 text-center cursor-pointer hover:bg-gray-100 rounded"
      onClick={() => setEditTeamMember(true)}
    >
      Edit Details
    </p>
    <p
      className="text-sm py-2 black-text-3 text-center cursor-pointer hover:bg-gray-100 rounded"
      onClick={() => setShowDeactivateTeam(true)}
    >
      Deactivate
    </p>
  </div>
);

const MobileTeamMember = ({
  showMobileActions,
  setShowMobileActions,
  setEditTeamMember,
  item,
  setUserInfo,
  setIsChosen,
  isChosen,
  actionref,
  setShowDeactivateTeam,
  user,
}) => (
  <div className="solid-br rounded p-6 grid grid-cols-2 gap-y-6 gap-x-2">
    <div>
      <p className="grey-text text-sm font-light mb-1.5">First Name</p>
      <p className="black-text text-sm capitalize">{item.firstname}</p>
    </div>
    <div className="flex justify-between relative">
      <div>
        <p className="grey-text text-sm font-light mb-1.5">Last Name</p>
        <p className="black-text text-sm capitalize">{item.lastname}</p>
      </div>
      {item.firstname.toLowerCase() !== user.firstname.toLowerCase() ? (
        <p
          onClick={() => {
            setShowMobileActions(true);
            setUserInfo(item);
            setIsChosen((prev) => ({
              ...prev,
              [item._id]: true,
            }));
          }}
        >
          <img className="cursor-pointer" src={dot} alt="" />
        </p>
      ) : (
        <></>
      )}
      {isChosen[item?._id] && (
        <div ref={actionref} className="absolute right-0 top-6">
          <MobileActions
            isChosen={isChosen}
            setEditTeamMember={setEditTeamMember}
            setShowDeactivateTeam={setShowDeactivateTeam}
          />
        </div>
      )}
    </div>
    <div>
      <p className="grey-text text-sm font-light mb-1.5">Email</p>
      <p className="black-text text-sm break-words">{item.email}</p>
    </div>
    <div>
      <p className="grey-text text-sm font-light mb-1.5">Phone number</p>
      <p className="black-text text-sm capitalize">{item.phone}</p>
    </div>
    <div>
      <p className="grey-text text-sm font-light mb-1.5">Role</p>
      <p className="black-text text-sm capitalize">
        {item.is_member && <span className="capitalize">Team member</span>}
        {item.is_owner && <span className="capitalize">Admin</span>}
      </p>
    </div>
  </div>
);

const Team = (props) => {
  const actionref = useRef<HTMLDivElement>(null); //new shipment button ref
  const scrollref = useRef<HTMLDivElement>(null); //scroll ref

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const {
    error,
    loading,
    my_teammates,
    total_teammates,
    getTeammates,
    table_loading,
  } = props;
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParams.get("s");

  // usestate for serverside pagination
  const [page, setPage] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(10);

  //new shipment state
  const [showShipment, setShowShipment] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);

  const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });

  const [filteredTeammates, setFilteredTeammates] = useState<any>([]);

  //page loading
  const [pageLoading, setPageLoading] = useState(false);

  const [inviteTeamMember, setInviteTeamMember] = useState(false);
  const [editTeamMember, setEditTeamMember] = useState(false);
  const [showDeactivateTeam, setShowDeactivateTeam] = useState(false);

  const [isChosen, setIsChosen] = useState<object>({});
  const [userInfo, setUserInfo] = useState({});

  // fetch a particular teammates  with the url values
  const fetchTeammates = () => {
    const filter_string = new URLSearchParams(filterObject).toString();
    setPageLoading(true);
    getTeammates({
      filter_string: filter_string,
      job: query,
    });
  };

  const closeModal = () => {
    setInviteTeamMember(false);
    setEditTeamMember(false);
    setShowDeactivateTeam(false);
  };

  // handle page change
  const handlePageChange = (page) => {
    setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
    // fetchShipment();
  };

  // handle per rows change
  const handlePerRowsChange = async (newPerPage, page) => {
    setFilterObject({
      ...filterObject,
      ...{ page: String(page), count: String(newPerPage) },
    });
    // fetchShipment();
  };

  //search functions
  const handleSearch = (value: string, type: string) => {
    if (value) {
      setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
    } else {
      setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
    }
  };

  //fetch container when object changes
  useEffect(() => {
    fetchTeammates();
  }, [filterObject]);

  //fetch container
  useEffect(() => {
    setFilteredTeammates(my_teammates);
  }, [my_teammates]);

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        isChosen &&
        actionref.current &&
        !actionref.current.contains(e.target)
      ) {
        setIsChosen({});
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isChosen]);

  return (
    <Layout>
      <div className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
        {loading ? (
          <PageLoading title="team members" />
        ) : (
          <>
            <div
              className="flex items-center gap-x-1 mb-2 cursor-pointer w-fit"
              onClick={() => navigate("/settings")}
            >
              <img src={arrowL} alt="" />
              <p className="text-sm grey-text">Settings</p>
            </div>
            <div className="flex flex-col justify-between mb-10 md:flex-row md:items-center">
              <div className="mb-8 md:mb-0" ref={scrollref}>
                <h2 className="text-[#344335] text-2xl mb-1.5">My Team</h2>
                <p className="grey-text text-sm">
                  Here’s a list of your team members
                </p>
              </div>
              <div className="relative">
                <PrimaryButtons
                  title="Invite Team Member"
                  style={{}}
                  onClick={() => {
                    setInviteTeamMember(!inviteTeamMember);
                  }}
                  disabled={false}
                  loading={false}
                  icon={cross}
                />
              </div>
            </div>
            <div>
              <>
                <>
                  <div className="desktop-only relative">
                    {table_loading && (
                      <div className="absolute h-full w-full bg-[#7c8d788c] z-[999999] flex justify-center">
                        <div className="pt-5">
                          <LoadingSpinner
                            top={false}
                            height="10"
                            loadingText="Loading table data"
                          />
                        </div>
                      </div>
                    )}
                    <TeamTable
                      filteredShipments={filteredTeammates}
                      total_count={total_teammates}
                      handlePerRowsChange={handlePerRowsChange}
                      handlePageChange={handlePageChange}
                      handleSearch={handleSearch}
                      filterObject={filterObject}
                      loading={loading}
                      my_teammates={my_teammates}
                    />
                  </div>
                  <div className="mobile-only">
                    {!loading ? (
                      <>
                        <div className="flex items-center justify-between sm:justify-start sm:gap-x-4">
                          {/* search */}
                          <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-[70%] sm:w-[auto] sm:w-full black-text sm:w-[264px] mb-5">
                            <div className="min-w-[16px] h-[16px] ">
                              <img src={search} alt="" />
                            </div>
                            <input
                              placeholder="Search team members"
                              className="w-[100%]"
                              onChange={(e) =>
                                handleSearch(e.target.value, "search")
                              }
                            />
                          </div>

                          {/* filter */}
                          {/* <div
                                        className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded w-[28%] sm:w-[auto] h-[37.6px] mt-[-20px]"
                                        onClick={() => setMobileFilterDisplay(true)}
                                    >
                                        <div className="min-w-[16px] h-[16px] "><img src={filter} alt="" className="w-[100%]"></img></div>
                                        <p className="text-xs text-[#9CA3AF]">Filter</p>
                                    </div> */}
                        </div>

                        {my_teammates.length > 0 ? (
                          my_teammates.map((item, idx) => (
                            <MobileTeamMember
                              showMobileActions={showMobileActions}
                              setShowMobileActions={setShowMobileActions}
                              setEditTeamMember={setEditTeamMember}
                              setShowDeactivateTeam={setShowDeactivateTeam}
                              item={item}
                              setUserInfo={setUserInfo}
                              setIsChosen={setIsChosen}
                              isChosen={isChosen}
                              actionref={actionref}
                              key={idx}
                              user={user}
                            />
                          ))
                        ) : (
                          <>
                            <div className="mx-7 mt-8 block ">
                              <div className="flex justify-center mb-1">
                                <img src={tray} alt="" />
                              </div>
                              <p className="text-center grey-text-3 font-light">
                                No data available
                              </p>
                              {total_teammates > 0 && (
                                <div
                                  className="px-2 py-1.5 w-fit cursor-pointer rounded bg-[#109B32] mt-6 mx-auto font-light"
                                  onClick={() => {
                                    // handleFilter(
                                    //   {
                                    //     shipment_transport_type: "",
                                    //     shipment_type: "",
                                    //     shipment_status: "",
                                    //     start_date: "",
                                    //     end_date: "",
                                    //   },
                                    //   ""
                                    // );
                                    setStartNum(1);
                                    setEndNum(10);
                                    setPage(0);
                                  }}
                                >
                                  <p className="text-white">
                                    Go back to shipments
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        {/* phone pagination */}
                        {filteredTeammates?.length > 0 && (
                          <div className="mt-4 mx-7 py-6 flex justify-between items-center">
                            {/* left */}
                            {page === 0 ? (
                              <div
                                className="rotate-180 pt-2"
                                onClick={() => {}}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                    stroke="#d6dfed"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                className="rotate-180"
                                onClick={() => {
                                  handlePageChange(page);
                                  setPage(page - 1);
                                  setStartNum(startNum - 10);
                                  setEndNum(endNum - 10);
                                }}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                    stroke="#374151"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            )}

                            {/* middle */}
                            <p>
                              {startNum} -{" "}
                              {filteredTeammates.length >= 10
                                ? endNum
                                : endNum -
                                  (10 - (filteredTeammates.length % 10))}{" "}
                              of {total_teammates}
                            </p>

                            {/* right */}
                            {page >= Math.ceil(total_teammates / 10 - 1) ? (
                              <div className="" onClick={() => {}}>
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                    stroke="#d6dfed"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                className=""
                                onClick={() => {
                                  handlePageChange(page + 2);
                                  setPage(page + 1);
                                  setStartNum(startNum + 10);
                                  setEndNum(
                                    filteredTeammates.length >= 10
                                      ? endNum + 10
                                      : endNum -
                                          (10 - (filteredTeammates.length % 10))
                                  );
                                }}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                    stroke="#374151"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <LoadingSpinner />
                    )}
                  </div>
                </>
                {/* // :
                                    // <div className="solid-br rounded h-[595px] flex flex-col justify-center items-center">
                                    //     <NoTeamMember />
                                    // </div> */}
              </>
            </div>
            {inviteTeamMember && (
              <InviteTeamModal
                closeModal={closeModal}
                my_teammates={my_teammates}
                mode={"invite"}
              />
            )}
            {editTeamMember && (
              <InviteTeamModal
                my_teammates={my_teammates}
                closeModal={closeModal}
                mode={"edit"}
                userInfo={userInfo}
              />
            )}
            {showDeactivateTeam && (
              <DeactivateTeamModal
                modalIsOpen={showDeactivateTeam}
                closeModal={closeModal}
                userInfo={userInfo}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, my_teammates, total_teammates, table_loading } =
    state.teammates;

  return { error, loading, my_teammates, total_teammates, table_loading };
};

export default connect(mapStateToProps, { getTeammates })(Team);
