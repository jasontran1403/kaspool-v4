import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_ENDPOINT } from "../constants";

const DirectTreeView = () => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [walletAddress] = useState(localStorage.getItem("walletAddress")); // Fetching from local storage
  const [access_token] = useState(localStorage.getItem("access_token")); // Fetching from local storage
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
  useEffect(() => {
    const fetchData = async () => {
      await fetchTreeData(walletAddress); // Fetch the tree data on component mount
    };

    fetchData();
  }, []);

  const fetchTreeData = async (address) => {
    setLoading(true); // Set loading to true when starting to fetch
    let config = {
      method: "get",
      url: `${API_ENDPOINT}auth/direct-tree/${address}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "ngrok-skip-browser-warning": "69420",
      },
    };

    try {
      const response = await Axios.request(config);
      setTreeData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };

  const handleToggleExpand = (walletAddress) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [walletAddress]: !prev[walletAddress],
    }));
  };

  const renderTree = (node) => (
    <div key={node.walletAddress} className="ml-1 mb-2">
      <div className={`flex items-center text-white space-x-2 cursor-pointer ${expandedNodes[node.walletAddress] ? "" : ""}`}>
        {node.listF1 && node.listF1.length > 0 && (
          <button
            onClick={() => handleToggleExpand(node.walletAddress)}
            className="focus:outline-none text-blue-500 font-bold"
          >
            {expandedNodes[node.walletAddress] ? (
              <span className="text-xl text-white">−</span>
            ) : (
              <span className="text-xl text-white">+</span>
            )}
          </button>
        )}
        <span className="text-lg font-semibold">
          {node.displayName} ({formatNumber(node.sales)}) ({formatNumber(node.teamSales)})
        </span>
      </div>

      {expandedNodes[node.walletAddress] && node.listF1 && (
        <div className="ml-6 mt-2">
          {node.listF1.map((childNode) => renderTree(childNode))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full animation-show-dashboard">
      <div className="">
        {loading ? ( // Show loading spinner if loading is true
          <div className="flex items-center justify-center" style={{ height: '39svw' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          treeData && renderTree(treeData) // Render the tree structure
        )}
      </div>
    </div>
  );
};

export default DirectTreeView;
