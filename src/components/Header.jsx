import { useUsuario } from "../context/UsuarioContext";

function Header() {
  const { usuario } = useUsuario();

  return (
    <header className="app-header">
      <h1>Gestión de Proyectos</h1>
      <p>Bienvenido, {usuario.nombre}</p>
      <p>Revisa, filtra y administra tus proyectos con facilidad</p>
    </header>
  );
}

export default Header;
