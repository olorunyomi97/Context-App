import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//icons
import filterIcon from "assets/icons/filter.svg";

const CustomTableFilters = (props: any): JSX.Element => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [openFilter, setOpenFilter] = useState(false);

  const { handleFilter } = props;

  return (
    <>
      {/* desktop only */}
      <div className="desktop-only">
        <div className="flex items-end">
          <div className="">
            <label className="text-xs black-text" htmlFor={"shipment_type"}>
              Shipment Type
            </label>
            <div className="">
              <select
                name=""
                id=""
                className=" px-4 py-1.5 text-xs rounded custom-input  w-full black-text bg-grey"
                onChange={(e) => handleFilter(e.target.value, "shipment_type")}
              >
                <option value="">please select</option>
                <option value="import">import</option>
                <option value="export">export</option>
              </select>
            </div>
          </div>

          <div className="mx-4">
            <label className="text-xs black-text" htmlFor={"shipment_date"}>
              Shipment Date
            </label>
            <div className="">
              {/* <input
                className="form-input px-4 py-1.5 text-xs custom-input rounded  w-full black-text bg-grey"
                type="date"
                name="shipment_date"
              /> */}
              <DatePicker
                className="form-input px-4 py-1.5 text-xs custom-input rounded  w-full black-text bg-grey"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                  handleFilter(update, "shipment_date");
                }}
                isClearable={true}
              />
            </div>
          </div>

          <div className="lg:ml-auto mr-5">
            <div className="">
              <input
                className="form-input px-4 py-2 custom-input text-xs rounded  w-52 black-text "
                type="text"
                name="search"
                placeholder="Search by ID, Destination"
                onChange={(e) => handleFilter(e.target.value, "search")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* mobile filter  */}
      <div className="mobile-only">
        <div className="flex">
          <div className="">
            <input
              className="form-input px-4 py-2 custom-input text-xs rounded w-full black-text "
              type="text"
              name="search"
              placeholder="Search by ID, Destination"
            />
          </div>

          <div className="ml-auto">
            <div
              className="solid-br bg-grey px-4 py-1.5 rounded flex"
              onClick={() => setOpenFilter(true)}
            >
              <p className="black-text text-xs">Filter</p>
              <img src={filterIcon} alt="" className="ml-2" width={15} />
            </div>
          </div>
        </div>

        <div className="">
          {openFilter ? (
            <>
              <SlidingPane
                className="custom-pane"
                isOpen={openFilter}
                from="left"
                hideHeader={true}
                width="350px"
                shouldCloseOnEsc={true}
                onRequestClose={() => {
                  setOpenFilter(false);
                }}
              >
                <div className="flex items-center">
                  <p className="black-text text-lg font-semibold">Filter</p>
                  <i
                    className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer ml-auto"
                    onClick={() => setOpenFilter(false)}
                  ></i>
                </div>

                <div className="mt-10">
                  <label
                    className="text-xs black-text"
                    htmlFor={"shipment_type"}
                  >
                    Shipment Type
                  </label>
                  <div className="">
                    <select
                      name=""
                      id=""
                      className=" px-4 py-1.5 text-xs rounded custom-input  w-full black-text "
                    >
                      <option value="">please select</option>
                      <option value="">import</option>
                      <option value="">export</option>
                    </select>
                  </div>
                </div>

                <div className="my-4">
                  <label
                    className="text-xs black-text"
                    htmlFor={"departure_date"}
                  >
                    Departure Date
                  </label>
                  <div className="">
                    <input
                      className="form-input px-4 py-1.5 text-xs custom-input rounded  w-full black-text "
                      type="date"
                      name="departure_date"
                      defaultValue={"Departure Date"}
                    />
                  </div>
                </div>

                <div className="">
                  <label className="text-xs black-text" htmlFor={"month"}>
                    Month
                  </label>
                  <div className="">
                    <input
                      className="form-input px-4 py-1.5 text-xs custom-input rounded solid-br w-full black-text "
                      type="month"
                      name="month"
                      defaultValue={"Departure Date"}
                    />
                  </div>
                </div>

                <div className="my-7 bg-green px-4 py-2 rounded">
                  <p className="white-text text-xs text-center">Apply</p>
                </div>
              </SlidingPane>
            </>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomTableFilters;
