const Affiliate = () => {
    const data = [
        { name: "Total Mining" },
        { name: "Direct Commission" },
        { name: "Binary Commission" },
        { name: "Leader Commission" },
        { name: "POP Commission" },
        { name: "Daily Reward" },
        { name: "Team Sales Left" },
        { name: "Team Sales Right" },
    ];

    return (
        <div className="fadeIn">
            <div className="card-container">
                <div className="card-items-affiliate">
                    {data.map(({ name }) => (
                        <div key={name} className="affiliate-content">
                            <div className="cyptocurrency-currency-affiliate text-center">
                                <h4>{name}</h4>
                            </div>
                            <div className="cyptocurrency-balance">
                                <small>0.00</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Affiliate;
