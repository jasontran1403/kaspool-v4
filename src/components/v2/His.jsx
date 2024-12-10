import { useState, useEffect } from "react";
import Axios from "axios";
import { API_ENDPOINT } from "../../constants";
import TransactionTableV2Mining from "../TransactionTableV2Mining";
import TransactionTableV2Withdraw from "../TransactionTableV2Withdraw";
import TransactionTableV2Claim from "./TransactionTableV2Claim";
import TransactionTableV2Transfer from "./TransactionTableV2Transfer";
const TABLE_HEAD_MINING = ["Transaction", "Date", "Amount", "Status"];
const TABLE_HEAD_CLAIM = ["Transaction", "Date", "Amount", "Status"];
const TABLE_HEAD_WITHDRAW = ["Transaction", "Date", "Amount", "Status"];
const TABLE_HEAD_TRANSFER = ["Transaction", "Date", "Amount", "Status"];

const His = (props) => {
  const [listTransaction, setListTransaction] = useState([]);
  const [listClaim, setListClaim] = useState([]);
  const [listWithdraw, setListWithdraw] = useState([]);
  const [listTransfer, setListTransfer] = useState([]);


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
        setListClaim(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/withdraw-history/${localStorage.getItem("walletAddress")}/1`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setListWithdraw(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/transfer-history/${localStorage.getItem("walletAddress")}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setListTransfer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {props.selectedHisTab === "Mining" && (
        <TransactionTableV2Mining
          className="w-full flex justify-center items-center"
          TABLE_HEAD={TABLE_HEAD_MINING}
          TABLE_ROWS={listTransaction}
        />
      )}

      {props.selectedHisTab === "Claim" && (
        <TransactionTableV2Claim
          className="w-full flex justify-center items-center"
          TABLE_HEAD={TABLE_HEAD_CLAIM}
          TABLE_ROWS={listClaim}
        />
      )}

      {props.selectedHisTab === "Withdraw" && (
        <TransactionTableV2Withdraw
          className="w-full flex justify-center items-center"
          TABLE_HEAD={TABLE_HEAD_WITHDRAW}
          TABLE_ROWS={listWithdraw}
        />
      )}

      {props.selectedHisTab === "Transfer" && (
        <TransactionTableV2Transfer
          className="w-full flex justify-center items-center"
          TABLE_HEAD={TABLE_HEAD_TRANSFER}
          TABLE_ROWS={listTransfer}
        />
      )}
    </>
  );
};

export default His;
