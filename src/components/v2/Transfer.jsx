import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINT } from "../../constants";
import { MultiTabDetectContext } from "../MultiTabDetectContext";

const Transfer = (props) => {
    const { multiTabDetect } = useContext(MultiTabDetectContext);

    const [loading, setLoading] = useState(false);
    const [walletAddress] = useState(localStorage.getItem("walletAddress"));
    const [to, setTo] = useState("");
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [fee, setFee] = useState(0);
    const [networkSelected, setNetworkSelected] = useState("1");

    const [listNetwork, setListNetwork] = useState([
        { id: 1, name: "USDT BEP20" },
        // { id: 2, name: "Transfer" },
    ]);
    const [transfer, setTransfer] = useState();
    const [currentBalance, setCurrentBalance] = useState(0);
    const [amountSwap, setAmountSwap] = useState(0);

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

    const handleCreateTransfer = () => {
        if (multiTabDetect) {
            toast.error("Multiple browser tab was opend, please close all old browser tab", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (loading) return;

        if (amount <= 0) {
            toast.error("Swap amount must > 0!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                    setLoading(false);
                }
            });
            return;
        }

        if (amount > currentBalance) {
            toast.error("Swap amount must <= balance!", {
                position: "top-right",
                autoClose: 1500,
                onClose: () => {
                    setLoading(false);
                }
            });
            return;
        }

        setLoading(true);

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
                            toast.success("Transfer success!", {
                                position: "top-right",
                                autoClose: 1500,
                                onClose: () => {
                                    window.location.reload();
                                },
                            });
                        } else {
                            toast.error(response.data, {
                                position: "top-right",
                                autoClose: 1500,
                                onClose: () => {
                                    setLoading(false);
                                },
                            });
                        }
                    })
                    .catch((error) => {
                        toast.error("Please try again later", {
                            position: "top-right",
                            autoClose: 1500,
                            onClose: () => {
                                setLoading(false);
                            },
                        });
                    });
            } else {
                setLoading(false);
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
        if (to) {
            const timer = setTimeout(() => {
                handleGetDisplayName();
            }, 1200);

            // Cleanup timeout when `to` changes or component unmounts
            return () => clearTimeout(timer);
        }
    }, [to]);

    useEffect(() => {
        if (networkSelected == 1) {
            setCurrentBalance(props.usdtBalance);
        } else {
            setCurrentBalance(props.transferWallet);
        }
    }, [networkSelected, props.usdtBalance, props.transferWallet]);

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

    return (
        <div className="fadeIn">
            <div className="card-container">
                <div className="card-items">
                    <div className="card-content-transaction pt-[20px]">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="packageName"
                        >
                            Wallet source
                        </label>
                        <div className="w-full">
                            <select
                                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    </div>

                    <div className="card-content-transaction">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="tokenBalance">
                            Balance
                        </label>
                        <div className="w-full">
                            <input
                                className="bg-gray-400 text-dark shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text"
                                value={formatNumber(currentBalance)}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Transfer to
                        </label>
                        <div className="flex items-center w-full">
                            <input
                                className="bg-white w-full py-2 px-3 text-gray-700"
                                id="tokenBalance"
                                type="text"
                                placeholder="Display name or wallet address"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Display name of Receiver
                        </label>
                        <div className="w-full">
                            <input
                                className="bg-gray-400 text-dark shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text"
                                value={displayName}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="card-content-transaction mb-[20px]">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="tokenBalance">
                            Amount
                        </label>
                        <div className="w-full">
                            <input
                                className="bg-white text-dark shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text"
                                value={amount}
                                onChange={(e) => {
                                    handleChangeAmount(e.target.value);
                                }}
                            /></div>
                    </div>

                </div>
                
            </div>
            <div className="flex items-center justify-between">
                    <button onClick={handleCreateTransfer} className="button-89 mt-[10px] pb-[20px]">Transfer</button>
                </div>
        </div>
    )
};

export default Transfer;