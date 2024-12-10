import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import { API_ENDPOINT } from "../../constants";
import { MultiTabDetectContext } from "../MultiTabDetectContext";

const Withdraw = (props) => {
    const formatNumber = (numberString) => {
        const number = parseFloat(numberString);

        const formattedNumber = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);

        return formattedNumber;
    };

    const { multiTabDetect } = useContext(MultiTabDetectContext);
    const [currentWallet, setCurrentWallet] = useState("");
    const [currentkaspaWallet, setCurrentKaspaWallet] = useState("");

    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState(
        localStorage.getItem("walletAddress")
    );
    const [networkSelected, setNetworkSelected] = useState("");
    const [fee, setFee] = useState(0);
    const [currency, setCurrency] = useState("");
    const [estimateReceive, setEstimateReceive] = useState(0);

    const [walletSource] = useState([
        { id: 1, name: "USDT BEP20" }
    ]);

    const [listNetwork] = useState([
        { id: 1, name: "Binance Smart Chain" },
        { id: 2, name: "Kaspa Chain" },
    ]);

    useEffect(() => {
        setNetworkSelected(listNetwork[0].id);
        setCurrentWallet(props.usdtWallet);
        setCurrentKaspaWallet(props.kaspaWallet);
        setCurrency("USDT");
    }, []);

    const [amount, setAmount] = useState(0);
    const [kasPrice, setKasPrice] = useState(0);

    useEffect(() => {
        if (networkSelected == 1) {
            let feeAmount = amount * 2 / 100;
            let actualFee = feeAmount > 1 ? feeAmount : 1
            setFee(amount > 4 ? actualFee : 0);
            setCurrency("USDT");
            setEstimateReceive(amount > 4 && (amount - actualFee) > 0 ? (amount - actualFee) : 0)
        } else {
            let feeAmount = amount / kasPrice * 2 / 100;
            let actualFee = feeAmount > 1 ? feeAmount : 1
            setFee(amount > 4 ? actualFee : 0);
            setCurrency("KAS");
            setEstimateReceive(amount > 4 && (amount / kasPrice - actualFee) > 0 ? (amount / kasPrice - actualFee) : 0)
        }
    }, [networkSelected, props.usdtWallet, amount, kasPrice]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchKasPrice();
        }, 15000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        fetchKasPrice();
    }, []);


    const fetchKasPrice = () => {
        let config = {
            method: 'get',
            url: `${API_ENDPOINT}management/get-kas-price`,
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("access_token")}`,
                "ngrok-skip-browser-warning": "69420",
            },
        };

        Axios.request(config)
            .then((response) => {
                setKasPrice(response.data);
            });
    };

    const handleWithdraw = () => {
        if (multiTabDetect) {
            toast.error("Multiple browser tab was opend, please close all old browser tab", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        if (loading) return;

        setLoading(true);

        if (walletAddress === "") {
            toast.error("Wallet address must not be null", {
                position: "top-right",
                autoClose: 1500,
            });
            setLoading(false);
            return;
        }

        if (amount <= 0) {
            toast.error("Withdraw order amount must be greater than 0", {
                position: "top-right",
                autoClose: 1500,
            });
            setLoading(false);
            return;
        }

        Swal.fire({
            title: 'Confirm withdraw',
            text: `Are you sure you want to withdraw ${amount} to ${networkSelected == 1 ? currentWallet : currentkaspaWallet}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm withdraw!',
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
                    walletAddress: walletAddress,
                    toWalletAddress: networkSelected == 1 ? currentWallet : currentkaspaWallet,
                    amount: amount,
                    method: networkSelected,
                    walletType: networkSelected,
                    type: 1,
                });

                let config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: `${API_ENDPOINT}management/withdraw`,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            `Bearer ${localStorage.getItem("access_token")}`,
                        "ngrok-skip-browser-warning": "69420",
                    },
                    data: data,
                };

                Axios
                    .request(config)
                    .then((response) => {
                        if (response.data === "ok") {
                            toast.success("Create withdraw order successful!", {
                                position: "top-right",
                                autoClose: 1500,
                                onClose: () => window.location.reload(),
                            });
                        } else {

                            toast.error(response.data, {
                                position: "top-right",
                                autoClose: 1500,
                                onClose: () => {
                                    setLoading(false);
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        toast.error("Please try again later", {
                            position: "top-right",
                            autoClose: 1500,
                            onClose: () => {
                                setLoading(false);
                            }
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
                    <div className="card-content-transaction mt-[20px]">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="packageName"
                        >
                            Wallet Type
                        </label>
                        <div className="w-full">
                            <select
                                className=" shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="packageName"
                                value={networkSelected}
                                onChange={(e) => setNetworkSelected(e.target.value)}
                            >
                                {walletSource.map((network) => (
                                    <option key={network.id} value={network.id}>
                                        {network.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Balance
                        </label>
                        <div className="w-full">
                            <input
                                className="bg-gray-400 text-dark shadow appearance-none   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text"
                                value={formatNumber(props.usdtBalance)}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="packageName"
                        >
                            Network
                        </label>
                        <div className="w-full">
                            <select
                                className=" shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        </div>
                    </div>
                    {networkSelected == 1 ? <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Wallet Address
                        </label>
                        <div className="w-full">
                            <input
                                className="bg-gray-300 text-dark shadow appearance-none   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text"
                                placeholder="Wallet address that recevive that withdraw order amount"
                                value={currentWallet}
                                readOnly
                                disabled
                            />
                        </div>
                    </div> : <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Wallet Address
                        </label>
                        <div className="w-full">
                            <input
                                className="bg-white text-dark shadow appearance-none   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text"
                                placeholder="Wallet address that recevive that withdraw order amount"
                                value={currentkaspaWallet}
                                onChange={(e) => {
                                    setCurrentKaspaWallet(e.target.value);
                                }}
                            />
                        </div>
                    </div>}

                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Amount
                        </label>
                        <div className="relative w-full">
                            <input
                                className="bg-white text-dark shadow appearance-none  rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tokenBalance"
                                type="text" // Use "text" to fully control input validation
                                value={amount}
                                min="0.1"
                                onChange={(e) => {
                                    const value = e.target.value;

                                    // Regex to allow only numbers and decimals
                                    const regex = /^[0-9]*\.?[0-9]*$/;

                                    // Check if the input value matches the regex (valid number format)
                                    if (regex.test(value)) {
                                        const numericValue = parseFloat(value);
                                        if (!isNaN(numericValue) && numericValue > 0) {
                                            setAmount(value); // Keep the valid input
                                        } else {
                                            setAmount(""); // Reset if invalid
                                        }
                                    }
                                }}
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
                                USDT
                            </span>
                        </div>
                    </div>

                    <div className="card-content-transaction">
                        <label
                            className="block text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Receive
                        </label>
                        <div className="flex flex-col w-full">
                            <div className="relative">
                                <input
                                    className="bg-gray-400 text-dark shadow appearance-none  rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tokenBalance"
                                    type="text" // Use "text" to fully control input validation
                                    value={estimateReceive}
                                    min="0.1"
                                    readOnly
                                    disabled
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
                                    {currency}
                                </span>
                            </div>
                            {networkSelected == 2 && <small style={{ fontSize: "12px", fontStyle: "italic", color: "white", textAlign: "left" }}>Current KAS Price 1KAS ~ {kasPrice.toFixed(5)}USDT</small>}
                        </div>
                    </div>

                    <div className="flex flex-row w-full">
                        <label
                            className="block min-w-[30svw] pt-[5px] text-white text-sm font-bold mb-2"
                            htmlFor="tokenBalance"
                        >
                            Fee
                        </label>

                        <div className="flex flex-col w-full mb-[20px]">
                            <div className="relative">
                                <input
                                    className="bg-gray-400 text-dark shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tokenBalance"
                                    type="text" // Use "text" to fully control input validation
                                    value={fee}
                                    min="0.1"
                                    disabled
                                    readOnly
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
                                    {currency}
                                </span>
                            </div>
                            <small style={{ fontSize: "12px", fontStyle: "italic", color: "white", textAlign: "left" }}>Fee 2% of total withdrawal amount, min is 1.00USDT</small>
                        </div>
                    </div>

                </div>

            </div>
            <div className="flex items-center justify-between">
                <button onClick={handleWithdraw} className="button-89 mt-[10px] pb-[20px]">Withdraw</button>
            </div>
        </div>
    )
};

export default Withdraw;