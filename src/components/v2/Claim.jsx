import { useContext, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import Axios from "axios";
import { MultiTabDetectContext } from "../MultiTabDetectContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Claim = (props) => {
    const { multiTabDetect } = useContext(MultiTabDetectContext);
    const [loading, setLoading] = useState(false);

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

    const handleClaim = () => {
        if (multiTabDetect) {
            toast.error("Multiple browser tab was opend, please close all old browser tab", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (loading) return;

        setLoading(true);

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
            } else {
                setLoading(false);
            }
        });
    };

    return (
        <div className="fadeIn">
            {/* Card Container */}
            <div className="card-container">
                <div className="card-items">
                    {["Direct Commission", "Binary Commission", "Leader Commission", "POP Commission", "Daily Reward", "Transfer Wallet"].map(
                        (title) => (
                            <div key={title} className="card-content pt-[10px] pb-[10px]">
                                <h4>{title}</h4>
                                {title === "Direct Commission" && <p className="italic">{formatNumber(props.directCommission)} USDT</p>}
                                {title === "Binary Commission" && <p className="italic">{formatNumber(props.binaryCommission)} USDT</p>}
                                {title === "Leader Commission" && <p className="italic">{formatNumber(props.leaderCommission)} USDT</p>}
                                {title === "POP Commission" && <p className="italic">{formatNumber(props.popCommission)} USDT</p>}
                                {title === "Daily Reward" && <p className="italic">{formatNumber(props.dailyReward)} USDT</p>}
                                {title === "Transfer Wallet" && <p className="italic">{formatNumber(props.transferWallet)} USDT</p>}
                            </div>
                        )
                    )}
                    
                </div>
            </div>
            <button className="button-89 mt-[10px] pb-[20px]" onClick={handleClaim} >Claim All</button>
        </div>
    )
};

export default Claim;