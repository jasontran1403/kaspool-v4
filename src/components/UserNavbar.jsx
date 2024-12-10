import { useState, useEffect } from "react";
import Axios from "axios";
import { close, menu } from "../assets";
import logo from "../landingpage-assets/img/resources/logo-white.png";
import { newUserNavLinks } from "../constants";
import { API_ENDPOINT } from "../constants";
import TrustWalletConnect from "./TrustWalletConnect";
import { useLocation, Navigate } from "react-router-dom";

const UserNavbar = (props) => {
  const locationRef = useLocation();

  // Extract the full path after "/"
  const fullPath = locationRef.pathname.slice(11); // Remove leading "/"
  // Check if the path matches "refcode=<actual-code>"
  const refcodeMatch = fullPath.match(/^refcode=(.+)$/);

  const refcode = refcodeMatch ? refcodeMatch[1] : null;

  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wallet] = useState(localStorage.getItem("walletAddress"));
  const isAdmin = window.location.href.includes("/admin");
  const id = location.pathname.split("/admin/dashboard/")[1];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <nav className="w-full flex flex-1 justify-between items-center navbar">
      <a href="/" className="">
        <img
          src={logo}
          alt="hoobank"
          className="ml-[200px] hidden md:flex lg:w-[120px] lg:h-[100px] w-[60px] h-[40px] logo-glow"
        />
      </a>
      <ul className="list-none sm:flex hidden justify-center items-center flex-1 mx-10">
        {newUserNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px]  ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === newUserNavLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => {
              setActive(nav.title);
              handleOpenModal(true, index);
            }}
          >
            {/* {isAdmin ? (
              <a href={`/admin/${nav.id}/${id}`}>{nav.title}</a>
            ) : refcode !== null && nav.id === "dashboard" ? (
              <a href={`/${nav.id}/refcode=${refcode}`}>{nav.title}</a>
            ) : (
              <a href={`/${nav.id}`}>{nav.title}</a>
            )} */}
            <span onClick={() => props.handleSwitchNavbar(nav.index + 1)}>{nav.title}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-end items-center user-nav">
        <p className="blc-btn blc-btn-connect">
          <TrustWalletConnect transparent={true} label={"connect"} />
        </p>
      </div>
    </nav>
  );
};

export default UserNavbar;
