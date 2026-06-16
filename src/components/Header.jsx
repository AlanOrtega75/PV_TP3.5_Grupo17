import { useUsuario } from "../context/UsuarioContext";

function Header() {
  const { usuario } = useUsuario();

  return (
    <header className="app-header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <h1>Gestión de Proyectos</h1>
          <p>Revisa, filtra y administra tus proyectos con facilidad</p>
        </div>

        <div
          style={{
            textAlign: "right",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: "0.75rem 1rem",
            borderRadius: "12px",
          }}
        >
          <strong>{usuario.nombre}</strong>
          <p style={{ margin: 0 }}>{usuario.rol}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;