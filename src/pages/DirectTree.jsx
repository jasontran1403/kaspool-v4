import React, { useState, useEffect } from "react";
import styles from "../style";
import styled from "styled-components";

import { FooterDashboard, UserNavbar } from "../components";
import Form from "../components/Form";
import Modal from "react-modal";
import LockModal from "../components/LockModal";
import DirectTreeView from "../components/DirectTreeView";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    minWidth: "20svw",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const DirectTree = () => {
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
  const [modalIsOpen, setIsOpen] = useState();
  const [isInTree, setIsInTree] = useState(localStorage.getItem("is_in_tree"));
  const [isLock] = useState(localStorage.getItem("is_lock"));
  const [modalLock, setModalLock] = useState(false);
  const isSmallScreen = window.innerWidth <= 768;
  useEffect(() => {
    // Only proceed when notification is closed
    if (isInTree === "true") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    if (isLock === "true") {
      setModalLock(true);
    } else {
      setModalLock(false);
    }
  }, [isInTree, isLock]); // Trigger when notification modal closes

  const closeLockModal = () => {
    setModalLock(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function handleOpenModal(open) {
    closeLockModal();
  }

  return (
    <div className=" w-full h-full">
      <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
        <div className={`${styles.boxWidthDashboard}`}>
          <UserNavbar />
        </div>
      </div>

      {isLock === "true" ? (
        <LockModal
          isOpen={modalLock}
          onRequestClose={closeLockModal}
          contentLabel="Account lock"
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Ensure the content takes the full height of the modal
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: isSmallScreen ? "30px" : "40px", // Adjust line height based on screen size
                color: "orangered",
              }}
            >
              Your account is temporarily locked due to abusing a vulnerability
              for profit, please check your email for further details information about this situation.
            </p>
          </div>
        </LockModal>
      ) : isInTree === "true" ? (
        <div className={` ${styles.flexStart} bg-image lg:pt-[5svw] sm:pt-[2svw] pb-[30svw]`}>
          <div
            className={`${styles.boxWidthDashboard}`}
            style={{ overflowY: "scroll" }}
          >
            <DirectTreeView />
          </div>
        </div>
      ) : (
        <></>
        // Modal noti
      )}

      {isInTree === "true" && (
        <div className={`${styles.paddingX} ${styles.flexCenterNav}`}>
          <div className={`${styles.boxWidthDashboard}`}>
            <FooterDashboard />
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectTree;
