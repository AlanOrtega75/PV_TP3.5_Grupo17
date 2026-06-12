import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
} from '@mui/material';

const ProyectoCard = ({ proyecto, onEliminar }) => {
  const { id, titulo, categoria, estado } = proyecto;

  const obtenerColorEstado = () => {
    if (estado === 'Completado') return 'success';
    if (estado === 'En Progreso') return 'warning';
    if (estado === 'Pendiente') return 'info';
    return 'default';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Typography variant="h6" component="h3">
            {titulo}
          </Typography>

          <Chip label={categoria} color="primary" variant="outlined" size="small" />
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            ID: <strong>{id}</strong>
          </Typography>

          <Typography variant="body2">
            Categoría: <strong>{categoria}</strong>
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body2">Estado:</Typography>
            <Chip label={estado} color={obtenerColorEstado()} size="small" />
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={`/proyectos/${id}`}
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Ver detalle
        </Button>

        <Button
          type="button"
          variant="contained"
          color="error"
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => onEliminar(id)}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProyectoCard;