import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";

const TransferUSDTItem = ({ swapHistory }) => {
  const { multiTabDetect } = useContext(MultiTabDetectContext);

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [to, setTo] = useState("");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [networkSelected, setNetworkSelected] = useState("1");


  const [listNetwork, setListNetwork] = useState([
    { id: 1, name: "USDT BEP20" },
    { id: 2, name: "Transfer" },
  ]);
  const [balances, setBalances] = useState([]);
  const [transfer, setTransfer] = useState();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amountSwap, setAmountSwap] = useState(0);

  const [listBalance, setListBalance] = useState([]);

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
        setBalances(response.data.balances);
        setBalance(response.data.balances[0].balance);
        setTransfer(response.data.balances[6].balance)
        setCurrentBalance(response.data.balances[0].balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const [displayName, setDisplayName] = useState("Display name of receiver");

  const handleGetDisplayName = () => {
    if (to == "" || !to) return;
    let config = {
      method: "get",
      url: `${API_ENDPOINT}auth/get-display-name/${to}`, // Adjusted URL
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        if (response.data.length > 0) {
          setDisplayName(response.data);
        } else {
          setDisplayName("No display name was set yet");
        }
        toast.success("Display name field was updated", {
          position: "top-right",
          autoClose: 1000,
        });
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  const handleCreateDeposit = () => {
    if (multiTabDetect) {
      toast.error("Multiple browser tab was opend, please close all old browser tab", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (amount <= 0) {
      toast.error("Swap amount must > 0!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (amount > balance) {
      toast.error("Swap amount must <= balance!", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    setLoading(true);
    // SweetAlert2 confirmation modal
    Swal.fire({
      title: 'Confirm transfer',
      text: `Are you sure you want to transfer ${amount} to ${to}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, transfer it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
      customClass: {
        confirmButton: 'custom-confirm-button', // Custom class for confirm button
        cancelButton: 'custom-cancel-button',   // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = JSON.stringify({
          from: walletAddress,
          to: to,
          amount: amount,
          status: 1,
          type: 1,
          walletType: 2,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${API_ENDPOINT}management/transfer-balance`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "ngrok-skip-browser-warning": "69420",
          },
          data: data,
        };

        Axios.request(config)
          .then((response) => {
            if (response.data === "Transaction success") {
              setButtonDisabled(true);

              toast.success("Transfer success!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                  window.location.reload();
                },
              });
            } else {
              setLoading(false);

              toast.error(response.data, {
                position: "top-right",
                autoClose: 1500,
              });
            }
          })
          .catch((error) => {
            setLoading(false);

            toast.error("Please try again later", {
              position: "top-right",
              autoClose: 1500,
            });
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
        setAmountSwap(value / 0.1);
      } else {
        setAmount("");
      }
    } else {
      setAmount("");
    }
  };

  useEffect(() => {
    if (networkSelected == 1) {
      setCurrentBalance(balance);
    } else {
      setCurrentBalance(transfer);
    }
  }, [networkSelected, balance, transfer]);

  return (
    <section
      className={``}
    >
      <div className="flex-1 flex flex-col">
        <div className="rounded">
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="packageName"
            >
              Wallet source
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="packageName"
              value={networkSelected}
              onChange={(e) => {
                setNetworkSelected(e.target.value);
              }}
            >
              {listNetwork.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="tokenBalance">
              Balance
            </label>
            <input
              className="bg-gray-400 text-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenBalance"
              type="text"
              value={formatNumber(currentBalance)}
              readOnly
              disabled
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="tokenBalance"
            >
              Transfer to
            </label>
            <div className="flex items-center bg-white shadow border rounded w-full">
              <input
                className="bg-white text-dark w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tokenBalance"
                type="text"
                placeholder="Display name or wallet address"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={handleGetDisplayName}
                icon={faMagnifyingGlass}
                className="text-gray-500 mr-3"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="tokenBalance"
            >
              Display name of receiver
            </label>
            <input
              className="bg-gray-400 text-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenBalance"
              type="text"
              value={displayName}
              readOnly
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="tokenBalance">
              Amount
            </label>
            <input
              className="bg-white text-dark shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tokenBalance"
              type="text"
              value={amount}
              onChange={(e) => {
                handleChangeAmount(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={handleCreateDeposit} disabled={loading} className="button-43">Transfer</button>
          </div>
        </div>

        {/* <ToastContainer stacked /> */}
      </div>
    </section>
  );
};

export default TransferUSDTItem;
