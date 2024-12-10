import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import TrustWalletConnect from "../components/TrustWalletConnect";
import logo from "../landingpage-assets/img/resources/logo-white.png";
import Dashboard from "../components/v2/Dashboard";
import HashLoader from "react-spinners/HashLoader";
import User from "../components/v2/User";
import Net from "../components/v2/Net";
import His from "../components/v2/His";
import Down from "../components/v2/Down";
import SubNav from "../components/v2/SubNav";
import { API_ENDPOINT } from "../constants";
import { MultiTabDetectContext } from "../components/MultiTabDetectContext";

const listUserNav = ["User Information"];
const listDasNav = ["Balance", "Mining", "Claim", "Withdraw", "Transfer"];
const listHisNav = ["Mining", "Claim", "Withdraw", "Transfer"];
const listNetNav = ["Affiliate", "Binary", "Direct"];

const Home = () => {
    const { multiTabDetect } = useContext(MultiTabDetectContext);

    const [walletAddress, setWalletAddress] = useState(
        localStorage.getItem("walletAddress")
    );
    const [selectedCheckbox, setSelectedCheckbox] = useState("das");
    const [loading, setLoading] = useState(false);
    const [selectedUserTab, setSelectedUserTab] = useState("User Information");
    const [selectedNetTab, setSelectedNetTab] = useState("Affiliate");
    const [selectedDasTab, setSelectedDasTab] = useState("Balance");
    const [selectedHisTab, setSelectedHisTab] = useState("Mining");

    const [rank, setRank] = useState(0);
    const [totalMining, setTotalMining] = useState(0);
    const [totalReward, setTotalReward] = useState(0);
    const [totalCommission, setTotalCommission] = useState(0);
    const [maxout, setMaxout] = useState(0);
    const [direct, setDirect] = useState(0);
    const [binary, setBinary] = useState(0);
    const [leader, setLeader] = useState(0);
    const [teamSalesLeft, setTeamSalesLeft] = useState(0);
    const [teamSalesRight, setTeamSalesRight] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [pop, setPop] = useState(0);
    const [usdt, setUsdt] = useState(0);
    const [dailyReward, setDailyReward] = useState(0);
    const [transfer, setTransfer] = useState(0);
    const [totalDirect, setTotalDirect] = useState(0);
    const [totalBinary, setTotalBinary] = useState(0);
    const [totalLeader, setTotalLeader] = useState(0);
    const [totalPop, setTotalPop] = useState(0);
    const [displayName, setDisplayName] = useState("");
    const [root, setRoot] = useState("");
    const [leftRefLink, setLeftRefLink] = useState("");
    const [rightRefLink, setRightRefLink] = useState("");
    const [kaspaWallet, setKaspaWallet] = useState("");
    const [usdtWallet, setUsdtWallet] = useState("");
    const [bep20, setBep20] = useState("");
    const [connectedBalance, setConnectedBalance] = useState(0);

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
                let usdtResponse = response.data.balances[0].balance;
                let directResponse = response.data.balances[2].balance;
                let binaryResponse = response.data.balances[3].balance;
                let leaderResponse = response.data.balances[4].balance;
                let popResponse = response.data.balances[5].balance;
                let transferResponse = response.data.balances[6].balance;
                let maxoutResponse = response.data.balances[7].balance;
                let rewardResponse = response.data.balances[8].balance;
                setUsdt(usdtResponse);
                setDirect(directResponse);
                setBinary(binaryResponse);
                setLeader(leaderResponse);
                setPop(popResponse);
                setMaxout(maxoutResponse);
                setDailyReward(rewardResponse);
                setTransfer(transferResponse);

                setTotalReward(response.data.totalReward);
                setTotalDirect(response.data.totalDirect);
                setTotalBinary(response.data.totalBinary);
                setTotalLeader(response.data.totalLeader);
                setTotalPop(response.data.totalPop);
                setRank(response.data.rank);
                setTeamSalesLeft(response.data.leftTeamSales);
                setTeamSalesRight(response.data.rightTeamSales);
                setTotalSales(response.data.totalSales);
                setTotalMining(response.data.totalMining);

                setDisplayName(response.data.displayName);
                setRoot(response.data.root);
                setKaspaWallet(response.data.kaspaWallet ? response.data.kaspaWallet : "");
                setUsdtWallet(response.data.walletAddress);
                setBep20(response.data.bep20);
                setLeftRefLink(response.data.leftRefLink);
                setRightRefLink(response.data.rightRefLink);
                setConnectedBalance(response.data.connectedBalance);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleTabClick = (tabName, type) => {
        if (type === 1) {
            setSelectedNetTab(tabName);
        } else if (type === 2) {
            setSelectedDasTab(tabName);
        } else {
            setSelectedHisTab(tabName);
        }
    };

    const handleCheckboxChange = (id) => {
        if (loading) return;
        setLoading(true);

        setTimeout(() => {
            setSelectedNetTab("Affiliate");
            setSelectedDasTab("Balance");
            setSelectedHisTab("Mining");
            setSelectedCheckbox(id);
            setLoading(false);
        }, 1000);
    };

    if (loading) {
        return (
            <div className="page-container-2">
                {/* Top Container */}
                <div className="top-container">
                    <div className="wallet-container">
                        <TrustWalletConnect />
                    </div>
                    {rank > 0 ?
                        <div className="relative flex flex-row">
                            <img
                                src={`/${rank}.png`}
                                alt="kaspool"
                                style={{ width: "70px", height: "70px", marginTop: "10px" }}
                            />
                            {rank > 0 && (
                                <span className="absolute top-[5px] right-[5px] bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                                    {rank}
                                </span>
                            )}
                        </div>
                        :
                        <img
                            src={logo}
                            alt="kaspool"
                            className="flex lg:w-[120px] lg:h-[100px] w-[60px] h-[40px]"
                        />}
                </div>

                <HashLoader color="#36d7b7" loading={loading} size={50} />

                {/* Dock */}
                <div className="dock">
                    <div className="buttons">
                        {[
                            { id: "user", icon: "user_icon.png" },
                            { id: "net", icon: "net_icon.png" },
                            { id: "das", icon: "das_icon.png" },
                            { id: "his", icon: "his_icon.png" },
                            { id: "down", icon: "down_icon.png" },
                        ].map(({ id, icon }) => (
                            <label key={id}>
                                <input
                                    type="checkbox"
                                    name="check"
                                    className="checkbox"
                                    id={id}
                                    checked={selectedCheckbox === id}
                                    onChange={() => handleCheckboxChange(id)}
                                />
                                <span className={id}></span>
                                <img src={`/icon_menu/${icon}`} alt={id} />
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            {/* Top Container */}
            <div className="top-container">
                <div className="wallet-container">
                    <TrustWalletConnect />
                </div>
                {rank > 0 ?
                    <div className="relative flex flex-row">
                        <img
                            src={`/${rank}.png`}
                            alt="kaspool"
                            style={{ width: "70px", height: "70px", marginTop: "10px" }}
                        />
                        {rank > 0 && (
                            <span className="absolute top-[5px] right-[5px] bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                                {rank}
                            </span>
                        )}
                    </div>
                    :
                    <img
                        src={logo}
                        alt="kaspool"
                        className="flex lg:w-[120px] lg:h-[100px] w-[60px] h-[40px]"
                    />}
            </div>
            {/* {selectedCheckbox === 'user' && <SubNav listNav={listUserNav} selectedTab={selectedUserTab} handleTabClick={handleTabClick} type={0} />} */}
            {selectedCheckbox === 'net' && <SubNav listNav={listNetNav} selectedTab={selectedNetTab} handleTabClick={handleTabClick} type={1} />}
            {selectedCheckbox === 'das' && <SubNav listNav={listDasNav} selectedTab={selectedDasTab} handleTabClick={handleTabClick} type={2} />}
            {selectedCheckbox === 'his' && <SubNav listNav={listHisNav} selectedTab={selectedHisTab} handleTabClick={handleTabClick} type={3} />}

            {selectedCheckbox === 'user' &&
                <User
                    totalSales={totalSales}
                    usdtWallet={usdtWallet}
                    leftRefLink={leftRefLink}
                    rightRefLink={rightRefLink}
                    kaspaWallet={kaspaWallet}
                    displayName={displayName}
                    maxout={maxout}
                    root={root}
                />}

            {selectedCheckbox === 'net' && <Net
                selectedNetTab={selectedNetTab}
                totalMining={123123.321}
                directCommission={234234.432}
                binaryCommission={345345.543}
                leaderCommission={456456.654}
                popCommission={567567.765}
                dailyReward={678678.876}
                teamSalesLeft={789789.987}
                teamSalesRight={890890.098}
            />}

            {selectedCheckbox === 'das' &&
                <Dashboard
                    selectedDasTab={selectedDasTab}
                    connectedBalance={connectedBalance}
                    directCommission={direct}
                    binaryCommission={binary}
                    leaderCommission={leader}
                    popCommission={pop}
                    dailyReward={dailyReward}
                    transferWallet={transfer}
                    totalMining={totalMining}
                    usdt={usdt}
                    bep20={bep20}
                    usdtWallet={usdtWallet}
                    kaspaWallet={kaspaWallet}
                />}

            {selectedCheckbox === 'his' && <His
                selectedHisTab={selectedHisTab}
            />}

            {selectedCheckbox === 'down' && <Down />}


            {/* Dock */}
            <div className="dock">
                <div className="buttons">
                    {[
                        { id: "user", icon: "user_icon.png" },
                        { id: "net", icon: "net_icon.png" },
                        { id: "das", icon: "das_icon.png" },
                        { id: "his", icon: "his_icon.png" },
                        { id: "down", icon: "down_icon.png" },
                    ].map(({ id, icon }) => (
                        <label key={id}>
                            <input
                                type="checkbox"
                                name="check"
                                className="checkbox"
                                id={id}
                                checked={selectedCheckbox === id}
                                onChange={() => handleCheckboxChange(id)}
                            />
                            <span className={id}></span>
                            <img src={`/icon_menu/${icon}`} alt={id} />
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
