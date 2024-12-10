import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import { API_ENDPOINT } from "../constants";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionTableV2Withdraw = ({ TABLE_HEAD, TABLE_ROWS }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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


  const handleUpperCase = (text) => {
    return text.toUpperCase();
  }

  const [loadingCancel, setLoadingCancel] = useState(false);

  const handleCancelWithdraw = (code) => {
    if (code === "" || loadingCancel === true) return;

    setLoadingCancel(true);

    let config = {
      method: "get",
      url: `${API_ENDPOINT}management/cancel-withdraw/${code}/1`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    Axios.request(config)
      .then((response) => {
        if (response.data === "ok") {
          toast.success("Withdraw cancel successful!", {
            position: "top-right",
            autoClose: 1500,
            onClose: () => window.location.reload(),
          });
        } else {
          setLoadingCancel(false);
          toast.error(response.data, {
            position: "top-right",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        setLoadingCancel(false);

        toast.error("Please try again later!", {
          position: "top-right",
          autoClose: 1500,
        });
      });
  }

  return (
    <Card className="card-blue-green h-full w-full flex flex-col">
      <CardHeader floated={false} shadow={false} className="bg-transparent rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex w-full ">
            <div className="w-full md:w-72 relative">
              <Input
                placeholder="Search by code"
                className="pl-4 ml-20 w-3/4 pr-10 rounded"
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
      <CardBody className="flex-1 overflow-x-auto px-0 hide-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
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
              (
                {
                  code,
                  amount,
                  currency,
                  date,
                  fee,
                  toWallet,
                  status
                },
                index
              ) => {
                const isLast = index === currentRows.length - 1;
                const classes = isLast
                  ? "pt-4 pl-4 pr-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={code}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {code}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(date)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatNumber(amount)} {currency}
                      </Typography>

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <small style={{ fontStyle: "italic" }} >(Fee {formatNumber(fee)})</small>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        onClick={() => {
                          if (status === "pending") {
                            handleCancelWithdraw(code);
                          }
                        }}
                        className={`font-normal ${status === "pending" ? "text-yellow cursor-pointer font-bold" : status === "success" ? "text-green" : "text-red"}`}
                      >
                        {handleUpperCase(status)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {toWallet}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>

        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <Typography variant="small" color="blue-gray">
            Page {currentPage} of {totalPages}
          </Typography>

          <Button
            variant="outlined"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TransactionTableV2Withdraw;
