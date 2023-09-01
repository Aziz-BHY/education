import { Button } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ChapitreComponent from './Chapitre.component';
import { useJwt } from "react-jwt";
import { useCookies } from 'react-cookie';
export default function() {
    const { id } = useParams();
    const [cours, setCours] = React.useState(null);
    const [cookies] = useCookies(['education']);
    const { decodedToken } = useJwt(cookies.education);
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
            {decodedToken?.role == "teacher"?
            <Button variant="contained" color="primary" onClick={()=>{window.location.href = `/cours/${id}/chapitres/new`}}>Nouveau chapitre</Button>
            : <></>}
            {cours?.chapitres.map((chapitre, i) => (
               <ChapitreComponent chapitre={chapitre} coursId={cours._id}/> 
            ))}
        </div>
    )
}