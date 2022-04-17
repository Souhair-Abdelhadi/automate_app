import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import ProtectedRoute from './pages/components/protectedRoutes';
import Index from './pages/index.jsx';
import Test from "./pages/test1.jsx"
import SideBar  from './pages/cards/sideBar';
import ShowAutomates from './pages/afficher_automates';
import Clients from './pages/clients'
import Ajouter_client from './pages/ajouter_client'
import Ajouter_automate from './pages/ajouter_automate'
import Interventions from './pages/interventions';
import Ajouter_Intervention from './pages/ajouter_intervention';
import Piece_rechange from './pages/piece_rechange';
import Ajouter_piece_rechange from './pages/ajouter_piece_rechange';



function App() {
  return (
    
  <Router>
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/test" element={<Test />} />
      <Route path="/automates" element={<ShowAutomates />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/interventions" element={<Interventions />} />
      <Route path="/ajouter_intervention" element={<Ajouter_Intervention />} />
      <Route path="/piece_rechange" element={<Piece_rechange />} />
      <Route path="/ajouter_piece" element={<Ajouter_piece_rechange />} />
      
      <Route path="/ajouter_automate" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Ajouter_automate/>
        </ProtectedRoute>
      } />
      <Route path="/ajouter_client" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/clients"
         >
          <Ajouter_client/>
        </ProtectedRoute>
      } />
    </Routes>
  </Router>

  );
}

export default App;
