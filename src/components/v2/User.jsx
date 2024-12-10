import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_ENDPOINT } from "../../constants";

const User = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [kaspaWallet, setKaspaWallet] = useState("");

  useEffect(() => {
    setDisplayName(props.displayName);
    setKaspaWallet(props.kaspaWallet);
  }, [props.displayName, props.kaspaWallet]);

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

  const handleCopyRefLink = (refCode, side) => {
    const currentUrl = `${refCode}`;

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        // You can also trigger a toast or visual feedback here if needed
        toast.success(`Referral link (${side}) copied to clipboard`, {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy referral link: ", error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  const handleUpdateInfo = () => {
    if (displayName === "" || kaspaWallet === "") {
      toast.error("Input field is required", {
        position: "top-right",
        autoClose: 1500,
      });

      return;
    }

    Swal.fire({
      title: `Confirm update account info`,
      text: `Are you sure you want to update account info?`,
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

        let data = JSON.stringify({
          "walletAddress": `${localStorage.getItem("walletAddress")}`,
          "displayName": displayName,
          "kaspaWallet": kaspaWallet
        });

        let config = {
          method: 'post',
          url: `${API_ENDPOINT}management/update-account-info`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "ngrok-skip-browser-warning": "69420",
          },
          data: data
        };

        Axios.request(config)
          .then((response) => {
            if (response.data === "ok") {
              toast.success("Update account info successful", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                  window.location.reload();
                }
              });
            } else {
              toast.error(response.data, {
                position: "top-right",
                autoClose: 1500
              });
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Please try again later!", {
              position: "top-right",
              autoClose: 1500
            });
          });
      }
    });
  }

  return (
    <div className="fadeIn">
      <div className="card-container-internal">
        <div className="card-items">
          <div className="card-content-transaction info-details-item relative pt-[10px] pb-[20px] border-b border-gray-300">
            <label className="mb-[10px] text-white">Name</label>
            <input
              className="mb-[10px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" placeholder="Display name, default is xxxx...xxxx" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>

          <div className="card-content-transaction info-details-item pt-[15px] pb-[10px]">
            <label className="text-white">Connected Wallet Address</label>
            <input
              className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" placeholder="Connected wallet address..." value={props.usdtWallet} readOnly disabled />
          </div>

          <div className="card-content-transaction info-details-item pb-[10px]">
            <label className="text-white">Kaspa Wallet Address</label>
            <input
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" placeholder="KASPA wallet address" value={kaspaWallet} onChange={(e) => setKaspaWallet(e.target.value)} />
          </div>

          <div className="card-content-transaction info-details-item pb-[10px]">
            <label className="text-white">Total Sales</label>
            <input
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" value={`${formatNumber(props.totalSales)}`} readOnly disabled />
          </div>

          <div className="card-content-transaction info-details-item pb-[10px]">
            <label className="text-white">Maxout</label>
            <input
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" value={`${formatNumber(props.maxout)}`} readOnly disabled />
          </div>

          <div className="card-content-transaction info-details-item pb-[10px]">
            <label className="text-white">Sponsor</label>
            <input
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" value={props.root} readOnly disabled />
          </div>

          <div className="card-content-transaction info-details-item pb-[10px]">
            <label className="text-white">Left reflink</label>
            <input
              className="cursor-pointer shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" value={props.leftRefLink} onClick={() => handleCopyRefLink(props.leftRefLink, "left")} readOnly />
          </div>

          <div className="card-content-transaction info-details-item mb-[10px]">
            <label className="text-white">Right reflink</label>
            <input
              className="cursor-pointer shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" value={props.rightRefLink} onClick={() => handleCopyRefLink(props.rightRefLink, "right")} readOnly />
          </div>
        </div>
      </div>
      <div className="text-center pt-[10px] pb-[10px]">
        <button className="button-89" onClick={handleUpdateInfo} role="button">Update</button>
      </div>
    </div>
  )
};

export default User;