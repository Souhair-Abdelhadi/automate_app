import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import ProtectedRoute from './pages/components/protectedRoutes';
import Index from './pages/index.jsx';
import Test from "./pages/test1.jsx"
import ShowAutomates from './pages/afficher_automates';
import Clients from './pages/clients'
import Ajouter_client from './pages/ajouter_client'
import Ajouter_automate from './pages/ajouter_automate'
import Interventions from './pages/interventions';
import Ajouter_Intervention from './pages/ajouter_intervention';
import Piece_rechange from './pages/piece_rechange';
import Ajouter_piece_rechange from './pages/ajouter_piece_rechange';
import Ingenieurs from './pages/ingenieurs';
import Ajouter_ingenieur from './pages/ajouter_ingenieur';
import PageNotFound from "./pages/pageNotFound";
import Modifier_Automate from "./pages/modification_pages/modifier_automate";
import Modifier_client from "./pages/modification_pages/modifier_client";
import Modifier_ingenieur from "./pages/modification_pages/modifier_ingenieur";
import Modifier_intervention from "./pages/modification_pages/modifier_intervention";
import Modifier_piece_rechange from "./pages/modification_pages/modifier_piece_rechange";

function App() {
  return (
    
  <Router>
     <Routes>
      <Route path="/" element={<Index />}  />
      <Route path="/test" element={<Test />} />
      <Route path="/automates" element={
        <ProtectedRoute
          adminRole={false}
          redirectPath="/"
        >
          <ShowAutomates />
        </ProtectedRoute>
      } />
      <Route path="/ajouter_automate" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Ajouter_automate/>
        </ProtectedRoute>
      } />
      <Route path="/modifier_automate/:id"  element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Modifier_Automate/>
        </ProtectedRoute>
      } />
      <Route path="/ingenieurs" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
        >
          <Ingenieurs />
        </ProtectedRoute>
      } />
      <Route path="/ajouter_ingenieur" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
        >
          <Ajouter_ingenieur />
        </ProtectedRoute>
      } />
      <Route path="/modifier_ingenieur/:id"  element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Modifier_ingenieur/>
        </ProtectedRoute>
      } />
      <Route path="/clients" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Clients/>
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
      <Route path="/modifier_client/:id"  element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/clients"
         >
          <Modifier_client/>
        </ProtectedRoute>
      } />
      <Route path="/interventions" element={
        <ProtectedRoute
          adminRole={false}
          redirectPath="/automates"
         >
          <Interventions/>
        </ProtectedRoute>
      
      } />
      <Route path="/ajouter_intervention" element={
        <ProtectedRoute
          adminRole={false}
          redirectPath="/automates"
         >
          <Ajouter_Intervention />
        </ProtectedRoute>
      } />
      <Route path="/modifier_intervention/:id"  element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Modifier_intervention/>
        </ProtectedRoute>
      } />
      <Route path="/piece_rechange" element={
        <ProtectedRoute
          adminRole={false}
          redirectPath="/automates"
         >
          <Piece_rechange/>
        </ProtectedRoute>
      } />
      <Route path="/ajouter_piece" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/piece_rechange"
         >
          <Ajouter_piece_rechange/>
        </ProtectedRoute>
      } />
      <Route path="/modifier_piece/:id"  element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/automates"
         >
          <Modifier_piece_rechange/>
        </ProtectedRoute>
      } />


        <Route path="/*" element={
          
            <PageNotFound />
        } />
      
    </Routes>
  </Router>

  );
}

export default App;
