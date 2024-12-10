import Axios from "axios";
import { useState, useContext } from "react";
import styles from "../style";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Tooltip } from "@mui/material";
import CopyIcon from '@mui/icons-material/FileCopy';
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";

const DepositUSDTItem = (props) => {
  const { multiTabDetect } = useContext(MultiTabDetectContext);

  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [networkSelected, setNetworkSelected] = useState("");

  const [listNetwork, setListNetwork] = useState([
    { id: 1, name: "USDT BEP20" },
  ]);

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState(0);
  const [qrImage, setQrImage] = useState("");
  const [depositWallet] = useState(localStorage.getItem("bep20"));

  const handleSelectPackage = (packageId) => {
    const selectedPackage = listPackages.find(
      (pkg) => pkg.id === parseInt(packageId)
    );
    if (selectedPackage) {
      setNetworkSelected(packageId);
    }
  };

  const handleCreateDeposit = () => {
    if (multiTabDetect) {
      toast.error("Multiple browser tab was opend, please close all old browser tab", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    setLoading(true);
    let data = JSON.stringify({
      walletAddress: walletAddress,
    });

    Swal.fire({
      title: "Confirm claim all amount of commission and transfer wallet",
      text: `Are you sure you want to claim all?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm it!",
      cancelButtonText: "No, cancel it",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button", // Custom class for confirm button
        cancelButton: "custom-cancel-button", // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "get",
          url: `${API_ENDPOINT}management/claim-all/${localStorage.getItem("walletAddress")}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "ngrok-skip-browser-warning": "69420",
          },
        };

        Axios.request(config)
          .then((response) => {
            // Assuming response.data contains the image URL or base64 string
            if (response.data === "ok") {
              
              toast.success("Claim all successful!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                  window.location.reload();
                }
              });
            } else {
              setLoading(false);
              toast.error("Please try again!", {
                position: "top-right",
                autoClose: 1500,
              });
            }
          })
          .catch((error) => {
            setLoading(false)
            toast.error("Please try later", {
              position: "top-right",
              autoClose: 1500,
            });
          });
      }
    });
  };

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

  const handleCopy = () => {
    navigator.clipboard.writeText(depositWallet).then(
      () => {
        toast.success("Wallet address copied to clipboard!", {
          position: "top-right",
          autoClose: 1500,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy wallet address!", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    );
  };

  const handleCancelDeposit = () => {
    Swal.fire({
      title: "Confirm cancel deposit",
      text: `Are you sure you want to cancel ${amount}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, do not cancel it",
      reverseButtons: true,
      customClass: {
        confirmButton: "custom-confirm-button", // Custom class for confirm button
        cancelButton: "custom-cancel-button", // Custom class for cancel button
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = JSON.stringify({
          walletAddress: walletAddress,
          amount: 0,
          method: 0,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}management/cancel-deposit`,
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
              setQrImage("");
              toast.success("Canceled deposit order!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => window.location.reload(),
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <section
      className={``}
    >
      <div
        className="flex-1 flex flex-col"
        style={{ overflow: "hidden" }}
      >
        <div className="rounded-lg">
          {/* <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="packageName"
            >
              Network
            </label>
            <select
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="packageName"
              value={networkSelected}
              onChange={(e) => setNetworkSelected(e.target.value)}
            >
              {listNetwork.map((network) => (
                <option key={network.id} value={network.id}>
                  {network.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="mb-6 flex flex-col justify-between">
            <div className="balance-item">
              <span>Direct Commission</span>
              <span>{formatNumber(props.directCommission)}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col justify-between">
            <div className="balance-item">
              <span>Binary Commission</span>
              <span>{formatNumber(props.binaryCommission)}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col justify-between">
            <div className="balance-item">
              <span>Leader Commission</span>
              <span>{formatNumber(props.leaderCommission)}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col justify-between">
            <div className="balance-item">
              <span>POP Commission</span>
              <span>{formatNumber(props.popCommission)}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col justify-between">
            <div className="balance-item">
              <span>Daily Reward</span>
              <span>{formatNumber(props.dailyReward)}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col justify-between">
            <div className="balance-item">
              <span>Transfer Wallet</span>
              <span>{formatNumber(props.transferWallet)}</span>
            </div>
          </div>

          {/* <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="tokenBalance"
            >
              Direct Commission
            </label>
            <input
              className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"
              id="tokenBalance"
              type="text"
              value={formatNumber(10)}
              disabled
              readOnly
              // min="10"
              // onChange={(e) => {
              //   const value = e.target.value;

              //   const regex = /^[0-9]*\.?[0-9]*$/;

              //   if (regex.test(value)) {
              //     const numericValue = parseFloat(value);
              //     if (!isNaN(numericValue) && numericValue > 0) {
              //       setAmount(value);
              //     } else {
              //       setAmount("");
              //     }
              //   }
              // }}
            />
          </div> */}

          {/* {qrImage && (
            <div className="mb-6 flex flex-col justify-center gap-5">
              <img
                src={qrImage}
                alt="QR Code"
                className="max-w-full sm:max-w-sm" // Ensure image scales responsively
              />
              <div className="flex items-center">
                <Tooltip title={depositWallet} arrow>
                  <input
                    style={{
                      cursor: "pointer",
                      width: "100%", // Full width
                      whiteSpace: "nowrap", // Prevents wrapping
                      overflow: "hidden", // Hides overflow
                    }}
                    onClick={handleCopy}
                    value={depositWallet}
                    readOnly
                  />
                </Tooltip>
                <button
                  onClick={handleCopy}
                  className="ml-2 p-1 rounded hover:bg-gray-200"
                  aria-label="Copy wallet address"
                >
                  <CopyIcon style={{ color: "white" }} />
                </button>
              </div>
            </div>
          )} */}

          <div className="flex items-center justify-between">
            {qrImage.length === 0 ? (
              <button onClick={handleCreateDeposit} disabled={loading} className="button-43">Claim All</button>
            ) : (
              <button onClick={handleCancelDeposit} className="button-43">Cancel</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositUSDTItem;
