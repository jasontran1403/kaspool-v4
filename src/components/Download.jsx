import download from "../assets/icons/download.png";

const Download = (props) => {
  const isAdmin = window.location.href.includes('/admin');
  const id = location.pathname.split('/admin/dashboard/')[1];

  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  const formatDate = (dateString) => {
    // Create a new Date object
    const date = new Date(dateString);

    // Format the time
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

    return formattedDate;
  };

  const handleDownloadFile = () => {
    // Define the file path
    const filePath = "src/assets/KASPOOL_INTRODUCTION.pdf";

    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = filePath; // Set the href to the file path
    link.download = "KASPOOL_INTRODUCTION.pdf"; // Optional: Set the file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  const handleDownloadFileOverview = () => {
    // Define the file path
    const filePath = "src/assets/KASPOOL_OVERVIEW.pdf";

    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = filePath; // Set the href to the file path
    link.download = "KASPOOL_OVERVIEW.pdf"; // Optional: Set the file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };



  return (
    <div className="card-blue-green sm:w-[80svw] w-[80svw] flex flex-col sm:mb-[30px] mx-auto border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-white text-xl flex document pt-[20px] pb-[10px] pl-[20px] pr-[20px]">Documents</h3>
      <div className="flex flex-row w-full justify-around items-center documents pt-[10px] pb-[20px] pl-[20px] pr-[20px]">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => handleDownloadFile()} >
          <h5 className="mb-1 text-xl font-medium dark:text-gray-200 text-white text-center">
            Introdution
          </h5>
          <img src={download} width={32} height={32} alt="" />
        </div>

        <div className="flex flex-col items-center cursor-pointer" onClick={() => handleDownloadFileOverview()} >
          <h5 className="mb-1 text-xl font-medium dark:text-gray-200 text-white text-center">
            Overview
          </h5>
          <img src={download} width={32} height={32} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Download;
