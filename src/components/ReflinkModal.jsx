import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); // Slight dark overlay for contrast
  display: flex;
  justify-content: center;
  align-items: center; // Centering the modal
`;

const ModalContainer = styled(motion.div)`
  width: 50%;
  height: 50%;
  left: 25%;
  position: relative;
  overflow: hidden; // Ensures the border animation stays within the container
  transform: translate(-50%, -60%); // Centering in the middle of the screen
  z-index: 999999999
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%", transition: { duration: 1 } }, // Set the duration to 1 second for showing
  exit: { top: "-50%", transition: { duration: 0.5 } }, // Optional: Adjust exit duration if needed
};

const ReflinkModal = ({ children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ReflinkModal;
