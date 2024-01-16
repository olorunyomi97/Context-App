import React from "react";

const Spinner = () => <div className="spinner mr-2"></div>;

const PageLoading = (props: any) => {
  const { title } = props;

  return (
    <div className="px-7 lg:px-14 lg:pt-10 container mx-auto w-full">
      <div className="bg-green text-center opacity-75 py-3">
        <div className="text-base white-text flex items-center justify-center">
          <Spinner /> Loading {title}
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
