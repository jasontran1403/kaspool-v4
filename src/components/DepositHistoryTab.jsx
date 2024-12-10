import { useState, useEffect } from "react";
import TransactionTableV2 from "./TransactionTableV2";
import Axios from "axios";
import { API_ENDPOINT } from "../constants";
const TABLE_HEAD = ["System Code", "Date", "Amount", "Status"];

const DepositHistoryTab = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  const [listTransaction, setListTransaction] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/claim-history/${localStorage.getItem("walletAddress")}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setListTransaction(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  return (
    <div className="sm:w-[80svw] w-[80svw] mx-auto sm:mb-[30px] animation-show border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <TransactionTableV2
        className="w-full flex justify-center items-center pt-[20px] pb-[20px]"
        TABLE_NAME={"Claim history"}
        TABLE_SUBNAME={"These are details about the lastest claim history"}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={listTransaction}
      />
    </div>
  );
};

export default DepositHistoryTab;
