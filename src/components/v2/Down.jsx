import downloadIcon from "../../assets/icons/download.png";

const Down = () => {
    const handleDownloadFile = () => {
        const filePath = "src/assets/Introduction.pdf";

        const link = document.createElement("a");
        link.href = filePath;
        link.download = "KASPOOL_INTRODUCTION.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadFileOverview = () => {
        const filePath = "src/assets/Overview.pdf";

        const link = document.createElement("a");
        link.href = filePath;
        link.download = "KASPOOL_OVERVIEW.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fadeIn">
            {/* Card Container */}
            <div className="card-container">
                <div className="card-items">
                    <h1 className="text-white text-[44px]">Documents</h1>
                    <div className="card-items-down">
                        {["Introduction", "Overview"].map(
                            (title) => (
                                <div key={title} className="card-content-down">
                                    <h4>{title}</h4>
                                    {title === "Introduction" && <img className="cursor-pointer" src={downloadIcon} width={32} height={32} alt={title} onClick={handleDownloadFile} />}
                                    {title === "Overview" && <img className="cursor-pointer" src={downloadIcon} width={32} height={32} alt={title} onClick={handleDownloadFileOverview} />}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Card Container */}
            <div className="card-container">
                <div className="card-items">
                    <h1 className="text-white text-[44px]">Hashrate</h1>
                    <h4 className="text-white text-small italic">Coming Soon</h4>
                </div>
            </div>
        </div>
    )
};

export default Down;