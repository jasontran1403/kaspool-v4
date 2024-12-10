import Affiliate from "./Affiliate";
import BinaryTree from "./BinaryTree";
import DirectTree from "./DirectTree";

const Net = (props) => {
    return (
        <>
            {props.selectedNetTab === "Affiliate" && <Affiliate
                totalMining={props.totalMining}
                directCommission={props.directCommission}
                binaryCommission={props.binaryCommission}
                leaderCommission={props.leaderCommission}
                popCommission={props.popCommission}
                dailyReward={props.dailyReward}
                teamSalesLeft={props.teamSalesLeft}
                teamSalesRight={props.teamSalesRight}
            />}
            {props.selectedNetTab === "Binary" && <BinaryTree />}
            {props.selectedNetTab === "Direct" && <DirectTree />}
        </>
    )
};

export default Net;