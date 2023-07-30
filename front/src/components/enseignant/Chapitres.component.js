import { Button } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
export default function() {
    const { id } = useParams();
    const [cours, setCours] = React.useState(null);
    React.useEffect(() => {
        axios.get(`http://localhost:5000/cours/${id}`)
            .then(res => setCours(res.data))
            .catch(err=> console.error(err))
    }, []);
    
    return (
        <div>
            <h1>Cours: {cours?.name}</h1>
            <Button variant="contained" color="primary" onClick={()=>{window.location.href = `/cours/${id}/chapitres/new`}}>Nouveau chapitre</Button>
            {cours?.chapitres.map(chapitre => (
                <div key={chapitre.id}>
                    <h2>{chapitre.name}</h2>
                    <p>{chapitre.description}</p>
                    <p>{chapitre.content}</p>
                    <hr />
                    <br />
                </div>
            ))}
        </div>
    )
}