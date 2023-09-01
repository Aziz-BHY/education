import * as React from 'react';
import CoursComponent from '../Cours.component';
import axios from 'axios';


export default function({decodedToken}) {
    const [cours, setCours] = React.useState([])
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cours/student/${decodedToken?.id}`).then(res => setCours(res.data)).catch(err => console.log(err))
    }, [])   
    return(
        <>
            {cours.map(c => <CoursComponent key={c._id} description={c.description} title={c.name} modifiable={false} coursId={c._id} />)}
        </>
    )
}