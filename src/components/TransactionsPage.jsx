import Axios from "axios";
import { useEffect, useState } from "react";
import styles from "../style";
import { API_ENDPOINT } from "../constants";
import TransactionsTable from "./TransactionsTable";

const TABLE_HEAD = [
  "Code",
  "Date",
  "Amount",
  "Fee",
  "Type",
  "Status",
  "Note",
];

const TransactionsPage = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [withdrawHistory, setWithdrawHistory] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/all-transactions/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setWithdrawHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={`${styles.flexCenter}`}>
        <TransactionsTable TABLE_NAME={"Recent transactions"} TABLE_SUBNAME={"These are details about the lastest transactions"} TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={withdrawHistory} />
      </div>
    </>
  );
};

export default TransactionsPage;
