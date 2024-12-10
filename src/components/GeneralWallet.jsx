import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";
import { toast } from "react-toastify";

const GeneralWallet = (props) => {
  const { multiTabDetect } = useContext(MultiTabDetectContext);

  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  const formatNumber = (numberString) => {
    // Parse the input to ensure it's a number
    const number = parseFloat(numberString);
  
    // Format the number with commas and two decimal places
    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  
    return formattedNumber;
  };

  const claimAllToUSDT = () => {
    if (multiTabDetect) {
      toast.error("Multiple browser tab was opend, please close all old browser tab", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
  };

  return (
    <div className="card-blue-green sm:w-[80svw] w-[80svw] mx-auto animation-show-dashboard  flex flex-row justify-between items-center w-full h-full border border-gray-200 rounded-lg shadow sm:mb-[30px]">
      <div className="pl-[20px] pr-[20px] pt-[20px] pb-[20px] flex flex-col w-full gap-[20px]">
        <div className="balance-item">
          <span>Connected wallet</span>
          <span>{formatNumber(props.usdt)}</span>
        </div>

        <div className="balance-item">
          <span>Transfer Wallet</span>
          <div className="balance-details">
            <span>{formatNumber(props.transfer)}</span>
          </div>
        </div>

        <div className="balance-item">
          <span>Total Mining</span>
          <div className="balance-details">
            <span>{formatNumber(props.totalMining)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralWallet;
