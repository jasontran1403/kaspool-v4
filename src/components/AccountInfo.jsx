import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_ENDPOINT } from "../constants";

const AccountInfo = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  const [displayName, setDisplayName] = useState("");
  const [kaspaWallet, setKaspaWallet] = useState("");

  useEffect(() => {
    setDisplayName(props.displayName);
    setKaspaWallet(props.kaspaWallet);
  }, [props.displayName, props.kaspaWallet]);

  const formatNumber = (numberString) => {
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  const handleCopyRefLink = (refCode) => {
    const currentUrl = `${refCode}`;

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        // You can also trigger a toast or visual feedback here if needed
        toast.success("Referral link copied to clipboard", {
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
    <div className="card-blue-green sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Use flex to arrange content */}
      <div className="flex flex-col mx-[20px] justify-start content-center items-center pt-[20px] gap-[20px]">
        <div className="info-details-item relative pb-[20px] border-b border-gray-300">
          <span>Name</span>
          <input type="text" placeholder="Display name, default is xxxx...xxxx" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Connected Wallet Address</span>
          <input type="text" placeholder="Connected wallet address..." value={props.usdtWallet} readOnly disabled />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>KASPA</span>
          <input type="text" placeholder="KASPA wallet address" value={kaspaWallet} onChange={(e) => setKaspaWallet(e.target.value)} />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Total Sales</span>
          <input type="text" value={`$${formatNumber(props.totalSales)}`} readOnly disabled />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Maxout</span>
          <input type="text" value={`$${formatNumber(props.maxout)}`} readOnly disabled />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Sponsor</span>
          <input type="text" value={props.root} readOnly disabled />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Left reflink</span>
          <input type="text" className="cursor-pointer bg-gray-400" value={props.leftRefLink} onClick={() => handleCopyRefLink(props.leftRefLink)} readOnly />
        </div>

        <div className="info-details-item pb-[10px]">
          <span>Right reflink</span>
          <input type="text" className="cursor-pointer bg-gray-400" value={props.rightRefLink} onClick={() => handleCopyRefLink(props.rightRefLink)} readOnly />
        </div>

        <div className="text-center pb-[20px]">
          <button className="button-43" onClick={handleUpdateInfo} role="button">Update Info</button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
