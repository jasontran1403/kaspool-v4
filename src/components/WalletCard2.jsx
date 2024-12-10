const WalletCard2 = ({ content, amount, unit, rank, wallet }) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  return (
    <div className="w-full max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Use flex to arrange content */}
      <div className="flex flex-col justify-between h-full pb-10">
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium  dark:text-gray-200 text-white pt-10 text-center">
            {content}
          </h5>
          <span className="text-sm  dark:text-gray-200 text-white text-center">
            {formatNumber(amount)} {unit}
          </span>
        </div>

        {/* Button section - Centered */}
        {rank ?? (
          <div className="flex justify-center mt-4 md:mt-6">
            {/* <a
              href={isAdmin ? "/admin/deposit-kaspool/"+id : "/deposit-kaspool"}
              className="py-2 px-4 ms-2 text-sm font-medium  focus:outline-none bg-gray rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Deposit
            </a>
            */}
            <a
              href={isAdmin ? "/admin/withdraw-kaspool/"+id : "/withdraw-transfer"}
              className="py-2 px-4 ms-2 text-sm font-medium  focus:outline-none bg-gray rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Withdraw
            </a> 
            <a
              href={isAdmin ? "/admin/transfer/"+id : "/transfer"}
              className="py-2 px-4 ms-2 text-sm font-medium  focus:outline-none bg-gray rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Transfer
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletCard2;
