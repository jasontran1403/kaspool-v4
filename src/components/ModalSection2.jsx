import Modal from 'react-modal';

const ModalSection2 = ({ isOpen, onClose, header, isClosing }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={`Modal__Content Modal__Content__2 ${isClosing ? "closing" : "showing"}`}
      overlayClassName="Modal__Overlay" // Custom overlay class
      ariaHideApp={false} // This disables the aria-hidden on the app when the modal is open (optional)
    >
      <div className="Modal__Header" style={{ fontSize: "36px", textAlign: "left" }}>{header}</div>
      {/* <button className="Modal__CloseButton" onClick={onClose}>×</button> */}

      {/* Render HTML content safely */}
      <div
        className="Modal__Body]"
        style={{ lineHeight: "30px", textAlign: "left" }}
      >
        <h1 className=" mb-[20px]" style={{ fontSize: "14px", fontStyle: "italic" }}>A blockchain solution platform is a comprehensive software or infrastructure that enables businesses and developers to build</h1>
        <div className="item mb-[20px]">
          <p style={{ fontSize: "15px", fontWeight: "bolder" }}>MULTI-SOURCE MINING</p>
          <p className="pl-[20px]" style={{ fontSize: "14px", fontStyle: "italic", lineHeight: "20px" }}>KASPOOL will develop a digital asset mining system from various sources, leveraging the power of the community to optimize mining efforts.</p>
        </div>
        <div className="item mb-[20px]">
          <p style={{ fontSize: "15px", fontWeight: "bolder" }}>KASPOOL COIN</p>
          <p className="pl-[20px]" style={{ fontSize: "14px", fontStyle: "italic", lineHeight: "20px" }}>KASPOOL will incorporate the best technical criteria from Kaspa</p>
        </div>
        <div className="item mb-[20px]">
          <p style={{ fontSize: "15px", fontWeight: "bolder" }}>STABLE AND FAIR INVESTMENT VALUES</p>
          <p className="pl-[20px]" style={{ fontSize: "14px", fontStyle: "italic", lineHeight: "20px" }}>The main goal of Kaspool is to create an investment ecosystem that offers high returns while ensuring stability.</p>
        </div>
        <div className="item mb-[20px]">
          <p style={{ fontSize: "15px", fontWeight: "bolder" }}> SECURITY AND TRANSPARENCY</p>
          <p className="pl-[20px]" style={{ fontSize: "14px", fontStyle: "italic", lineHeight: "20px" }}>Kaspool will implement strict security principles similar to Kaspa, utilizing PoW (Proof-of-Work) technology with the kHeavyHash algorithm</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection2;
