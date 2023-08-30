import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Table from "../table.component"
import { Button } from "@mui/material";
import ClasseCours from "./classe.cours";
import ClasseEtudiant from "./classe.etudiant";
export default function() {
    const {id} = useParams()
    
    const [classe, setClasse] = useState({
        cours: [],
        students: []
    })

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/classe/${id}`)
        .then(res => {
            setClasse(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <div>
            <ClasseCours data={classe.cours} classeId={id} />
            <ClasseEtudiant data={classe.students} classeId={id}/>
            
            
        </div>
    )
}