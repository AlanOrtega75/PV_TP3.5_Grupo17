import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";

const ProyectoCard = ({ proyecto, onEliminar }) => {
  const { id, titulo, categoria, estado } = proyecto;

  const estiloEstado = () => {
    if (estado === "Completado") {
      return { bgcolor: "#dcfce7", color: "#166534" };
    }

    if (estado === "En Progreso") {
      return { bgcolor: "#dbeafe", color: "#1d4ed8" };
    }

    if (estado === "Pendiente") {
      return { bgcolor: "#ffedd5", color: "#c2410c" };
    }

    return { bgcolor: "#e5e7eb", color: "#374151" };
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: "1px solid #dbe4f0",
        boxShadow: "none",
        p: 2,
      }}
    >
      <CardContent sx={{ p: 0, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ fontWeight: 700, mb: 0.5 }}
        >
          {titulo}
        </Typography>

        <Chip
          label={categoria}
          size="small"
          sx={{
            bgcolor: "#e8efff",
            color: "#1d4ed8",
            fontWeight: 700,
            borderRadius: 3,
            mb: 2,
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            ID: <strong>{id}</strong>
          </Typography>

          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Categoría: <strong>{categoria}</strong>
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">Estado:</Typography>
            <Chip
              label={estado}
              size="small"
              sx={{
                ...estiloEstado(),
                fontWeight: 700,
                borderRadius: 3,
              }}
            />
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 0, mt: 2, justifyContent: "flex-end", gap: 1 }}>
        <Button
          component={RouterLink}
          to={`/proyectos/${id}`}
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            fontWeight: 600,
          }}
        >
          Ver detalle
        </Button>

        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          onClick={() => onEliminar(id)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            fontWeight: 600,
            boxShadow: "none",
          }}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProyectoCard;
