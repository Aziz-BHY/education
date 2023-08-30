import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.component";
import Drawer from "./components/drawer.component";
import ParentAdminComponent from './components/admin/Parent.component';
import ProfAdminComponent from './components/admin/Prof.component';
import EspaceEleveComponent from './components/eleve/EspaceEleve.component'
import CoursSplitter from "./components/cours.splitter";
import ElevesSplitter from "./components/eleves.splitter";
import CoursComponent from "./components/enseignant/Cours.component";
import ChapitreForm from "./components/enseignant/chapitre.form";
import UploadContenu from "./components/enseignant/upload";
import ClasseAdminComponent from "./components/admin/classe.component";
import Test from "./components/test"
import ClasseDetailAdminComponent from "./components/admin/classeDetail.component";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Drawer></Drawer>} />
      <Route path="/cours" element={<Drawer><CoursSplitter /></Drawer>} />
      <Route path="/eleves" element={<Drawer><ElevesSplitter /></Drawer>} />
      <Route path="/parents" element={<Drawer><ParentAdminComponent /></Drawer>} />
      <Route path="/profs" element={<Drawer><ProfAdminComponent /></Drawer>} />
      <Route path="/classe" element={<Drawer><ClasseAdminComponent /></Drawer>} />
      <Route path="/classe/:id" element={<Drawer><ClasseDetailAdminComponent /></Drawer>} />
      <Route path="/espacepersonnel" element={<Drawer><EspaceEleveComponent /></Drawer>} />
      <Route path="/cours/:id/chapitres" element={<Drawer><CoursComponent /></Drawer>} />
      <Route path="/cours/:id/chapitres/new" element={<Drawer><ChapitreForm /></Drawer>} />
      <Route path="/cours/:idcours/chapitres/:idchapitre/contenu" element={<Drawer><UploadContenu /></Drawer>} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test fileUrl={""}/>} />
      <Route path="*" element={<iframe id="js-media-frame" style={{ width: "500px", height: "500px"}} itemprop="associatedMedia" src="https://www.edumedia-sciences.com/fr/media/frame/675/?r=105623" class="embed__content"></iframe>} />"
        </Routes>
      </BrowserRouter>
  );
}

export default App;
