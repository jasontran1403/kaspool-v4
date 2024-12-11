import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import "../assets/css/TreeView.css";
import { API_ENDPOINT } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import ReflinkModal from "./ReflinkModal";
import { toast, ToastContainer } from "react-toastify";

const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const Tree = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress")
  );
  const [publicKey, setPublicKey] = useState(localStorage.getItem("publicKey"));
  const [walletStateInit, setWalletStateInit] = useState(
    localStorage.getItem("walletStateInit")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [prevWallets, setPrevWallets] = useState([]); // Stack to hold previous wallet addresses
  const [currWallet, setCurrWallet] = useState(walletAddress);
  const [userRoot, setUserRoot] = useState({});
  const [root, setRoot] = useState({});
  const [treeData, setTreeData] = useState(null);
  const [modalReflink, setModalReflink] = useState(false);
  const [refInfo, setRefInfo] = useState({});
  const [currentShow, setCurrentShow] = useState(1);

  useEffect(() => {
    fetchTreeByRoot(currWallet); // Fetch tree using current wallet
  }, []);

  const fetchTreeByRoot = (rootAddress) => {
    if (rootAddress === "") return;

    let data = JSON.stringify({
      walletAddress: rootAddress,
    });

    let config = {
      method: "post",
      url: `${API_ENDPOINT}management/userMapDown5Level`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (response.data.root !== undefined) {
          setPrevWallets((prev) => [...prev, currWallet]); // Push current wallet to prev wallets stack
          setTreeData(response.data.root);
          setUserRoot(response.data.root.userInfo);
          if (Object.keys(root).length === 0) {
            setRoot(response.data.root.userInfo);
          }
        } else {
          toast.error("Cannt find this wallet address or display name", {
            position: "top-right",
            autoClose: 1800
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeReflinkModal = () => {
    setModalReflink(false);
  };

  function handleOpenModal(open) {
    closeReflinkModal();
  }

  const isSmallScreen = window.innerWidth <= 768;

  const handleGenerateRefLink = (rootId, placementId, side) => {
    if (!rootId || !placementId || !side) return;

    let data = JSON.stringify({
      rootWalletAddress: rootId,
      placementWalletAddress: placementId,
      side: side,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINT}management/generate-ref-link`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: data,
    };

    Axios.request(config)
      .then((response) => {
        if (!response.data) {
          toast.error("Rootid or placementid doesnt existed", {
            position: "top-right",
            autoClose: 1500,
          });
        } else {
          setRefInfo(response.data);
          setModalReflink(true);
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };

  const handleCopyRefLink = (refCode) => {
    const currentUrl = `${window.location.origin}/refcode=${refCode}`;

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        // You can also trigger a toast or visual feedback here if needed
        toast.success("Referral link copied to clipboard", {
          position: "top-right",
          autoClose: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy referral link: ", error, {
          position: "top-right",
          autoClose: 1500,
        });
      });
  };


  const handleClick = (address) => {
    setCurrWallet(address); // Update current wallet to the new address
    fetchTreeByRoot(address);
  };

  const handleGoBack = () => {
    if (findValue != "") setFindValue("");
    setPrevWallets((prev) => {
      if (prev.length === 0) return prev; // No previous wallets
      const lastWallet = prev[prev.length - 1]; // Get the last wallet
      setCurrWallet(lastWallet); // Set it as current wallet
      fetchTreeByRoot(lastWallet);
      return prev.slice(0, -1); // Remove the last wallet from the stack
    });
  };

  const [findValue, setFindValue] = useState("");

  const handleSearch = () => {
    setPrevWallets((prev) => [...prev, localStorage.getItem("walletAddress")]);
    fetchTreeByRoot(findValue);
  };

  const formatNumber = (numberString) => {
    // Format the number with commas
    const formattedNumber = new Intl.NumberFormat("en-US").format(numberString);
    return formattedNumber;
  };

  const renderTree = (node, depth = 0, position = 0, parent, side) => {
    if (depth > currentShow) return null; // Limit depth to 5 levels (0-4)

    const displayName = node?.userInfo?.displayName || null;

    return (
      <li key={`${depth}-${position}`} >
        <div className={`node  ${!displayName ? "placeholder" : ""} `}>
          {displayName ? (
            <a
              className="glass-2 card-blue-green"
              onClick={() => {
                handleClick(node.userInfo.walletAddress);
              }}
            >
              <p style={{ color: "green" }}>{displayName}</p>

              <p className="sponsor" style={{ color: "green" }}>
                {node.userInfo?.rootDisplayName || "N/A"}
              </p>
              <p className="sponsor">Sales: {node.userInfo?.sales || 0}</p>
              <p className="sponsor">
                Left: {formatNumber(node.userInfo?.teamSalesLeft) || 0}
              </p>
              <p className="sponsor">
                Right: {formatNumber(node.userInfo?.teamSalesRight) || 0}
              </p>
            </a>
          ) : parent ? (
            <a className="card-blue-green"
              onClick={() => {
                handleGenerateRefLink(root.walletAddress, parent, side);
              }}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                style={{ color: "green", fontSize: "30px", paddingTop: "30px" }}
              />
            </a>
          ) : (
            <a></a>
          )}
        </div>
        <ul>
          {/* Render left subtree */}
          {renderTree(
            node?.left,
            depth + 1,
            position * 2,
            node?.userInfo.walletAddress,
            "left"
          )}
          {/* Render right subtree */}
          {renderTree(
            node?.right,
            depth + 1,
            position * 2 + 1,
            node?.userInfo.walletAddress,
            "right"
          )}
        </ul>
      </li>
    );
  };

  return (
    <div className={`tree  ${currentShow == 3 ? "tree-2" : currentShow == 4 ? "tree-3" : "tree"} animation-show-dashboard tree-view-item`}>
      <div className="glass-button-container">
        <button
          className="glass-button-2"
          onClick={handleGoBack}
          disabled={prevWallets.length === 0}
        >
          Back
        </button>

        <div className="glass-button-2">
          <input
            style={{ backgroundColor: "transparent", width: "100%", border: "none", outline: "none" }}
            type="text"
            placeholder="Search by wallet address"
            value={findValue}
            onChange={(e) => setFindValue(e.target.value)}
          />
          <svg
            onClick={handleSearch}
            disabled={findValue.length === 0}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="cursor-pointer bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>


      </div>
      <ul className="tree-ul"  >
        {renderTree(treeData)} {/* Render the entire tree */}
      </ul>

      <ReflinkModal
        isOpen={modalReflink}
        onRequestClose={closeReflinkModal}
        contentLabel="Reflink information"
      >
        <CloseButton
          onClick={(e) => handleOpenModal(false)}
          style={{ zIndex: "9999" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20.39 20.39"
        >
          <title>X</title>
          <line
            x1="19.39"
            y1="19.39"
            x2="1"
            y2="1"
            fill="none"
            stroke="#5c3aff"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            x1="1"
            y1="19.39"
            x2="19.39"
            y2="1"
            fill="none"
            stroke="#5c3aff"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </CloseButton>
        <section
          className={`card-blue-green rounded-lg `}
        >
          <div className="flex flex-col">
            <div className=" rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <label className="block text-white text-sm font-bold mb-2">
                  Display name of root
                </label>
                <input
                  className="bg-white text-dark appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={refInfo.rootDisplayName}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2">
                  Display name of placement
                </label>
                <input
                  className="bg-white text-dark appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={refInfo.placementDisplayName}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2">
                  Side
                </label>
                <input
                  className="bg-white text-dark  appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={refInfo.side}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2">
                  Reflink
                </label>
                <div className="flex flex-row items-center relative">
                  <input
                    className="bg-white text-dark shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={`https://www.kaspool.io/refcode=${refInfo.code}`}
                    readOnly
                    onClick={() => handleCopyRefLink(refInfo.code)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ReflinkModal>
      {/* <ToastContainer stacked /> */}
    </div>
  );
};

export default Tree;
