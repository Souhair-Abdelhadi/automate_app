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
      <Route path="/ingenieurs" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/"
        >
          <Ingenieurs />
        </ProtectedRoute>
      } />
      <Route path="/ajouter_ingenieur" element={
        <ProtectedRoute
          adminRole={true}
          redirectPath="/"
        >
          <Ajouter_ingenieur />
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



        <Route path="/*" element={
          
            <PageNotFound />
        } />
      
    </Routes>
  </Router>

  );
}

export default App;
