import Modal from 'react-modal';

const ModalSection3 = ({ isOpen, onClose, header, isClosing }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={`Modal__Content Modal__Content__3 ${isClosing ? "closing" : "showing"}`}
      overlayClassName="Modal__Overlay" // Custom overlay class
      ariaHideApp={false} // This disables the aria-hidden on the app when the modal is open (optional)
    >
      <div className="Modal__Header" style={{ fontSize: "36px" }}>{header}</div>
      {/* Render HTML content safely */}
      <div
        className="Modal__Body"
        style={{ lineHeight: "30px" }}
      >
        <h1 style={{ fontSize: "15px", fontStyle: "italic" }}>Kaspool utilizes the BlockDAG platform and references GhostDAG technology, which minimizes the waste of computational resources and creates parallel blocks. This enables the processing of a large volume of transactions without issues related to network congestion or orphan blocks.</h1>
      </div>
    </Modal>
  );
};

export default ModalSection3;
