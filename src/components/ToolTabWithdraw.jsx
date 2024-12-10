import WithdrawItemUSDT from "./WithdrawItemUSDT";
import Axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../constants";

const ToolTabWithdraw = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  const [balance, setBalance] = useState(0);
  const [transfer, setTransfer] = useState(0);
  const [kaspa, setKaspa] = useState(0);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/balance/${props.usdtWallet}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setBalance(response.data.balances[0].balance);
        setTransfer(response.data.balances[6].balance);
        setKaspa(response.data.balances[0].balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.usdtWallet]);

  return (
    <div className="sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] animation-show-dashboard border border-gray-200 rounded-lg shadow card-blue-green flex flex-row justify-between items-center w-full h-full">
      <div className="w-full pt-[20px] pb-[20px] pl-[20px] pr-[20px]">
        <WithdrawItemUSDT balance={balance} kaspa={kaspa} usdtWallet={props.usdtWallet} kaspaWallet={props.kaspaWallet} />
      </div>
    </div>
  );
};

export default ToolTabWithdraw;
