import Modal from "react-modal";
import cto from "../landingpage-assets/img/resources/cto.jpg";
import coo from "../landingpage-assets/img/resources/coo.jpg";
import ceo from "../landingpage-assets/img/resources/ceo.jpg";


const ModalSection4 = ({ isOpen, onClose, header, isClosing }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={`Modal__Content Modal__Content__3 ${
        isClosing ? "closing" : "showing"
      }`}
      overlayClassName="Modal__Overlay" // Custom overlay class
      ariaHideApp={false} // This disables the aria-hidden on the app when the modal is open (optional)
    >
      <div className="Modal__Header" style={{ fontSize: "36px" }}>
        {header}
      </div>

      <div className="Modal__Body" style={{ lineHeight: "20px" }}>
        <div className="item">
          <p style={{ fontSize: "15px", fontStyle: "bolder" }}>
            The key personnel team will accompany you throughout the development
            process.
          </p>
        </div>
        <div className="member-container mt-[30px]">
          <div className="team-member">
            <img className="thumbnail" src={cto} alt="" />
            <span className="details-name">DAVID HARRISON</span>
            <span className="details-title">CTO</span>
          </div>
          <div className="team-member">
            <img className="thumbnail" src={ceo} alt="" />
            <span className="details-name">MICHAEL REYNOLDS</span>
            <span className="details-title">CEO</span>
          </div>
          <div className="team-member">
            <img className="thumbnail" src={coo} alt="" />
            <span className="details-name">JESSICA CARTER</span>
            <span className="details-title">COO</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection4;
