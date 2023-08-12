import { Button } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function({chapitre, coursId}) {
    const [modify, setModify] = React.useState(false);
    const [title, setTitle] = React.useState(chapitre.title);

    const deleteChapitre = (chapitreId) => {
        axios.delete(`http://localhost:5000/chapitre/${chapitreId}`)
            .then(res => window.location.reload())
            .catch(err => console.error(err))
    }
    const deleteContent = (chapitreId, contentId) => {
        axios.delete(`http://localhost:5000/chapitre/${chapitreId}/content/${contentId}`)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))
    }
    const modifierChapitre = (chapitreId, titre) => {
        if(title)
        axios.put(`http://localhost:5000/chapitre/${chapitreId}`, { title })
            .then(res => {
                window.location.reload()
            })
            .catch(err => console.error(err))
    }
    return(
        <div key={chapitre._id}>
                    {
                        modify? <>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <CheckIcon onClick={()=>modifierChapitre(chapitre._id, title)} disabled={title === ""}/>
                        <ClearIcon onClick={()=>{
                            setModify(false)
                            setTitle(chapitre.title)
                        }}/>
                        <br />
                        </>
                        :
                        <h2>{chapitre.title}</h2>
                    } 

                    
                    <Button variant="contained" color="primary" onClick={()=>{setModify(true)}}>Modifier</Button>
                    <Button variant="contained" color="error" onClick={()=>deleteChapitre(chapitre._id)}>Supprimer</Button>
                    <Button variant="contained" color="primary" onClick={()=>{window.location.href = `/cours/${coursId}/chapitres/${chapitre._id}/contenu`}}>Ajouter contenu</Button>
                    <hr />
                    {
                    chapitre.content.map((contenu, index) => (
                        <div key={index}>
                            <h3>{contenu.description}</h3>
                            {contenu.files.map((file, index) => (
                                <div>{file}</div>
                                ))}
                            <Button variant="contained" color="primary">Modifier</Button>
                            <Button variant="contained" color="error" onClick={()=>deleteContent(chapitre._id, contenu._id)}>Supprimer</Button>
                            <hr />
                        </div>
                    ))}
                    <br />
                </div>
    )
}