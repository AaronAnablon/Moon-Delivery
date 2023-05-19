import React from 'react';
import { Modal } from 'react-bootstrap';

const FullScreenImage = ({ src, onClose }) => {
  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <img src={src} alt="Full screen" style={{ width: '100%' }} />
      </Modal.Body>
    </Modal>
  );
};

export default FullScreenImage;
