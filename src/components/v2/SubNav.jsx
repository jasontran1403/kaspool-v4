const SubNav = ({ listNav, selectedTab, handleTabClick, type }) => {
    const formatString = (input) => {
        return input.replace(" ", "");
    }
    return (
        <div className="bottom-tap-bar">
            {
                listNav.map((tab) => (
                    <div
                        key={tab}
                        className={`tab ${selectedTab === tab ? "expanded" : ""}`}
                        onClick={() => handleTabClick(tab, type)}
                    >
                        <img
                            className={`icon-${tab.toLowerCase()}`}
                            src={`../src/assets/iconmenu/${selectedTab === tab ? "white" : "black"}/${formatString(tab).toLowerCase()}.png`}
                            alt={tab}
                        />
                        <span className="text">{tab}</span>
                    </div>
                ))
            }
        </div>
    )
};

export default SubNav;