const ToolSwitch = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  return (
    <div className="card-blue-green sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row mx-[20px] justify-between items-center h-full pt-[20px] pb-[20px]">
      <div className={`tool-item  ${props.active === 1 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(1)}>
          <img src={""} height={32} width={32} alt="balance" />
        </div>

        <div className={`tool-item  ${props.active === 2 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(2)}>
          <img src={""} height={32} width={32} alt="mining" />
        </div>

        <div className={`tool-item ${props.active === 3 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(3)}>
          <img src={""} height={32} width={32} alt="deposit" />
        </div>

        <div className={`tool-item ${props.active === 4 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(4)}>
          <img src={""} height={32} width={32} alt="withdraw" />
        </div>

        <div className={`tool-item ${props.active === 5 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchToolTab(5)}>
          <img src={""} height={32} width={32} alt="transfer" />
        </div>
      </div>
    </div>
  );
};

export default ToolSwitch;
