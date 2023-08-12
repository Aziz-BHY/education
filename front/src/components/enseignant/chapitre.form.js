import { Button } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';
export default function() {
    const { id } = useParams();
    const [cours, setCours] = React.useState(null);
    const [titre, setTitre] = React.useState("");
    React.useEffect(() => {
        axios.get(`http://localhost:5000/cours/${id}`)
            .then(res => setCours(res.data))
            .catch(err=> Navigate("/cours"))
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/chapitre/`, {
            title: titre,
            coursId: id
        })
            .then(res => window.location = "/cours/"+id+"/chapitres")
            .catch(err=> console.log(err))
    }
    return (
        <div>
            <h1>Cours: {cours?.name}</h1>
            <h2>Créer un chapitre</h2>
            <input type="text" placeholder="Titre du chapitre" onChange={({target})=>setTitre(target.value)} />
            <Button variant="contained" onClick={handleSubmit}>Créer</Button>
        </div>
    )
}