const Balance = (props) => {
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

    return (
        <div className="fadeIn">
            {/* Card Container */}
            <div className="card-container">
                <div className="card-items">
                    {["Connected Wallet", "Transfer Wallet", "Total Mining"].map(
                        (title) => (
                            <div key={title} className="card-content">
                                <h4>{title}</h4>
                                {title === "Connected Wallet" && <p className="italic">{formatNumber(props.connectedBalance)} USDT</p>}
                                {title === "Transfer Wallet" && <p className="italic">{formatNumber(props.transferWallet)} USDT</p>}
                                {title === "Total Mining" && <p className="italic">{formatNumber(props.totalMining)} USDT</p>}
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Card Container Internal */}
            <div className="card-container-internal">
                <div className="card-items">
                    {[
                        { name: "USDT BEP20", icon: "usdt.png" },
                        { name: "KASPA", icon: "kaspa.png" },
                        { name: "KASPOOL", icon: "kaspool.jpg" },
                        { name: "NACHO", icon: "nacho.png" },
                        { name: "KASPY", icon: "kaspy.png" },
                        { name: "KASPER", icon: "kasper.png" },
                    ].map(({ name, icon }) => (
                        <div key={name} className="card-content">
                            <div className="cyptocurrency-currency">
                                <img src={`/icons/${icon}`} alt={name} />
                                <h4>{name}</h4>
                            </div>
                            <div className="cyptocurrency-balance">
                                {name == "USDT BEP20" ? <h4>{formatNumber(props.usdt)}</h4> : <h4>0.00</h4>}
                                {name !== "USDT BEP20" && <small>~ 0.00USDT</small>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Balance;