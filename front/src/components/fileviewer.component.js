import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Viewer } from '@react-pdf-viewer/core';
import Dialog from '@mui/material/Dialog';
export default function MyApp({ fileUrl}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{width: "600px"}}>
      <Viewer
        fileUrl={`${process.env.REACT_APP_BACKEND_URL}/file?path${fileUrl}`}
      />
      </div>
      
  </Dialog>
  );
}