import React, {useEffect, useState} from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Table from "../table.component"
const StudentColumns = [
    { field: 'name', headerName: 'Nom', width: 130 },
    { field: 'email', headerName: 'Email', width: 250 },    
];
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
export default function({data, classeId}) {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState("")
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/student`).then(res=>{
            setStudents(res.data)
        })
    }   
    , [])
    const Submit = ()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/classe/student`, {
            student: student,
            classe: classeId
        }).then(res=>{
            window.location.reload()
        })
        .catch(err=>{
            console.error(err)
        })
        
    }
    const deleteStudent = ()=>{
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/classe/student`, {
            data: {
                student: rowSelectionModel[0],
                classe: classeId
            }
        }).then(res=>{
            window.location.reload()
        }).catch(err=>{
            console.error(err)
        })
    }
    return(
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Ajouter Etudiant</Button>
            <Button variant="contained" color="error" disabled={rowSelectionModel.length != 1} onClick={deleteStudent}>Supprimer Etudiant</Button>
            <Table columns={StudentColumns} data={data} rowSelectionModel={rowSelectionModel} setRowSelectionModel={setRowSelectionModel} />
            <BootstrapDialog
        onClose={()=>{
          setOpen(false)}}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>setOpen(false)}>
          Ajouter un etudiant
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <select onChange={e=>setStudent(e.target.value)}>
                    <option>---Selectionner un étudiant---</option>
                    {students.map(student=>(
                        <option key={student._id} value={student._id}>{student.name}</option>
                    ))}
                </select>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=>Submit()}>
                Terminer
            </Button>
            </DialogActions>
        </BootstrapDialog>
        </div>
    )
}