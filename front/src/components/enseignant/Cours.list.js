import * as React from 'react';
import axios from 'axios';
import CoursComponent from '../Cours.component';
export default function({decodedToken}) {
    const [cours, setCours] = React.useState([]);
    React.useEffect(()=>{
        axios.get(`http://localhost:5000/cours/teacher/${decodedToken?.id}`)
        .then(res => {
            setCours(res.data);
        }).catch(err=>
            console.error(err.message)
        )}
    , [])
    return (
        <>
            {cours.map(c => <CoursComponent key={c._id} title={c.name} description={c.description} coursId={c._id} />)}
        </>
    )
}