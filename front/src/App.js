import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.component";
import Drawer from "./components/drawer.component";
import ParentAdminComponent from './components/admin/Parent.component';
import ProfAdminComponent from './components/admin/Prof.component';
import EspaceEleveComponent from './components/eleve/EspaceEleve.component'
import CoursSplitter from "./components/cours.splitter";
import ElevesSplitter from "./components/eleves.splitter";
import ChapitresComponent from "./components/enseignant/Chapitres.component";
import ChapitreForm from "./components/enseignant/chapitre.form";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Drawer></Drawer>} />
      <Route path="/cours" element={<Drawer><CoursSplitter /></Drawer>} />
      <Route path="/eleves" element={<Drawer><ElevesSplitter /></Drawer>} />
      <Route path="/parents" element={<Drawer><ParentAdminComponent /></Drawer>} />
      <Route path="/profs" element={<Drawer><ProfAdminComponent /></Drawer>} />
      <Route path="/espace" element={<Drawer><EspaceEleveComponent /></Drawer>} />
      <Route path="/cours/:id/chapitres" element={<Drawer><ChapitresComponent /></Drawer>} />
      <Route path="/cours/:id/chapitres/new" element={<Drawer><ChapitreForm /></Drawer>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />"
        </Routes>
      </BrowserRouter>
  );
}

export default App;
