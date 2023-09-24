import axios from 'axios';
import * as React from 'react';
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
import Table from "../table.component"
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
    const [parents, setParents] = React.useState([]);
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [rowSelectionModel, setRowSelectionModel] = React.useState([])
    const [id, setId] = React.useState("")
    const Submit = ()=>{
      if(!name || !email || !password){
        alert("Veuillez remplir tous les champs")
        return;
      }
      if(id){
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
          email,
          name,
          password,
      }).then(res =>{
          setName("")
          setEmail("")
          setPassword("")
          setId("")
          setOpen(false)
      }).catch(err=>{
          console.error(err)
      })
      }else{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            email,
            name,
            password,
            role: "parent"
        }).then(res =>{
            setOpen(false)
        }).catch(err=>{
            console.err(err)
        })
      }
    } 
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/parent`).then(res => {
            setParents(res.data);
    }).catch(err => {
        console.log(err);
    })
    }, [])
    const deleteUser = ()=>{
      let promises = []
      for(let user in rowSelectionModel){
        promises.push(axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${rowSelectionModel[user]}`))
      }
      Promise.all(promises).then(res=>{
        window.location.reload()
      
      })
    }
    const updateUser = ()=>{
      let parent = parents.find(e=>e._id === rowSelectionModel[0])
      setName(parent.name)
      setEmail(parent.email)
      setId(parent._id)
      setOpen(true)
      console.log(parent)
    }
    return (
        <>
        <Button disabled={rowSelectionModel.length === 0} variant="contained" color="error" onClick={deleteUser}>Supprimer</Button>
        <Button disabled={rowSelectionModel.length != 1} variant="contained" onClick={updateUser}>Modifier</Button>
        <Table columns={columns} data={parents} rowSelectionModel={rowSelectionModel} setRowSelectionModel={setRowSelectionModel}/>
        <BootstrapDialog
        onClose={()=>{
          setEmail("")
          setPassword("")
          setId("")
          setName("")
          setOpen(false)
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>setOpen(false)}>
          Ajouter un Parent
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <input type="text" placeholder="nom" onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
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