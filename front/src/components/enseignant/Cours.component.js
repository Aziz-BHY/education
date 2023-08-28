import { Button } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ChapitreComponent from './Chapitre.component';

export default function() {
    const { id } = useParams();
    const [cours, setCours] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cours/${id}`)
            .then(res => {
                setCours(res.data)
            }            
            )
            .catch(err=> console.error(err))
    }, []);
    return (
        <div>
            <h1>Cours: {cours?.name}</h1>
            <Button variant="contained" color="primary" onClick={()=>{window.location.href = `/cours/${id}/chapitres/new`}}>Nouveau chapitre</Button>
            {cours?.chapitres.map((chapitre, i) => (
               <ChapitreComponent chapitre={chapitre} coursId={cours._id}/> 
            ))}
        </div>
    )
}