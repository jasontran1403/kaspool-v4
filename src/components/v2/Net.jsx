import Affiliate from "./Affiliate";
import BinaryTree from "./BinaryTree";
import DirectTree from "./DirectTree";

const Net = (props) => {
    return (
        <>
            {props.selectedNetTab === "Affiliate" && <Affiliate />}
            {props.selectedNetTab === "Binary" && <BinaryTree />}
            {props.selectedNetTab === "Direct" && <DirectTree />}
        </>
    )
};

export default Net;