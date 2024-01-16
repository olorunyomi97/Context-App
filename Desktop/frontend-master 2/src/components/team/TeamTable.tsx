import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//icons
import dot from "assets/icons/dots.svg";

//libraries
import { Table, Dropdown, MenuProps, message } from "antd";
import moment from "moment";

//icons
import search from "assets/icons/search.svg";
import filter from "assets/icons/Filter-grey.svg";

// helpers
import { getOrigin, getDestination } from "helpers/tableLocation";
import { error } from "console";

//components
import InviteTeamModal from "components/team/InviteTeamModal";
import DeactivateTeamModal from "components/team/DeactivateTeamModal";

const TeamTable = (props: any) => {
  const {
    filteredShipments,
    total_count,
    handlePerRowsChange,
    handlePageChange,
    handleSearch,
    setFilterDisplay,
    filterObject,
    my_teammates,
  } = props;

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(filterObject.page));
  console.log("filteredShipments", filteredShipments);

  const [showTeamEdit, setShowTeamEdit] = useState(false);
  const [showDeactivateTeam, setShowDeactivateTeam] = useState(false);

  const [userInfo, setUserInfo] = useState([]);

  const [selectedId, setSelectedId] = useState("");

  const [data, setData] = useState(filteredShipments);
  useEffect(() => {
    setData(filteredShipments);
  }, [filteredShipments]);

  useEffect(() => {
    setPage(parseInt(filterObject.page));
  }, [filterObject]);

  const items = [
    { key: "1", label: "Edit Details" },
    { key: "2", label: "Delete" },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    // console.log("key>>>", key)
    if (key === "1") {
      setShowTeamEdit(true);
    } else if (key === "2") {
      setShowDeactivateTeam(true);
    }
  };

  const closeModal = () => {
    setShowTeamEdit(false);
    setShowDeactivateTeam(false);
  };

  // const dataSource = [
  //     {
  //         key: '1',
  //         first_name: 'Mike',
  //         last_name: 'Koben',
  //         email: 'mikejoke@gmail.com',
  //         phone: '+2348033492314',
  //         role: 'Super Admin',
  //     },
  //     {
  //         key: '2',
  //         first_name: 'Paul',
  //         last_name: 'Jaker',
  //         phone: '+2349054322456',
  //         email: 'pauljaker@gmail.com',
  //         role: 'Team Member',
  //     },
  //     {
  //         key: '3',
  //         first_name: 'Peter',
  //         last_name: 'Pan',
  //         email: 'peterpan@gmail.com',
  //         phone: '+2348188233298',
  //         role: 'Super Admin',
  //     },
  //     {
  //         key: '4',
  //         first_name: 'Jude',
  //         last_name: 'Akan',
  //         email: 'judeakan@gmail.com',
  //         phone: '+2348188233213',
  //         role: 'Team Member',
  //     },

  // ];

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (_, { firstname }) => (
        <>
          {firstname ? <span className="capitalize">{firstname}</span> : "N/A"}
        </>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "age",
      render: (_, { lastname }) => (
        <>{lastname ? <span className="capitalize">{lastname}</span> : "N/A"}</>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { email }) => <>{email ? <span>{email}</span> : "N/A"}</>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (_, { phone }) => <>{phone ? <span>{phone}</span> : "N/A"}</>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, row, { role }) => (
        <>
          {row.is_member && <span className="capitalize">Team member</span>}
          {row.is_owner && <span className="capitalize">Admin</span>}
        </>
      ),
    },
    {
      title: "",
      width: 190,
      align: "center",
      dataIndex: "operation",
      key: "operation",
      render: (_, row, { shipment_status }) => (
        <>
          {row.firstname.toLowerCase() === user.firstname.toLowerCase() ? (
            <></>
          ) : (
            <div
              className="flex justify-center cursor-pointer"
              onClick={() =>
                setUserInfo(my_teammates.filter((item) => item._id === row._id))
              }
            >
              <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                <img src={dot} alt="" />
              </Dropdown>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-1">
        <div className="pt-2 flex justify-between items-center">
          <div className="flex items-center gap-x-[16px]">
            {/* search */}
            <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-full black-text w-[264px] mb-5">
              <div className="">
                <img src={search} alt=""></img>
              </div>
              <input
                placeholder="Search team members"
                className=""
                onChange={(e) => handleSearch(e.target.value, "search")}
              />
            </div>

            {/* filter */}
            {/* <div
                            className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded  h-[37.6px] mt-[-20px]"
                            onClick={() => {
                                setFilterDisplay(true);
                            }}
                        >
                            <div><img src={filter} alt=""></img></div>
                            <p className="text-xs text-[#9CA3AF]">Filter</p>
                        </div> */}
          </div>

          <div className="mb-5 desktop-only">
            {/* <ExportCSV
                            onExport={() => downloadCSV(filteredBookings, "bookings.csv")}
                        /> */}
          </div>
        </div>
      </div>
      <div>
        <Table
          //   @ts-ignore
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            total: total_count,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            current: page + 1,
            showSizeChanger: true,
            pageSizeOptions: ["10", "15", "20", "30"],
            onChange: (page, pageSize) => {
              handlePageChange(page - 1);
              handlePerRowsChange(pageSize, page - 1);
              // console.log("page", page - 1);
              // console.log("pageSize", pageSize);
            },
          }}
          scroll={{ x: 1120 }}
        />
        {showTeamEdit && (
          <InviteTeamModal
            closeModal={closeModal}
            mode="edit"
            my_teammates={my_teammates}
            selectedId={selectedId}
            userInfo={userInfo[0]}
          />
        )}
        {showDeactivateTeam && (
          <DeactivateTeamModal
            modalIsOpen={showDeactivateTeam}
            closeModal={closeModal}
            userInfo={userInfo[0]}
          />
        )}
      </div>
    </div>
  );
};

export default TeamTable;
