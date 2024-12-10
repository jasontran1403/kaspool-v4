const RankCard = ({ content, rank }) => {
  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  return (
    // <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   {rank > 0 ? <><div className="flex flex-col items-center pb-10"><h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white pt-10">
    //     VIP {formatNumber(rank)}
    //   </h5>
    //     <span className="text-sm text-gray-500 dark:text-gray-400">
    //       {/* VIP {formatNumber(rank)} */}
    //     </span> <img
    //       src={rankImages[rank]} // Access the image based on the rank value
    //       alt={`Rank ${rank - 1}`} // Add an alt attribute for accessibility
    //       className="max-w-[80px] max-h-[80px] min-w-[80px] min-h-[80px]"
    //     /> </div></> : <></>}

    // </div>
    <></>
  );
};

export default RankCard;
