import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useParams } from 'react-router-dom';
export default function() {
    const { idchapitre, idCours } = useParams();
    const [files, setFiles] = React.useState([]);
    const [type, setType] = React.useState("");
    const [description, setDescription] = React.useState("");
    //delete file
    const deleteFile = (index) => {
        setFiles(files.filter((file, i) => i !== index));
    }
    const sendFile = () => {
        const formData = new FormData();
        for(let i = 0; i < files.length; i++){
            formData.append('file', files[i]);
        }
        formData.append('type', type);
        formData.append('description', description);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload/cours/${idCours}/chapitres/${idchapitre}/content`, formData)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))
    }
    return(
        <div>
            <select onChange={e => setType(e.target.value)}>
            <option>---Choisir un type---</option>
            <option>Cours</option>
            <option>Exercice</option>
            </select>
            <input type="file" onChange={e => setFiles([...files, e.target.files[0]])}/> <br />
            <textarea onChange={e => setDescription(e.target.value)}/> <br />
            <button onClick={sendFile}>Send</button>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nom du fichier</TableCell>
                    <TableCell align="right">Taille</TableCell>
                    <TableCell align="right">Supprimer</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {files.map((row, index) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.size}</TableCell>
                        <TableCell align="right"><HighlightOffIcon onClick={()=>deleteFile(index)}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}