const His = () => {

    return (
        <div className="fadeIn">
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

            
        </div>
    )
};

export default His;