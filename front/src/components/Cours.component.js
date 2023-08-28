import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function({description, title, modifiable, coursId, updateCours}) {
  const navigate = useNavigate();

  const deleteCours = ()=>{
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cours/${coursId}`).then(res=>{
      window.location.reload();
    })
  }

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {
          modifiable? 
          <>
            <Button size="small" onClick={()=>updateCours(coursId)}>Modifier</Button>
            <Button size="small" onClick={deleteCours}>Supprimer</Button>
          </>:
          <>
            <Button size="small" onClick={()=> navigate(`/cours/${coursId}/chapitres`)}>Chapitres</Button>
          </>
        }
      </CardActions>
    </Card>

    )
}