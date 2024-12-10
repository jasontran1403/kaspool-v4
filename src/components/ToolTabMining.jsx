import { useState, useEffect } from "react";
import InvestmentPackage from "./InvestmentPackage";
import Axios from "axios";
import { API_ENDPOINT } from "../constants";

const ToolTabMining = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  const [packages, setPackages] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/packages/${localStorage.getItem("walletAddress")}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setPackages(response.data.packages);
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] animation-show-dashboard card-blue-green flex flex-row justify-between border border-gray-200 items-center rounded-lg w-full h-full">
      <div className="w-full pt-[20px] pb-[20px] pl-[20px] pr-[20px]">
        <InvestmentPackage packages={packages} balance={balance} connectedBalance={props.connectedBalance} />
      </div>
    </div>
  );
};

export default ToolTabMining;
