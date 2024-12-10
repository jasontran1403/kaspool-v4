import React, { useState } from "react";

const Navigation = (props) => {
    const Menus = [
        { name: "Account", icon: "1", dis: "translate-x-0" },
        { name: "Affiliate", icon: "2", dis: "translate-x-16" },
        { name: "Dashboard", icon: "3", dis: "translate-x-32" },
        { name: "History", icon: "4", dis: "translate-x-64" },
        { name: "D&H", icon: "5", dis: "translate-x-80" },
    ];
    const [active, setActive] = useState(0);
    return (
        <div className="w-[90svw] mx-auto gray-opacity">
            <ul className="flex justify-around relative h-full items-center">
                {Menus.map((menu, i) => (
                    <li key={i} className="">
                        <a
                            className="flex flex-col text-center "
                            onClick={() => {
                                setActive(i);
                                props.handleSwitchNavbar(i + 1)
                            }}
                        >
                            <span
                                className={`pt-[20px] pb-[20px] text-l cursor-pointer duration-500 ${i === active && "drop-shadow-icon-2"
                                    }`}
                            >
                                <img src={`/navicon/${menu.icon}.png`} width={30} height={30} alt="" />
                            </span>

                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;