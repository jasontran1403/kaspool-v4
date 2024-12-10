import usdt from "../assets/icons/usdt.png";
import kaspa from "../assets/icons/kaspa.png";
import kaspool from "../assets/icons/kaspool.jpg";
import kasper from "../assets/icons/kasper.png";
import kaspy from "../assets/icons/kaspy.png";
import nacho from "../assets/icons/nacho.png";

const BalanceTab = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];
  
  const formatNumber = (numberString) => {
    // Parse the input to ensure it's a number
    const number = parseFloat(numberString);
  
    // Format the number with commas and two decimal places
    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  
    return formattedNumber;
  };

  return (
    <div className="card-blue-green sm:w-[80svw] w-[80svw] mx-auto animation-show-dashboard  flex flex-row justify-between items-center w-full h-full border border-gray-200 rounded-lg shadow">
      <div className="pl-[20px] pr-[20px] pt-[20px] pb-[20px] flex flex-col w-full gap-[20px]">
        <div className="balance-item">
          <div className="token-details">
            <img src={usdt} width={32} height={32} alt="" />
            <span>USDT-BEP20</span>
          </div>
          <div className="">
            <span>{formatNumber(props.usdt)}</span>
          </div>
        </div>
        <div className="balance-item">
          <div className="token-details">
            <img src={kaspa} width={32} height={32} alt="" />
            <span>KASPA</span>
          </div>
          <div className="">
            <div className="balance-details">
              <span>{formatNumber(props.kaspa)}</span>
              <small style={{ fontStyle: "italic" }}>~{formatNumber(props.kaspa * props.ratioKaspa)}USDT</small>
            </div>
          </div>
        </div>

        <div className="balance-item">
          <div className="token-details">
            <img src={kaspool} width={32} height={32} alt="" />
            <span>KASPOOL</span>
          </div>
          <div className="">
            <div className="balance-details">
              <span>{formatNumber(props.kaspa)}</span>
              <small style={{ fontStyle: "italic" }}>~{formatNumber(props.kaspa * props.ratioKaspa)}USDT</small>
            </div>
          </div>
        </div>

        <div className="balance-item">
          <div className="token-details">
            <img src={nacho} width={32} height={32} alt="" />
            <span>NACHO</span>
          </div>
          <div className="">
            <div className="balance-details">
              <span>{formatNumber(props.nacho)}</span>
              <small style={{ fontStyle: "italic" }}>~{formatNumber(props.nacho * props.ratioNacho)}USDT</small>
            </div>
          </div>
        </div>

        <div className="balance-item">
          <div className="token-details">
            <img src={kaspy} width={32} height={32} alt="" />
            <span>KASPY</span>
          </div>
          <div className="">
            <div className="balance-details">
              <span>{formatNumber(props.kaspy)}</span>
              <small style={{ fontStyle: "italic" }}>~{formatNumber(props.kaspy * props.ratioKaspy)}USDT</small>
            </div>
          </div>
        </div>

        <div className="balance-item">
          <div className="token-details">
            <img src={kasper} width={32} height={32} alt="" />
            <span>KASPER</span>
          </div>
          <div className="">
            <div className="balance-details">
              <span>{formatNumber(props.kasper)}</span>
              <small style={{ fontStyle: "italic" }}>~{formatNumber(props.kasper * props.ratioKasper)}USDT</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTab;
