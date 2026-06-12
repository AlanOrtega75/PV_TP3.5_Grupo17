import { useEffect, useRef, useState } from 'react';
import { obtenerProyectos, agregarProyecto, eliminarProyecto, buscarProyecto } from '../services/proyectoService';
import ProyectoCard from '../components/ProyectoCard';
import FormularioProyecto from '../components/FormularioProyecto';
import RegistroActividad from '../components/RegistroActividad';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
} from '@mui/material';

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          id="buscarProyectos"
          label="Buscar proyectos"
          type="text"
          placeholder="Buscar por título, categoría o estado"
          value={busqueda}
          onChange={handleBuscar}
          fullWidth
        />
      </Box>

      <Paper sx={{ p: 3, mb: 4 }} id="lista-proyectos">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2">
            Base de datos de proyectos
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Revisa los proyectos guardados y elimina los que ya no necesites.
          </Typography>
        </Box>

        {proyectosVisibles.length > 0 ? (
          <Grid container spacing={3}>
            {proyectosVisibles.map((proy) => (
              <Grid key={proy.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProyectoCard
                  proyecto={proy}
                  onEliminar={handleEliminar}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary">
            No hay proyectos registrados en este momento.
          </Typography>
        )}

        {ultimaActualizacion && (
          <Box sx={{ mt: 3 }}>
            <RegistroActividad fecha={ultimaActualizacion} />
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3 }} id="nuevo-proyecto">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2">
            Agregar nuevo proyecto
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Completá el formulario para registrar un proyecto en la lista.
          </Typography>
        </Box>

        <FormularioProyecto onAgregar={handleAgregarProyecto} />
      </Paper>
    </Container>
  );
};

export default ListaProyectos;