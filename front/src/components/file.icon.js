import * as React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FileViewerDialog from "./FileViewerDialog"

export default function File({name, fileUrl}){
    const [open, setOpen] = React.useState(false)
    const [showFile, setShowFile] = React.useState(false)
    return(
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        <HighlightOffIcon 
        style={{
            position: "absolute",
            marginLeft: "80px",
            marginTop: "5px",
            display: open ? "block" : "none",
            color: "red"
        }} />
        <InsertDriveFileIcon style={{width: "100px", height: "100px"}}  onClick={e=>{
            if(e.detail == 2){
                setShowFile(true)
            }
        }} />
        {name}
        <FileViewerDialog fileUrl={fileUrl} open={showFile} setOpen={setShowFile} />
        </div>
    )
} 