

const AffiliateSwitch = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  return (
    <div className="sm:w-[80svw] mx-auto sm:mb-[30px] w-[80svw]">
      <div className="flex flex-row mx-[20px] justify-between items-center h-full">
        <div className={`tool-item  ${props.active === 1 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchAffiliateTab(1)}>
          <img src={summary} width={32} height={32} alt="sumary" />
        </div>

        <div className={`tool-item  ${props.active === 2 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchAffiliateTab(2)}>
          <img src={binary} width={32} height={32} alt="binary" />
        </div>

        <div style={{ transform: "rotate(180deg)" }} className={`tool-item  ${props.active === 3 ? "drop-shadow-icon duration-500" : ""}`} onClick={() => props.handleSwitchAffiliateTab(3)}>
          <img src={direct} width={32} height={32} alt="direct" />
        </div>
      </div>
    </div>
  );
};

export default AffiliateSwitch;
