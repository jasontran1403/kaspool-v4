import TransferUSDTItem from "./TransferUSDTItem";

const ToolTabTransfer = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  return (
    <div className="sm:w-[80svw] w-[80svw] mx-auto sm:mb-[30px]  animation-show-dashboard border border-gray-200 rounded-lg shadow card-blue-green flex flex-row justify-between items-center w-full h-full">
      <div className="w-full pt-[20px] pb-[20px] pl-[20px] pr-[20px]">
        <TransferUSDTItem />
      </div>
    </div>
  );
};

export default ToolTabTransfer;
