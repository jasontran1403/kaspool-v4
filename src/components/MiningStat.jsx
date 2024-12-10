const MiningStat = (props) => {
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
    <div className="animation-show-dashboard sm:w-[80svw] w-[80svw] sm:mb-[30px] mx-auto">
      {/* Use flex to arrange content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Row 1 */}
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales">Total Mining</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.personalSales)}</p>
        </div>
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales">Direct Commission</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.directCommission)}</p>
          {/* <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-md">Claim</button> */}
        </div>

        {/* Row 2 */}
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales">Daily Reward</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.personalReward)}</p>
        </div>
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales">Binary Commission</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.binaryCommission)}</p>
        </div>

        {/* Row 3 */}
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales-2">Team Sales Left</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.teamSalesLeft)}</p>
        </div>
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales">Leader Commission</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.leaderCommission)}</p>
        </div>

        {/* Row 4 */}
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales-2">Team Sales Right</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.teamSalesRight)}</p>
        </div>
        <div className="card-blue-green row-item p-4 rounded-md">
          <h3 className="text-white text-lg font-semibold sales">POP Commission</h3>
          <p className="text-white text-l font-bold" style={{ fontStyle: "italic" }}>{formatNumber(props.popCommission)}</p>
        </div>
      </div>
    </div>
  );
};

export default MiningStat;
