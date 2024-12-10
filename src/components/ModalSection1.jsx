import Modal from 'react-modal';

const ModalSection1 = ({ isOpen, onClose, header, isClosing  }) => {
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={`Modal__Content Modal__Content__1 section-1 ${isClosing ? "closing" : "showing"}`}
      overlayClassName="Modal__Overlay" // Custom overlay class
      ariaHideApp={false} // This disables the aria-hidden on the app when the modal is open (optional)
    >
      
      <div className="Modal__Header" style={{ fontSize: "36px",textAlign: "right" }}>{header}</div>

      <div
        className="Modal__Body"
        style={{ lineHeight: "30px", textAlign: "right" }}
      >
        <div className="item">
          <p>Kaspool is a platform for mining digital assets through coin mining pools. With a coin based on Kaspa's DAG technology, it represents a pioneering approach to enhancing performance without sacrificing decentralization. Kaspool is committed to providing opportunities for quick and sustainable profits.</p>
        </div>
        <div className="item modal-1-content">
          <p style={{ fontSize: "15px", fontStyle: "italic" }}> Privacy and Security</p>
          <p style={{ fontSize: "15px", fontStyle: "italic" }}> Cost and Complexity</p>
        </div>
        <div className="item modal-1-content">
          <p style={{ fontSize: "15px", fontStyle: "italic" }}> Immutable Data</p>
          <p style={{ fontSize: "15px", fontStyle: "italic" }}> Regulatory Compliance</p>
        </div>
        <div className="item modal-1-content">
          <p style={{ fontSize: "15px", fontStyle: "italic" }}> Interoperability</p>
          <p style={{ fontSize: "15px", fontStyle: "italic" }}> Energy Consumption</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection1;
