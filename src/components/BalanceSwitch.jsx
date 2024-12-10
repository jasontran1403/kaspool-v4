const BalanceSwitch = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  return (
    <div className="card-blue-green sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] border border-gray-200 rounded-lg shadow">
      <div className="flex flex-row mx-[50px] justify-between items-center h-full pt-6 pb-6">
        <div className={`tool-item  ${props.active === 1 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchBalanceTab(1)}>
          <img src={mining} height={32} width={32} alt="mining" />
        </div>

        <div className={`tool-item  ${props.active === 2 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchBalanceTab(2)}>
          <img src={deposit} height={32} width={32} alt="claim" />
        </div>

        <div className={`tool-item  ${props.active === 3 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchBalanceTab(3)}>
          <img src={withdraw} height={32} width={32} alt="withdraw" />
        </div>
        <div className={`tool-item  ${props.active === 4 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchBalanceTab(4)}>
          <img src={transfer} height={32} width={32} alt="transfer" />
        </div>
      </div>
    </div>
  );
};

export default BalanceSwitch;
