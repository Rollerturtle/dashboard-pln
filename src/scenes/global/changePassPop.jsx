import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';

const ChangePasswordDialog = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = () => {
    // Tambahkan logika untuk update password di sini
    onClose();
  };

  return (
    <Dialog  open={open}
    onClose={onClose}
    PaperProps={{
      sx: { borderRadius: 5 }
    }}>
      <DialogTitle>
        <Typography variant="h3" sx={{ textAlign: 'center', color: '#FF5B4C' }}>
          Reset Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Old Password"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="New Password (min. 6 characters)"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} sx={{ color: '#A5D36A' }}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} sx={{ color: '#FF5B4C' }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
