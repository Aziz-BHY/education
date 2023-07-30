import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function({description, title, modifiable, coursId}) {
  const deleteCours = ()=>{

  }
  const updateCours = ()=>{

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
            <Button size="small" onClick={updateCours}>Modifier</Button>
            <Button size="small" onClick={deleteCours}>Supprimer</Button>
          </>:
          <>
            <Button size="small">Chapitres</Button>
          </>
        }
      </CardActions>
    </Card>

    )
}