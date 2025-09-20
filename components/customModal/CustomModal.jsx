import React from "react";
import { Modal, Box } from "@mui/material";

const CustomModal = ({ open, onClose, title, children, width = 400 }) => {
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h5>{title}</h5>
        </Box>
        <Box mt={2}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
