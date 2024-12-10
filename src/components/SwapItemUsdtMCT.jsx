import Axios from "axios";
import { useState, useEffect } from "react";
import styles from "../style";
import Button from "./Button";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";

const SwapItemUsdtMCT = ({ swapHistory }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [fromSelected, setFromSelected] = useState(1);
  const [toSelected, setToSelected] = useState(2);
  const [balance, setBalance] = useState(0);

  const [listSwap] = useState([
    { id: 1, name: "USDT BEP20" },
    { id: 2, name: "KASPOOL TOKEN" },
  ]);

  const [listBalance, setListBalance] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountSwap, setAmountSwap] = useState(0);
  const [fee, setFee] = useState(0);
  const [isToWalletDisabled, setIsToWalletDisabled] = useState(false);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/balance/${walletAddress}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        setBalance(response.data.balances[0].balance);
        setListBalance(response.data.balances);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Updates To Wallet based on From Wallet selection
  useEffect(() => {
    if ((fromSelected >= 3 && fromSelected <= 7) || fromSelected == 1) {
      setToSelected(2); // Mapchain Token (id 2)
      setIsToWalletDisabled(true); // Disable To Wallet dropdown
    } else if (fromSelected == 2) {
      setToSelected(1); // USDT BEP20 (id 1)
      setIsToWalletDisabled(true); // Disable To Wallet dropdown
    } else {
      setIsToWalletDisabled(false); // Enable dropdown for other cases
    }
  }, [fromSelected]);

  // Handle the swap logic based on selected types
  const getSwapType = (fromSelected, toSelected) => {
    if (fromSelected === 1 && toSelected === 2) return 1; // USDT BEP20 => MCT
    if (fromSelected === 3 && toSelected === 2) return 2; // Direct Commission => MCT
    if (fromSelected === 4 && toSelected === 2) return 3; // Binary Commission => MCT
    if (fromSelected === 5 && toSelected === 2) return 4; // Leader Commission => MCT
    if (fromSelected === 6 && toSelected === 2) return 5; // Pop Commission => MCT
    if (fromSelected === 7 && toSelected === 2) return 6; // Daily Reward => MCT
    if (fromSelected === 2 && toSelected === 1) return 7; // MCT => USDT BEP20
    return null; // Default case
  };

  const handleCreateDeposit = () => {
    console.log("ok");
    if (buttonDisabled) return;
    const swapType = getSwapType(fromSelected, toSelected);
    if (!swapType) return;

    if (amount <= 0 || amount > balance) {
      toast.error("Invalid amount", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    Swal.fire({
      title: "Confirm Transfer",
      text: `Are you sure you want to swap?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, transfer it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button", // Custom class for confirm button
        cancelButton: "custom-cancel-button", // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setButtonDisabled(true);
        let data = JSON.stringify({
          walletAddress: walletAddress,
          amount: amount,
          type: swapType,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}management/swap`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
        };

        Axios.request(config)
          .then((response) => {
            if (response.data === "ok") {
              setButtonDisabled(true);
              toast.success("Swap success!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                  window.location.reload();
                },
              });
            } else {
              setButtonDisabled(false);
              toast.error(response.data, {
                position: "top-right",
                autoClose: 1500,
              });
            }
          })
          .catch((error) => {
            setButtonDisabled(false);
            console.log(error);
          });
      }
    });
  };

  const handleChangeAmount = (amountToSwap) => {
    const value = amountToSwap;
    const regex = /^[0-9]*\.?[0-9]*$/;
  
    if (regex.test(value)) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue > 0) {
        setAmount(value);
  
        // Check if price is valid before dividing
        if (price > 0) {
          if (fromSelected === 1 && toSelected === 2) {
            // USDT to MCT
            setAmountSwap(value / price); // 1 USDT gets 10 MCT (when price = 0.1)
          } else if (fromSelected === 2 && toSelected === 1) {
            // MCT to USDT
            setAmountSwap(value * price); // 1 MCT gets 0.1 USDT (when price = 0.1)
          } else if (fromSelected >= 3 && fromSelected <= 7) {
            // For commission types, the value remains the same
            setAmountSwap(value);
          }
        } else {
          // Handle the case where the price is invalid (e.g., set to 0)
          setAmountSwap(0);
          toast.error("Invalid price, please try again later", {
            position: "top-right",
            autoClose: 1500,
          });
        }
      } else {
        setAmount(""); // Reset if invalid
      }
    } else {
      setAmount(""); // Clear input if non-numeric characters are entered
    }
  };
  

  return (
    <div className={`investment-container`}>
      <section
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} investment-card sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      >
        <div className="flex-1 flex flex-col">
          <h2 className={styles.heading2}>Swap USDT  MCT</h2>
          <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Swap from
              </label>
              <select
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={fromSelected}
                onChange={(e) => {
                  setFromSelected(parseInt(e.target.value));
                  let index = e.target.value - 1;
                  if (index != 6) {
                    setBalance(listBalance[index].balance)
                  } else {
                    setBalance(listBalance[8].balance)
                    };
                }}
              >
                <option key={listSwap[0].id} value={listSwap[0].id}>
                    {listSwap[0].name}
                  </option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Balance
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={balance}
                readOnly
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Amount
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={amount}
                onChange={(e) => handleChangeAmount(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Swap to
              </label>
              <select
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={toSelected}
                onChange={(e) => setToSelected(parseInt(e.target.value))}
                disabled={isToWalletDisabled}
              >
                <option key={listSwap[1].id} value={listSwap[1].id}>
                    {listSwap[1].name}
                  </option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                You get
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={amountSwap}
                readOnly
              />
            </div>

            <div className="flex items-center justify-between">
              <Button handleClick={handleCreateDeposit} content={"Swap"} />
            </div>
          </div>

          {/* <ToastContainer stacked /> */}
        </div>
      </section>
    </div>
  );
};

export default SwapItemUsdtMCT;