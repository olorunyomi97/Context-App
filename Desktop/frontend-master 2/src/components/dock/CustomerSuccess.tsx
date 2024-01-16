import React from "react";

const CustomerReview = ({ header, name, role, date, comment }) => (
  <div className="md:p-7 lg:p-10 bottom-divider">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <p className="text-2xl md:text-[32px] lg:text-[36px] black-text-3 pt-12 md:pt-0 sato font-medium">
        {header}
      </p>
      <div className="text-right hidden md:block">
        <p className="black-text-3 text-xl sato font-bold">{name}</p>
        <p className="grey-text text-base max-w-[200px] sato font-medium">
          {role}
        </p>
        <p className="grey-text font-light text-base sato">{date}</p>
      </div>
    </div>
    <p className="max-w-[630px] mt-9 text-xl black-text-3 font-light sato">
      {comment}
    </p>
    <div className="py-10 md:hidden">
      <p className="black-text-3 text-base lg:text-xl sato font-bold">{name}</p>
      <p className="grey-text text-base max-w-[200px] sato font-medium">
        {role}
      </p>
      <p className="grey-text font-light text-base sato">{date}</p>
    </div>
  </div>
);

const CustomerSuccess = () => {
  return (
    <div className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="black-text-2 text-[32px] md:text-[40px] leading-[43px] lg:leading-[65px] lg:text-5xl text-center sato">
          See what <span className="font-bold sato">others are saying.</span>
        </h2>
        <div className="h-[3px] mt-12 mb-6 rounded-[2px] saying" />
        <CustomerReview
          header={"“Amazing team to work with.”"}
          name="Lanre Sodeeq"
          role="Experienced Agro Exporter"
          date="2/3/23"
          comment="Their team is knowledgeable and always goes above and beyond to ensure my shipments arrive on time and in perfect condition."
        />
        <CustomerReview
          header={"“Fast and effective”"}
          name="Raj Kamapoosha"
          role="Manager at Chatra Industries ltd."
          date="1/3/23"
          comment="Oneport365 has truly transformed the way I approach shipping. Their innovative technology and streamlined processes have saved me time and money."
        />
        <CustomerReview
          header={"“Was easier than I expected”"}
          name="David Okon"
          role="Major dealer at Odun-Ade"
          date="5/4/23"
          comment="Their team is knowledgeable and always goes above and beyond to ensure my shipments arrive on time and in perfect condition."
        />
      </div>
    </div>
  );
};

export default CustomerSuccess;
