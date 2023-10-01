import { Viewer } from '@react-pdf-viewer/core';
import Dialog from '@mui/material/Dialog';
export default function FileViewerDialog({fileUrl, open, setOpen}) {
  const handleClose = () => {
    setOpen(false);
  };
  const fileExt = ()=>{
    let splits = fileUrl.split(".")
    let ext = splits[splits.length - 1]
    if(ext === "pdf"){
      return <PDF fileUrl={fileUrl}/>
    }else if(ext === "jpg" || ext === "jpeg" || ext === "png"){
      return <Image fileUrl={fileUrl} />
    }else if(ext === "mp4"){
      return <Video fileUrl={fileUrl} />
    }else{
      return <h1>file extension not supported</h1>
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <div >
        {fileExt()}
      </div>      
  </Dialog>
  );
}

function PDF({fileUrl}){
  return(
    <Viewer
        fileUrl={`${process.env.REACT_APP_BACKEND_URL}/file?path=${fileUrl}`}
      />
  )
}

function Image({fileUrl}){
  return(
    <img src={`${process.env.REACT_APP_BACKEND_URL}/file?path=${fileUrl}`}
    style={{width: "100%", height: "100%"}}
    />
  )
}

function Video({fileUrl}){
  return(
    <video controls
    style={{width: "100%", height: "100%"}}
    >
        <source src={`${process.env.REACT_APP_BACKEND_URL}/file?path=${fileUrl}`} type="video/mp4" />
    </video>
  )
}