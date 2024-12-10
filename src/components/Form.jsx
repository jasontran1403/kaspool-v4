import { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINT } from "../constants";

const Form = ({ refcode }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [sponsorCode, setSponsorCode] = useState(refcode);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [accessToken] = useState(localStorage.getItem("access_token"));

  const [showSponsorError, setShowSponsorError] = useState(true);
  const [showDisplayNameError, setShowDisplayNameError] = useState(true);
  const [rootDisplayName, setRootDisplayName] = useState("");
  const [placementDislayName, setPlacementDisplayName] = useState("");
  const [side, setSide] = useState("");

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_ENDPOINT}management/get-ref-link-info/${refcode}`,
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    };
    
    Axios.request(config)
    .then((response) => {
      setRootDisplayName(response.data.rootDisplayName);
      setPlacementDisplayName(response.data.placementDisplayName);
      setSide(response.data.side);

    })
    .catch((error) => {
      toast.error("Please try again later", {
        position: "top-right",
        autoClose: 1500,
      });
    });
    
  }, []);

  const updateHandle = () => {
    // Check if fields are filled and set error states
    if (buttonDisabled) return;
    const isSponsorCodeEmpty = sponsorCode === "";
    const isDisplayNameEmpty = displayName === "";

    setShowSponsorError(isSponsorCodeEmpty);
    setShowDisplayNameError(isDisplayNameEmpty);

    // If any required field is empty, return early
    if (isSponsorCodeEmpty || isDisplayNameEmpty) {
      toast.error("Display name are required!", {
        position: "top-center",
      });
      return;
    }

    // Show confirmation modal
    Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update your information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
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
          walletAddress: localStorage.getItem("walletAddress"),
          code: refcode,
          email: email,
          phoneNumber: phoneNumber,
          displayName: displayName,
        });

        let config = {
          method: "post",
          url: `${API_ENDPOINT}management/updateRef`,
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
              localStorage.setItem("is_in_tree", "true");
              toast.success("Referral updated successfully!", {
                position: "top-center",
                autoClose: 1500,
                onClose: () => window.location.href = "/dashboard",
              });
            } else {
              setButtonDisabled(false);

              toast.error(response.data, {
                position: "top-center",
              });
            }
          })
          .catch((error) => {
            setButtonDisabled(false);
            toast.error(response.data, {
              position: "top-center",
            });
          });
      }
    });
  };

  return (
    <>
      <div className="bg-gray dark:bg-gray-800 dark:border-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="refcode"
            >
              Refcode
            </label>
            <input
              className="text-dark shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="refcode"
              type="text"
              placeholder="Refcode"
              value={refcode}
              readOnly
            />
          </div>

          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="rootDisplayName"
            >
              Root Display Name
            </label>
            <input
              className="text-dark shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="rootDisplayName"
              type="text"
              placeholder="Root Display Name"
              value={rootDisplayName}
              readOnly
            />
          </div>

          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="placementDisplayName"
            >
              Placement Display Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="placementDisplayName"
              type="text"
              placeholder="Placement Display Name"
              value={placementDislayName}
              readOnly
            />
          </div>

          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="side"
            >
              Side
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="side"
              type="text"
              placeholder="Side"
              value={side}
              readOnly
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="displayName"
          >
            Display name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="displayName"
            type="text"
            placeholder="Display name"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              setShowDisplayNameError(e.target.value === ""); // Update error state
            }}
          />
          {showDisplayNameError && (
            <p className="text-red-500 text-xs italic">
              **Display name field is required
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={updateHandle}
          >
            Update
          </button>
        </div>
      </div>

      {/* <ToastContainer /> */}
    </>
  );
};

export default Form;
