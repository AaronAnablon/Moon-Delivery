import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BiMessage } from 'react-icons/bi';

const DeleteConfirmation = ({ onConfirm, params, message }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    onConfirm(params);
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning Delete!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
