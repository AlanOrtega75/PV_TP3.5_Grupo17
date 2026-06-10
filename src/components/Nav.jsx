import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  isActive ? 'nav-button active' : 'nav-button';

function Nav() {
  return (
    <nav className="app-nav">
      <NavLink to="/dashboard" className={linkClass}>Inicio</NavLink>
      <NavLink to="/proyectos" className={linkClass}>Proyectos</NavLink>
      <NavLink to="/perfil" className={linkClass}>Perfil</NavLink>
    </nav>
  );
}

export default Nav;