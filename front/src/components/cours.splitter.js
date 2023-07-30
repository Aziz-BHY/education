import CoursEleveComponent from './eleve/Cours.component';
import CoursAdminComponent from './admin/Cours.component';
import CoursTeacherComponent from './enseignant/Cours.component';
import { useJwt } from "react-jwt";
import { useCookies } from 'react-cookie';

export default function() {
    const [cookies] = useCookies(['education']);
    const { decodedToken } = useJwt(cookies.education);

    if(decodedToken?.role == "admin"){
            return(
                <CoursAdminComponent />
            )
        }
        if(decodedToken?.role == "student"){        
            <CoursEleveComponent decodedToken={decodedToken} />
        }
        if(decodedToken?.role == "teacher"){
            return(
                <CoursTeacherComponent decodedToken={decodedToken} />
            )
        }
}