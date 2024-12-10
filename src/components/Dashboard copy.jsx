const Dashboard = () => {

    return (
        <>
            {/* Card Container */}
            <div className="card-container">
                <div className="card-items">
                    {["Connected Wallet", "Transfer Wallet", "Total Mining"].map(
                        (title) => (
                            <div key={title} className="card-content">
                                <h4>{title}</h4>
                                <p>0.00</p>
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
                                <img src={`../src/assets/icons/${icon}`} alt={name} />
                                <h4>{name}</h4>
                            </div>
                            <div className="cyptocurrency-balance">
                                <h4>0.00</h4>
                                <small>~ 0.00USDT</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Dashboard;