import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const FormularioProyecto = ({ onAgregar }) => {
  const [formValues, setFormValues] = useState({
    titulo: "",
    idProyecto: "",
    categoria: "",
    estado: "Pendiente",
    descripcion: "",
  });

  // listas que se van armando con los botones "Agregar"
  const [recursos, setRecursos] = useState([]);
  const [equipo, setEquipo] = useState([]);

  // inputs temporales: lo que se esta cargando antes de sumarlo a la lista
  const [recursoActual, setRecursoActual] = useState({
    tipo: "GitHub",
    enlace: "",
  });
  const [miembroActual, setMiembroActual] = useState({ nombre: "", rol: "" });

  const [error, setError] = useState("");

  const { titulo, idProyecto, categoria, estado, descripcion } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // suma el recurso cargado en los inputs temporales a la lista
  const agregarRecurso = () => {
    if (!recursoActual.enlace.trim()) {
      return;
    }

    setRecursos((prev) => [
      ...prev,
      { tipo: recursoActual.tipo, enlace: recursoActual.enlace.trim() },
    ]);
    setRecursoActual({ tipo: "GitHub", enlace: "" });
  };

  const quitarRecurso = (indice) => {
    setRecursos((prev) => prev.filter((_, i) => i !== indice));
  };

  // suma el miembro cargado en los inputs temporales a la lista
  const agregarMiembro = () => {
    if (!miembroActual.nombre.trim()) {
      return;
    }

    setEquipo((prev) => [
      ...prev,
      {
        nombre: miembroActual.nombre.trim(),
        rol: miembroActual.rol.trim() || "Rol no definido",
      },
    ]);
    setMiembroActual({ nombre: "", rol: "" });
  };

  const quitarMiembro = (indice) => {
    setEquipo((prev) => prev.filter((_, i) => i !== indice));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError("El nombre del proyecto es obligatorio.");
      return;
    }

    const nuevoProyecto = {
      id: idProyecto.trim() || undefined,
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      estado,
      descripcion:
        descripcion.trim() ||
        "Descripción general del proyecto. Este proyecto busca aportar una solución educativa clara, organizada y funcional.",
      recursos,
      equipo,
    };

    onAgregar(nuevoProyecto);

    // limpio todo el formulario
    setFormValues({
      titulo: "",
      idProyecto: "",
      categoria: "",
      estado: "Pendiente",
      descripcion: "",
    });
    setRecursos([]);
    setEquipo([]);
    setRecursoActual({ tipo: "GitHub", enlace: "" });
    setMiembroActual({ nombre: "", rol: "" });
    setError("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      <TextField
        id="tituloProyecto"
        name="titulo"
        label="Nombre del proyecto"
        type="text"
        placeholder="Ej. Plataforma de Exámenes"
        value={titulo}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        id="descripcionProyecto"
        name="descripcion"
        label="Descripción"
        placeholder="Describe brevemente el proyecto"
        value={descripcion}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          id="idProyecto"
          name="idProyecto"
          label="ID"
          type="text"
          placeholder="Ej. 006"
          value={idProyecto}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="categoriaProyecto"
          name="categoria"
          label="Categoría"
          type="text"
          placeholder="Ej. Web, Mobile, Desktop"
          value={categoria}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="estadoProyectoLabel">Estado</InputLabel>
          <Select
            labelId="estadoProyectoLabel"
            id="estadoProyecto"
            name="estado"
            value={estado}
            label="Estado"
            onChange={handleChange}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="En Progreso">En Progreso</MenuItem>
            <MenuItem value="Completado">Completado</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Recursos
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="tipoRecursoLabel">Tipo</InputLabel>
            <Select
              labelId="tipoRecursoLabel"
              id="tipoRecurso"
              value={recursoActual.tipo}
              label="Tipo"
              onChange={(e) =>
                setRecursoActual((prev) => ({ ...prev, tipo: e.target.value }))
              }
            >
              <MenuItem value="GitHub">GitHub</MenuItem>
              <MenuItem value="Drive">Drive</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="enlaceRecurso"
            type="text"
            label="Enlace"
            placeholder="https://..."
            value={recursoActual.enlace}
            onChange={(e) =>
              setRecursoActual((prev) => ({ ...prev, enlace: e.target.value }))
            }
            fullWidth
          />

          <Button
            type="button"
            variant="outlined"
            onClick={agregarRecurso}
            sx={{
              textTransform: "none",
              borderRadius: 1,
              color: "#383636",
              borderColor: "#94a3b8",
              fontWeight: 700,
            }}
          >
            Agregar
          </Button>
        </Stack>

        {recursos.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            {recursos.map((recurso, indice) => (
              <Chip
                key={`${recurso.tipo}-${indice}`}
                label={`${recurso.tipo} — ${recurso.enlace}`}
                onDelete={() => quitarRecurso(indice)}
                variant="outlined"
              />
            ))}
          </Stack>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Equipo
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            id="nombreMiembro"
            type="text"
            label="Nombre"
            placeholder="Nombre"
            value={miembroActual.nombre}
            onChange={(e) =>
              setMiembroActual((prev) => ({ ...prev, nombre: e.target.value }))
            }
            fullWidth
          />

          <TextField
            id="rolMiembro"
            name="rolMiembro"
            type="text"
            label="Rol"
            placeholder="Rol"
            value={miembroActual.rol}
            onChange={(e) =>
              setMiembroActual((prev) => ({ ...prev, rol: e.target.value }))
            }
            fullWidth
          />

          <Button
            type="button"
            variant="outlined"
            onClick={agregarMiembro}
            sx={{
              textTransform: "none",
              borderRadius: 1,
              color: "#383636",
              borderColor: "#94a3b8",
              fontWeight: 700,
            }}
          >
            Agregar
          </Button>
        </Stack>

        {equipo.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            {equipo.map((miembro, indice) => (
              <Chip
                key={`${miembro.nombre}-${indice}`}
                label={`${miembro.nombre} — ${miembro.rol}`}
                onDelete={() => quitarMiembro(indice)}
                variant="outlined"
              />
            ))}
          </Stack>
        )}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          bgcolor: "#2563eb",
          color: "#ffffff",
          fontWeight: 700,
        }}
      >
        Agregar proyecto
      </Button>
    </Box>
  );
};

export default FormularioProyecto;
