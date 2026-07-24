import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ConsultaCreditos from './components/ConsultaCreditos';
import Inicio from './components/Inicio';
import RegistroCredito from './components/RegistroCredito';


// más adelante: import ConsultaCreditos from './components/ConsultaCreditos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<RegistroCredito />} />
        <Route path="/consulta" element={<ConsultaCreditos />} />
      </Routes>
    </Router>
  );
}

export default App;
