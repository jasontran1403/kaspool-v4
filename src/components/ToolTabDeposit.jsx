import DepositUSDTItem from "./DepositUSDTItem";

const ToolTabDeposit = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  return (
    <div className="sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] animation-show-dashboard border border-gray-200 rounded-lg card-blue-green flex flex-row justify-between items-center w-full h-full">
      <div className="w-full pt-[20px] pb-[20px] pl-[20px] pr-[20px]">
        <DepositUSDTItem
          directCommission={props.directCommission}
          binaryCommission={props.binaryCommission}
          leaderCommission={props.leaderCommission}
          popCommission={props.popCommission}
          dailyReward={props.dailyReward}
          transferWallet={props.transferWallet}
        />
      </div>
    </div>
  );
};

export default ToolTabDeposit;
