import React from "react";

//icons
import bigInvoice from "assets/icons/big_invoice.svg";

//components
import ComingSoon from "components/partials/ComingSoon";

const Invoices = () => {
  return (
    <ComingSoon
      pagetitle={"Invoices"}
      pagesubtitle={"You will be able to view your invoices here"}
      icon={bigInvoice}
    />
  );
};

export default Invoices;
