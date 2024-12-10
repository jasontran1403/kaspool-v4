import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

const TransactionTableV2Mining = ({
  TABLE_HEAD,
  TABLE_ROWS,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Filter rows based on search term
  const filteredRows = TABLE_ROWS.filter((row) =>
    row.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total pages
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Sliced rows for the current page
  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Next page handler
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page handler
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the time
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    // Format the date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return { time, date: formattedDate };
  };

  const formatNumber = (numberString) => {
    // Parse the input to ensure it's a number
    const number = parseFloat(numberString);

    if (isNaN(number)) return numberString; // Return original if parsing fails

    // Format the number with commas and two decimal places
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const shortenCode = (input) => {
    if (typeof input !== "string" || input.length < 8) {
      return input; // Return the input as is if it's not a string or too short
    }
    return input.substring(0, 3) + "..." + input.substring(input.length - 3);
  };

  const handleCopy = (input) => {
    navigator.clipboard.writeText(input)
      .then(() => {
        // You can also trigger a toast or visual feedback here if needed
        toast.success(`Mining history's code has been copied`, {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy: ", error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  return (
    <div className="fadeIn">
      <div className="card-container">
        <div className="card-items">
          <Card className="card-blue-green h-full w-full flex flex-col ">
            <CardHeader
              floated={false}
              shadow={false}
              className="bg-transparent rounded-none"
            >
              <div className="mb-[15px] mt-[15px] flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div className="flex w-full ">
                  <div className="w-full md:w-72 relative ">
                    <input
                      type="text"
                      placeholder="Search by code"
                      className="pl-4 w-full pr-10 rounded px-3 py-3 input-white"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on search
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="flex overflow-x-auto px-0 hide-scroll">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className={`border-y p-2 ${head === "Status" ? "text-right" : "text-left"}`}
                      >
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="min-h-[20rem]">
                  {currentRows.map(
                    ({ code, capital, currency, date, status }, index) => {
                      const isLast = index === currentRows.length - 1;
                      const classes = isLast
                        ? "pt-2 pl-2 pr-2 border-b pb-2"
                        : "p-2 border-b border-blue-gray-50";

                      return (
                        <tr key={code}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal cursor-pointer"
                            >
                              Mining
                            </Typography>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal cursor-pointer"
                              onClick={() => { handleCopy(code) }}
                            >
                              {shortenCode(code)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="white" className="font-normal">
                              {formatDate(date).time}
                            </Typography>
                            <Typography variant="small" color="white" className="font-normal">
                              {formatDate(date).date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              {formatNumber(capital)}
                            </Typography>
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              USDT
                            </Typography>
                          </td>
                          <td className={`${classes} status`}>
                            <Typography
                              variant="small"
                              color="white"
                              className={`font-normal ${status === "Running" ? "text-green" : "text-red"
                                }`}
                            >
                              {status === "Running" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                              </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                              </svg>}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-center border-blue-gray-50 mt-[-19px] mb-[-4px]">
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  color="white"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <Typography variant="small" color="white">
                  Page {currentPage} of {totalPages}
                </Typography>

                <Button
                  variant="outlined"
                  size="sm"
                  color="white"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionTableV2Mining;
