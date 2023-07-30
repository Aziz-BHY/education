import EleveAdminComponent from './admin/Eleve.component';
import EleveParentComponent from './parent/Eleve.component';
import { useJwt } from "react-jwt";
import { useCookies } from 'react-cookie';

export default function() {
    const [cookies] = useCookies(['education']);
    const { decodedToken } = useJwt(cookies.education);

    if(decodedToken?.role == "admin"){
        return(
            <EleveAdminComponent />
        )
    }else if(decodedToken?.role == "parent"){
        return(
            <EleveParentComponent />
        )
    }
}