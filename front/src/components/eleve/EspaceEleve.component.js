import * as React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useJwt } from "react-jwt";
import { useCookies } from 'react-cookie';
import FileViewerDialog from "../FileViewerDialog"
export default function() {
    const [cookies] = useCookies(['education']);
    const { decodedToken } = useJwt(cookies.education);
    const [files, setFiles] = React.useState([])
    const [path, setPath] = React.useState("")
    const [showFile, setShowFile] = React.useState(false);
    const [showFolder, setShowFolder] = React.useState(false);
    const [folderName, setFolderName] = React.useState("");
    const [file, setFile] = React.useState("");
    React.useEffect(()=>{
        getFiles(path)
    }, [path, decodedToken])
    const deleteFile = (filename) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/upload/student/${decodedToken?.id}?path=${path}/${filename}`).then((res)=>{
            window.location.reload()
        })
    }
    const getFiles = (path) => {
        if(!decodedToken) return;
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/upload/student/${decodedToken?.id}?path=${path}`).then((res)=>{
            setFiles(res.data)
        })   
    }
    const changeDir = (folder) => {
        let newPath = path+"/"+folder;
        setPath(newPath)
        getFiles(newPath)    
    }
    const returnFolder = (index)=>{
        let folders = path.split("/").filter((folder)=>folder!="")
        let newPath = ""
        for(let i = 0; i <= index; i++){
            newPath += folders[i]+"/"
        }
        setPath(newPath)
    }
    return (
        <>
            <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary" onClick={()=>{
            setPath("")
        }}>Home</Typography>      
        {
        path.split("/").filter((folder)=>folder!="").map((item, index)=>{
            return(
                <Typography color="text.primary" onClick={()=>{
                    returnFolder(index)
                }}>{item}</Typography>
            )
            })
      }
      </Breadcrumbs>
      <div>
        <Button variant="contained" onClick={()=>{setShowFolder(true)}}>Créer un dossier</Button>
        <Button variant="contained" onClick={()=>{setShowFile(true)}}>Ajouter un fichier</Button>
      </div>
      {
        showFile ?
            <input type="file" name="file" id="file" onChange={e=>{
                const formData = new FormData();
                formData.append('file', e.target.files[0])
                formData.append('path', path)
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload/student/${decodedToken?.id}/file?path=${path}`, formData)
                .then(res => window.location.reload())
                .catch(err => console.error(err))
            }}/>
          : <></>
      }
      
      {
        showFolder ?
        <div>
            <input type="text" name="folder" id="folder" onChange={e=>setFolderName(e.target.value)}/>
            <Button variant="contained" onClick={()=>{
                if(!folderName){
                    return
                }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload/student/${decodedToken?.id}/folder`, {
                    path: path,
                    folder: folderName
                }).then((res)=>{
                    window.location.reload()
                })
            }}>Créer</Button>
        </div>
      : <></>
      }
      
    </div>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
           {files.map((file, index)=>(
               file.isDirectory ? <Folder name={file.item} changeDir={changeDir} deleteFile={deleteFile}/> : <File name={file.item} deleteFile={deleteFile} fileUrl={`students/${decodedToken?.id}${path}/${file.item}`} />
           ))}
        </div>
        </>
    )
}

function Folder({name, changeDir, deleteFile}){
    const [open, setOpen] = React.useState(false)
    return(
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}
        onMouseEnter={()=>{
            setOpen(true)
        }}
        onMouseLeave={()=>{
            setOpen(false)
        }}
        >
        <HighlightOffIcon
        onClick={()=>deleteFile(name)}
        style={{
            position: "absolute",
            marginLeft: "100px",
            marginTop: "5px",
            display: open ? "block" : "none",
            color: "red"
        }} />
        <FolderIcon style={{width: "100px", height: "100px"}} onClick={e=>{
            if(e.detail == 2){
                changeDir(name)
            }
        }} />
        {name}
        </div>
    )
}

function File({name, deleteFile, fileUrl}){
    const [open, setOpen] = React.useState(false)
    const [showFile, setShowFile] = React.useState(false)
    return(
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}
        onMouseEnter={()=>{
            setOpen(true)
        }}
        onMouseLeave={()=>{
            setOpen(false)
        }}
        >
        <HighlightOffIcon 
        onClick={()=>deleteFile(name)}
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

