import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useUsuario } from "../context/UsuarioContext";

function PerfilUsuario() {
  const { usuario, actualizarPerfil } = useUsuario();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(usuario);

  useEffect(() => {
    setFormData(usuario);
  }, [usuario]);

  const campos = [
    { key: "nombre", label: "Nombre" },
    { key: "dni", label: "DNI" },
    { key: "rol", label: "Rol" },
    { key: "institucion", label: "Institución" },
  ];

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleGuardar = () => {
    actualizarPerfil(formData);
    setEditMode(false);
  };

  const handleCancelar = () => {
    setFormData(usuario);
    setEditMode(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "primary.main" }}>
            {usuario.nombre?.[0] || "U"}
          </Avatar>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {usuario.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {usuario.rol}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List>
          {campos.map(({ key, label }) => (
            <ListItem key={key} sx={{ py: 1 }}>
              {editMode ? (
                <TextField
                  fullWidth
                  label={label}
                  value={formData[key] ?? ""}
                  onChange={handleChange(key)}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <ListItemText primary={label} secondary={usuario[key] || "-"} />
              )}
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3, flexWrap: "wrap" }}>
          {editMode ? (
            <>
              <Button variant="contained" onClick={handleGuardar}>
                Guardar cambios
              </Button>
              <Button variant="outlined" onClick={handleCancelar}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Editar perfil
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default PerfilUsuario;
