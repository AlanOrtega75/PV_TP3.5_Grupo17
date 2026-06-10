import { useParams, Link } from 'react-router-dom';
import { obtenerProyectoPorId } from '../services/proyectoService';

const DetalleProyecto = () => {
  // el id viene de la URL (/proyectos/:id), por eso sobrevive a un F5
  const { id } = useParams();
  const proyecto = obtenerProyectoPorId(id);

  // caso "no encontrado": si el id no existe muestro un aviso en vez de romper
  if (!proyecto) {
    return (
      <section className="project-detail-panel">
        <div className="detail-header">
          <div>
            <h2>Proyecto no encontrado</h2>
            <p>No existe un proyecto con el identificador {id}.</p>
          </div>
          <Link to="/proyectos" className="secondary-button">
            Volver a proyectos
          </Link>
        </div>
      </section>
    );
  }

  const {
    titulo,
    categoria,
    estado,
    descripcion,
    recursos = [],
    equipo = [],
  } = proyecto;

  return (
    <section className="project-detail-panel">
      <div className="detail-header">
        <div>
          <h2>Detalle de proyecto</h2>
          <p>{titulo}</p>
        </div>
        <Link to="/proyectos" className="secondary-button">
          Volver
        </Link>
      </div>

      <div className="detail-section">
        <h4>Descripción</h4>
        <p>{descripcion}</p>
      </div>

      <div className="detail-section">
        <h4>Equipo</h4>
        <ul>
          {equipo.map((miembro) => (
            <li key={`${miembro.nombre}-${miembro.rol}`}>
              <strong>{miembro.nombre}</strong> — {miembro.rol}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h4>Recursos</h4>
        <ul>
          {recursos.map((recurso) => (
            <li key={`${recurso.tipo}-${recurso.enlace}`}>
              <a href={recurso.enlace} target="_blank" rel="noreferrer">
                {recurso.tipo}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-meta">
        <p>ID: <strong>{proyecto.id}</strong></p>
        <p>Categoría: <strong>{categoria}</strong></p>
        <p>Estado: <strong>{estado}</strong></p>
      </div>

      <div className="detail-footer">
        <Link to="/proyectos" className="primary-button">
          Ver todos los proyectos
        </Link>
      </div>
    </section>
  );
};

export default DetalleProyecto;
