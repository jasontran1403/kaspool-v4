import { useState, useEffect } from "react";
import Axios from "axios";
import { API_ENDPOINT } from "../constants";
import TransactionTableV2Mining from "./TransactionTableV2Mining";
const TABLE_HEAD = ["System Code", "Date", "Amount", "Status"];

const MiningHistoryTab = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  const [listTransaction, setListTransaction] = useState([]);

  

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
        setListTransaction(response.data.investments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="sm:w-[80svw] w-[80svw] mx-auto sm:mb-[30px] animation-show border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <TransactionTableV2Mining
        className="w-full flex justify-center items-center pt-[20px] pb-[20px]"
        TABLE_NAME={"Mining history"}
        TABLE_SUBNAME={"These are details about the lastest mining history"}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={listTransaction}
      />
    </div>
  );
};

export default MiningHistoryTab;
