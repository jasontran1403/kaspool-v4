const Affiliate = (props) => {
    const data = [
        { id: "totalMining", name: "Total Mining" },
        { id: "directCommission", name: "Direct Commission" },
        { id: "binaryCommission", name: "Binary Commission" },
        { id: "leaderCommission", name: "Leader Commission" },
        { id: "popCommission", name: "POP Commission" },
        { id: "dailyReward", name: "Daily Reward" },
        { id: "teamSalesLeft", name: "Team Sales Left" },
        { id: "teamSalesRight", name: "Team Sales Right" },
    ];

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
            <div className="card-container">
                <div className="card-items-affiliate">
                    {data.map(({ name, id }) => (
                        <div key={name} className="affiliate-content-2" >
                            <div className="cyptocurrency-currency-affiliate text-center">
                                <h4>{name}</h4>
                            </div>
                            <div className="cyptocurrency-balance">
                                {id === "totalMining" && <small>{`${formatNumber(props.totalMining)}`}</small>}
                                {id === "directCommission" && <small>{`${formatNumber(props.directCommission)}`}</small>}
                                {id === "binaryCommission" && <small>{`${formatNumber(props.binaryCommission)}`}</small>}
                                {id === "leaderCommission" && <small>{`${formatNumber(props.leaderCommission)}`}</small>}
                                {id === "popCommission" && <small>{`${formatNumber(props.popCommission)}`}</small>}
                                {id === "dailyReward" && <small>{`${formatNumber(props.dailyReward)}`}</small>}
                                {id === "teamSalesLeft" && <small>{`${formatNumber(props.teamSalesLeft)}`}</small>}
                                {id === "teamSalesRight" && <small>{`${formatNumber(props.teamSalesRight)}`}</small>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Affiliate;
