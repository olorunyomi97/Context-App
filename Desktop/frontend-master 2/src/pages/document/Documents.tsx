import React from "react";

//icons
import bigDocuments from "assets/icons/big-documents.svg";

//components
import ComingSoon from "components/partials/ComingSoon";

const Documents = () => {
  return (
    <ComingSoon
      pagetitle={"Documents"}
      pagesubtitle={"You will be able to view your documents here"}
      icon={bigDocuments}
    />
  );
};

export default Documents;
