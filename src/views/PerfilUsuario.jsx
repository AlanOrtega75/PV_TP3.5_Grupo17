import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function PerfilUsuario() {
  const usuario = {
    nombre: "Bárbara",
    apellido: "Alavar",
    rol: "Alumna",
    institucion: "Facultad de Ingeniería - UNJu",
    materia: "Programación Visual",
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "primary.main" }}>
            {usuario.nombre[0]}
          </Avatar>
          <Typography variant="h5">
            {usuario.nombre} {usuario.apellido}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {usuario.rol}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List>
          <ListItem>
            <ListItemText primary="Nombre" secondary={usuario.nombre} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Apellido" secondary={usuario.apellido} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Rol" secondary={usuario.rol} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Institución" secondary={usuario.institucion} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Materia" secondary={usuario.materia} />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default PerfilUsuario;