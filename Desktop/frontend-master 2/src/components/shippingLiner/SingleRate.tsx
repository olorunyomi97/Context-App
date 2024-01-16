import React, { useState } from "react";
import moment from "moment";

//helper
import { formatCurrency } from "helpers";

const SingleRate = (props) => {
  const { item, id } = props;
  const [selectedRate, setSelectedRate] = useState("");
  console.log("selectedRate>>>", selectedRate);
  return (
    <div
      className={`p-6 rounded-[10px] ${
        selectedRate === item._id ? "rate-item" : "border-grey-1"
      } `}
      onClick={(e) => setSelectedRate(item._id)}
    >
      <div className="pb-6 bottom-divider-2">
        <p className="text-xs font-medium mb-1">
          {item?.rates_data?.carrier_name}
        </p>
        <p className="text-xl text-[#004800] mb-1 font-normal">
          {formatCurrency(item?.rates_data?.total_amount_ngn, "NGN")}
        </p>
        <p className="text-xs grey-text-1 font-normal">
          Valid until{" "}
          {item.rates_validity
            ? moment(item.rates_validity).format("Do, MMM YYYY")
            : "N/A"}
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <div>
          <p className="text-xs grey-text font-light mb-1">Sailing Date</p>
          <p className="text-xs black-text-3 font-medium">
            {item?.rates_data?.sailing_date
              ? moment(item?.rates_data?.sailing_date).format("YYYY-MM-DD")
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs grey-text font-light mb-1">Transit Time</p>
          <p className="text-xs black-text-3 font-medium">
            {item.rates_data.transit_time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleRate;
