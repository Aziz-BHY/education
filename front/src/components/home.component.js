import { useCookies } from "react-cookie"
import Drawer from './drawer.component';
export default function() {
    const [cookies] = useCookies(['education']);
    if(!cookies.education) {
        window.location.href = "/login";
    }
    return(
        <div>
            <Drawer />
        </div>
    )
}