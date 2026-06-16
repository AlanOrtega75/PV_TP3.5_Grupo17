import { Link } from "react-router-dom";
import { useUsuario } from "../context/UsuarioContext";

function Header() {
  const { usuario } = useUsuario();
  const inicial = usuario.nombre?.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__titles">
          <h1>Gestión de Proyectos</h1>
          <p>Revisa, filtra y administra tus proyectos con facilidad</p>
        </div>

        <Link to="/perfil" className="app-header__user" title="Ir a mi perfil">
          <span className="app-header__avatar">{inicial}</span>
          <span className="app-header__user-info">
            <strong>{usuario.nombre}</strong>
            <span className="app-header__role">{usuario.rol}</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
