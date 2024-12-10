import Balance from "./Balance";
import Mining from "./Mining";
import Claim from "./Claim";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";

const Dashboard = (props) => {
    return (
        <>
            {props.selectedDasTab === "Balance" && <Balance
                connectedBalance={props.connectedBalance}
                transferWallet={props.transferWallet}
                totalMining={props.totalMining}
                usdt={props.usdt}
            />}
            {props.selectedDasTab === "Mining" && <Mining 
                connectedBalance={props.connectedBalance}
                usdtWallet={props.usdtWallet}
                bep20={props.bep20}
            />}
            {props.selectedDasTab === "Claim" && <Claim
                directCommission={props.directCommission}
                binaryCommission={props.binaryCommission}
                leaderCommission={props.leaderCommission}
                popCommission={props.popCommission}
                dailyReward={props.dailyReward}
                transferWallet={props.transferWallet}
            />}
            {props.selectedDasTab === "Withdraw" && <Withdraw
                usdtWallet={props.usdtWallet}
                usdtBalance={props.usdt}
                kaspaWallet={props.kaspaWallet}
            />}
            {props.selectedDasTab === "Transfer" && <Transfer
                usdtBalance={props.usdt}
                transferWallet={props.transferWallet}
            />}
        </>
    )
};

export default Dashboard;