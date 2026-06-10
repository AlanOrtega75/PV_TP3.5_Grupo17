import { useEffect, useRef, useState } from 'react';
import { obtenerProyectos, agregarProyecto, eliminarProyecto, buscarProyecto } from '../services/proyectoService';
import ProyectoCard from '../components/ProyectoCard';
import FormularioProyecto from '../components/FormularioProyecto';
import RegistroActividad from '../components/RegistroActividad';

const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState(obtenerProyectos());
  const [busqueda, setBusqueda] = useState('');
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  // bandera para saber si hubo un alta o baja real
  // arranca en false asi el efecto no salta al montar ni cuando filtro
  const huboCambio = useRef(false);

  // cada vez que cambia la lista guardo la fecha, pero solo si el cambio
  // vino de agregar o eliminar (por eso primero reviso la bandera)
  useEffect(() => {
    if (huboCambio.current) {
      setUltimaActualizacion(new Date());
    }
  }, [proyectos]);

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const handleEliminar = (id) => {
    huboCambio.current = true;
    setProyectos(eliminarProyecto(id));
  };

  const handleAgregarProyecto = (nuevoProyecto) => {
    huboCambio.current = true;
    setProyectos(agregarProyecto(nuevoProyecto));
    setBusqueda('');
  };

  // si hay algo escrito en el buscador filtro, sino muestro la lista completa
  // el buscador no toca el estado proyectos, por eso no dispara el registro
  const proyectosVisibles = busqueda.trim() ? buscarProyecto(busqueda) : proyectos;

  return (
    <div className="contenedor-proyectos">
      <section className="project-search-panel">
        <label htmlFor="buscarProyectos">Buscar proyectos</label>
        <input
          id="buscarProyectos"
          type="text"
          placeholder="Buscar por título, categoría o estado"
          value={busqueda}
          onChange={handleBuscar}
        />
      </section>

      <section className="project-database" id="lista-proyectos">
        <div className="project-database-header">
          <h3>Base de datos de proyectos</h3>
          <p>Revisa los proyectos guardados y elimina los que ya no necesites.</p>
        </div>

        {proyectosVisibles.length > 0 ? (
          <div className="project-list">
            {proyectosVisibles.map((proy) => (
              <ProyectoCard
                key={proy.id}
                proyecto={proy}
                onEliminar={handleEliminar}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">No hay proyectos registrados en este momento.</p>
        )}

        {ultimaActualizacion && <RegistroActividad fecha={ultimaActualizacion} />}
      </section>

      <section className="project-panel" id="nuevo-proyecto">
        <div className="project-panel-header">
          <h2>Agregar nuevo proyecto</h2>
          <p>Completá el formulario para registrar un proyecto en la lista.</p>
        </div>

        <FormularioProyecto onAgregar={handleAgregarProyecto} />
      </section>
    </div>
  );
};

export default ListaProyectos;
