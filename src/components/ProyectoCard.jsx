import { Link } from 'react-router-dom';

const ProyectoCard = ({ proyecto, onEliminar }) => {
  const { id, titulo, categoria, estado } = proyecto;
  return (
    <article className="project-card">
      <div className="project-card-header">
        <div>
          <h4>{titulo}</h4>
          <span className="project-badge">{categoria}</span>
        </div>
      </div>

      <div className="project-card-footer">
        <Link to={`/proyectos/${id}`} className="secondary-button">
          Ver detalle
        </Link>
        <button type="button" className="secondary-button delete-button" onClick={() => onEliminar(id)}>
          Eliminar
        </button>
      </div>

      <div className="project-meta">
        <p className="meta-row">
          ID: <strong>{id}</strong>
        </p>
        <p className="meta-row">
          Categoría: <strong>{categoria}</strong>
        </p>
        <p className="meta-row">
          Estado:
          <span className={`project-status status-${estado.replace(/\s+/g, '-').toLowerCase()}`}>
            {estado}
          </span>
        </p>
      </div>
    </article>
  );
};

export default ProyectoCard;