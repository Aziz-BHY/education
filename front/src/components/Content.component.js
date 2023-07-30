import CoursComponent from './Cours.component'
import CoursEleveComponent from './eleve/Cours.component';
import CoursAdminComponent from './admin/Cours.component';
import CoursTeacherComponent from './enseignant/Cours.component';
import EleveAdminComponent from './admin/Eleve.component';
import EleveParentComponent from './parent/Eleve.component';
import ParentAdminComponent from './admin/Parent.component';
import ProfAdminComponent from './admin/Prof.component';
import EspaceEleveComponent from './eleve/EspaceEleve.component'
export default function({page, setPage, decodedToken}) {
    
    if(page == "Cours"){
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
                <CoursTeacherComponent />
            )
        }
    }else if(page == "Eleves" ){
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
    else if(page == "Parents"){
        return(
            <ParentAdminComponent />
        )
    }else if(page == "Profs") {
        return(
            <ProfAdminComponent />
        )
    }else if(page == "Espace Personnel"){
        return(
            <EspaceEleveComponent />
        )
    }
    
}