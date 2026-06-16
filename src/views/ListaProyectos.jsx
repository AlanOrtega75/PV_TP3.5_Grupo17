import { useEffect, useRef, useState } from "react";
import {
  obtenerProyectos,
  agregarProyecto,
  eliminarProyecto,
  buscarProyecto,
} from "../services/proyectoService";
import ProyectoCard from "../components/ProyectoCard";
import FormularioProyecto from "../components/FormularioProyecto";
import RegistroActividad from "../components/RegistroActividad";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const ListaProyectos = () => {
  const [proyectos, setProyectos] = useState(obtenerProyectos());
  const [busqueda, setBusqueda] = useState("");
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
    setBusqueda("");
  };

  // si hay algo escrito en el buscador filtro, sino muestro la lista completa
  // el buscador no toca el estado proyectos, por eso no dispara el registro
  const proyectosVisibles = busqueda.trim()
    ? buscarProyecto(busqueda)
    : proyectos;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          id="buscarProyectos"
          type="text"
          placeholder="Buscar por título, categoría o estado…"
          value={busqueda}
          onChange={handleBuscar}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
              endAdornment: busqueda ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="Limpiar búsqueda"
                    onClick={() => setBusqueda("")}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
            htmlInput: { "aria-label": "Buscar proyectos" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 999,
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
              transition: "box-shadow .2s ease, border-color .2s ease",
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "rgba(37, 99, 235, 0.35)" },
              "&.Mui-focused": { boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.12)" },
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
            "& .MuiOutlinedInput-input": { py: 1.6 },
          }}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
        }}
        id="lista-proyectos"
      >
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
                <ProyectoCard proyecto={proy} onEliminar={handleEliminar} />
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

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
        }}
        id="nuevo-proyecto"
      >
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
