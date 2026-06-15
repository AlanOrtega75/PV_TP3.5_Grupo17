import { createContext, useContext, useState } from "react";

// Contexto global con los datos del usuario "logueado".
const UsuarioContext = createContext();

// Datos por defecto: simulan un usuario que ya inició sesión.
const usuarioInicial = {
  nombre: "Juan Perez",
  dni: "42.345.678",
  rol: "Alumno", // "Docente" o "Alumno"
  institucion: "FI - UNJu",
};

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(usuarioInicial);

  // Actualiza el perfil mezclando los datos nuevos con los actuales.
  const actualizarPerfil = (nuevosDatos) => {
    setUsuario((anterior) => ({ ...anterior, ...nuevosDatos }));
  };

  return (
    <UsuarioContext.Provider value={{ usuario, actualizarPerfil }}>
      {children}
    </UsuarioContext.Provider>
  );
}

// Hook para consumir el contexto de forma directa desde cualquier componente.
export function useUsuario() {
  return useContext(UsuarioContext);
}
