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

export default function() {
    const [cours, setCours] = React.useState([]);
    const [profs, setProfs] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [prof, setProf] = React.useState("");
    React.useEffect(() => {
        axios.get('http://localhost:5000/cours')
            .then(res => {
                setCours(res.data);
                console.log(res.data)
            }
        )
        axios.get('http://localhost:5000/users/teacher')
            .then(res => {
                setProfs(res.data);
            }
            )
    }, [])

    const Submit = () => {
        axios.post('http://localhost:5000/cours', {
            name: title,
            description: description,
            teacher: prof
        })
        setOpen(false);
    }
    return (
        <>

            {cours.map(c => (
               <CoursComponent key={c.id} description={c.description} title={c.name} modifiable={true} coursId={c.id}/>
            ))}
            <BootstrapDialog
        onClose={()=>setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>setOpen(false)}>
          Ajouter un cours
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <input type="text" placeholder="Titre" onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />
            <select onChange={(e)=>setProf(e.target.value)}>
                <option value={""}>---Choisir un professeur---</option>
                {profs.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                    ))
                }
            </select>
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