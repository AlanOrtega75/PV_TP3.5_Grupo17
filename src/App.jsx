import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Dashboard from './views/Dashboard';
import ListaProyectos from './views/ListaProyectos';
import DetalleProyecto from './views/DetalleProyecto';
import PerfilUsuario from './views/PerfilUsuario';
import './css/styles.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Nav />
      <main className="contenido-principal">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<ListaProyectos />} />
          <Route path="/proyectos/:id" element={<DetalleProyecto />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
