import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import { obtenerProyectos } from "../services/proyectoService";

function Dashboard() {
  // las metricas se calculan a partir de la lista real del servicio
  const proyectos = obtenerProyectos();

  const total = proyectos.length;
  const enCurso = proyectos.filter((proy) => proy.estado === "En Progreso").length;
  const finalizados = proyectos.filter((proy) => proy.estado === "Completado").length;
  const pendientes = proyectos.filter((proy) => proy.estado === "Pendiente").length;

  const metricas = [
    { titulo: "Total de proyectos", valor: total, color: "primary", Icono: FolderCopyOutlinedIcon },
    { titulo: "Proyectos en curso", valor: enCurso, color: "info", Icono: AutorenewRoundedIcon },
    { titulo: "Proyectos finalizados", valor: finalizados, color: "success", Icono: CheckCircleOutlineRoundedIcon },
    { titulo: "Proyectos pendientes", valor: pendientes, color: "warning", Icono: HourglassEmptyRoundedIcon },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Bienvenido al Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Aquí podés ver un resumen general del estado de tus proyectos. Tocá una tarjeta para ir a la lista.
      </Typography>

      <Grid container spacing={3}>
        {metricas.map(({ titulo, valor, color, Icono }) => (
          <Grid size={{ xs: 12, sm: 6 }} key={titulo}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "transform .2s ease, box-shadow .2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
              }}
            >
              <CardActionArea component={RouterLink} to="/proyectos">
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      bgcolor: `${color}.light`,
                      color: `${color}.main`,
                    }}
                  >
                    <Icono fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
                      {valor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {titulo}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
