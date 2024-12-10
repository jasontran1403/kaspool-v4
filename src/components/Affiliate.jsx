import DirectTreeView from "./DirectTreeView";
import Tree from "../components/Tree";
import AffiliateSwitch from "./AffiliateSwitch";
import { useState } from "react";

const Affiliate = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  return (
    <div className="card-blue-green w-full sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] border border-gray-200 rounded-lg shadow">
      {/* Use flex to arrange content */}
      <div className=" flex flex-col justify-between items-center w-full pt-[20px] pb-[20px]">
        <AffiliateSwitch
          active={props.active}
          handleSwitchAffiliateTab={props.handleSwitchAffiliateTab}
          className="w-full" // Adjust width for small screens
        />
      </div>
    </div>
  );
};

export default Affiliate;
