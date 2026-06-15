# PV_TP3.5_Grupo17

Plataforma de gestión de proyectos educativos hecha para la materia PV (Programacion Visual).

El proyecto comenzo con HTML/CSS y durante el TP3 lo fuimos pasando a React
de a poco. En cada parte sumamos algo nuevo: componentes y manejo de estado con hooks,
comunicación entre componentes con props, efectos con useEffect, navegacion entre vistas
con React Router y el diseño de la interfaz con Material UI. En esta nueva parte agregamos estado
global con Context API para manejar los datos del usuario y que estén disponibles en toda
la aplicación sin tener que pasarlos manualmente de un componente a otro.

La app permite ver la lista de proyectos, buscarlos, entrar al detalle de cada uno, cargar
proyectos nuevos y consultar el perfil del usuario. Como el perfil vive en el contexto
global, cuando se edita el cambio se ve al instante en el resto de la app (por ejemplo en
el encabezado).

## Tecnologías

- React + Vite
- React Router
- Material UI
- Context API

## Cómo correrlo

```bash
npm install
npm run dev
```

## Integrantes

* **Alan M. Ortega** - [AlanOrtega75](https://github.com/AlanOrtega75)
* **Emanuel J. Valeriano** - [Emanuel-J-Valeriano](https://github.com/Emanuel-J-Valeriano)
* **Gutierrez, Ignacio Valentin** - [@IgnacioG04](https://github.com/IgnacioG04)
* **Alavar, Bárbara Luisana** - [@Barr09](https://github.com/Barr09)
