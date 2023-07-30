import * as React from 'react';
import Table from "../table.component"
import axios from 'axios';
import CoursComponent from '../Cours.component';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
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

const columns = [
    { field: 'name', headerName: 'Nom', width: 130 },
    { field: 'email', headerName: 'Email', width: 250 },
];

export default function() {
    const [profs, setProfs] = React.useState([]);
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [rowSelectionModel, setRowSelectionModel] = React.useState([])
    const Submit = ()=>{
        axios.post("http://localhost:5000/users", {
            email,
            name,
            password,
            role: "teacher"
        }).then(res =>{
            setOpen(false)
        }).catch(err=>{
            console.err(err)
        })
    }
    React.useEffect(()=>{
        axios.get('http://localhost:5000/users/teacher').then(res => {
            setProfs(res.data);
    }).catch(err => {
        console.log(err);
    })
    }, [])
    return (
        <>
        <Button disabled={rowSelectionModel.length === 0} variant="contained" color="error" onClick={()=>setOpen(true)}>Supprimer</Button>
        <Button disabled={rowSelectionModel.length != 1} variant="contained" onClick={()=>setOpen(true)}>Modifier</Button>
        <Table rows={columns} data={profs} rowSelectionModel={rowSelectionModel} setRowSelectionModel={setRowSelectionModel}/>
        <BootstrapDialog
        onClose={()=>setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>setOpen(false)}>
          Ajouter un cours
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <input type="text" placeholder="nom" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=>Submit()}>
                Terminer
            </Button>
            </DialogActions>
        </BootstrapDialog>
            <Avatar
             sx={{ bgcolor: "#2566cb", width: "50px", height: "50px"  }}
             onClick={() => setOpen(true)}
             >+</Avatar>
        </>
    )
}