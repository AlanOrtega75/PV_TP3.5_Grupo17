import { Alert } from '@mui/material';
import formatearFecha from '../utils/formatearFecha';

const RegistroActividad = ({ fecha }) => {
  return (
    <Alert severity="info" className="registro-actividad">
      {formatearFecha(fecha)}
    </Alert>
  );
};

export default RegistroActividad;