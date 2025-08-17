// import * as React from "react";
// import {
//   AppBar, Box, Button, Stack, Toolbar, Typography
// } from "@mui/material";
// import {
//   BrowserRouter, Routes, Route, Link, useLocation
// } from "react-router-dom";

// // pages
// import Home from "./pages/Home.jsx";
// import Acerca from "./pages/Acerca.jsx";
// import Programa from "./pages/Programa.jsx";
// import Planes from "./pages/Planes.jsx";
// import Blog from "./pages/Blog.jsx";
// import Contacto from "./pages/Contacto.jsx";

// function NavLinkBtn({ to, children }) {
//   return (
//     <Button
//       component={Link}
//       to={to}
//       sx={{
//         color: "#e9eef8",
//         textTransform: "none",
//         fontWeight: 600,
//         letterSpacing: 0.2,
//         opacity: 0.92,
//         "&:hover": { opacity: 1 },
//       }}
//     >
//       {children}
//     </Button>
//   );
// }

// function Header() {
//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       color="transparent"
//       sx={{
//         bgcolor: "transparent !important",
//         boxShadow: "none",
//         // remove blur if you want 100% clear
//         // backdropFilter: "saturate(160%) blur(6px)",
//         px: { xs: 2, md: 4 },
//       }}
//     >
//       <Toolbar disableGutters sx={{ minHeight: { xs: 72, md: 82 } }}>
//         <Typography
//           component={Link}
//           to="/"
//           sx={{
//             fontFamily: "Hargloves",
//             fontWeight: 500,
//             fontSize: { xs: 28, md: 34 },
//             letterSpacing: 0.4,
//             color: "#fff",
//             textDecoration: "none",
//             mr: 2,
//             textShadow: "none",
//           }}
//         >
//           Stem Care
//         </Typography>

//         <Stack
//           direction="row"
//           spacing={3}
//           sx={{
//             mx: 'auto',
//             display: { xs: 'none', md: 'flex' },
//             '& .MuiButton-root': {              // ⬅️ all buttons inside use Manrope
//               fontFamily: 'Manrope, sans-serif',
//               textTransform: 'none',
//               fontWeight: 300,
//               letterSpacing: 0.2,
//               color: '#e9eef8',
//               opacity: 0.92,
//               '&:hover': { opacity: 1 },
//             },
//           }}
//         >
//           <NavLinkBtn to="/acerca">Acerca de</NavLinkBtn>
//           <NavLinkBtn to="/programa-stem-care">Programa Stem Care</NavLinkBtn>
//           <NavLinkBtn to="/planes">Planes</NavLinkBtn>
//           <NavLinkBtn to="/yoamoamibebe-blog">yoamoamibebe blog</NavLinkBtn>
//         </Stack>


//         <Button
//           component={Link}
//           to="/contacto"
//           variant="outlined"
//           size="large"
//           sx={{
//             color: "#fff",
//             borderColor: "rgba(255, 255, 255, 0.6)",
//             borderRadius: 999,
//             px: 2.2,
//             py: 0.6,
//             textTransform: "none",
//             fontWeight: 600,
//             textShadow: "none",
//             "&:hover": {
//               borderColor: "#fff",
//               backgroundColor: "rgba(255,255,255,0.06)",
//             },
//           }}
//         >
//           contacto
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

// // spacer only when NOT on home, so the hero image sits behind the AppBar
// function SpacerUnlessHome() {
//   const { pathname } = useLocation();
//   if (pathname === "/") return null;
//   return <Box sx={{ height: { xs: 72, md: 82 } }} />;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <SpacerUnlessHome />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/acerca" element={<Acerca />} />
//         <Route path="/programa-stem-care" element={<Programa />} />
//         <Route path="/planes" element={<Planes />} />
//         <Route path="/yoamoamibebe-blog" element={<Blog />} />
//         <Route path="/contacto" element={<Contacto />} />
//         <Route path="*" element={<div style={{ padding: 24, color: "#fff" }}>404</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import * as React from "react";
import {
  AppBar, Box, Button, Stack, Toolbar, Typography,
  IconButton, Drawer, List, ListItemButton, ListItemText, Divider
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  BrowserRouter, Routes, Route, Link, useLocation, useNavigate
} from "react-router-dom";

// pages
import Home from "./pages/Home.jsx";
import Acerca from "./pages/Acerca.jsx";
import Programa from "./pages/Programa.jsx";
import Planes from "./pages/Planes.jsx";
import Blog from "./pages/Blog.jsx";
import Contacto from "./pages/Contacto.jsx";

function NavLinkBtn({ to, children }) {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        fontFamily: "Manrope, sans-serif",
        color: "#e9eef8",
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: 0.2,
        opacity: 0.92,
        "&:hover": { opacity: 1 },
      }}
    >
      {children}
    </Button>
  );
}

function Header() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const go = (path) => { setOpen(false); navigate(path); };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        bgcolor: "transparent !important",
        boxShadow: "none",
        px: { xs: 2, md: 4 },
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 82 }, gap: 1 }}>
        {/* Left brand */}
        <Typography
          component={Link}
          to="/"
          sx={{
            fontFamily: "Hargloves",
            fontWeight: 500,
            fontSize: { xs: 24, sm: 28, md: 34 },
            letterSpacing: 0.4,
            color: "#fff",
            textDecoration: "none",
            mr: 1,
          }}
        >
          Stem Care
        </Typography>

        {/* Desktop nav */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mx: "auto",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <NavLinkBtn to="/acerca">Acerca de</NavLinkBtn>
          <NavLinkBtn to="/programa-stem-care">Programa Stem Care</NavLinkBtn>
          <NavLinkBtn to="/planes">Planes</NavLinkBtn>
          <NavLinkBtn to="/yoamoamibebe-blog">yoamoamibebe blog</NavLinkBtn>
        </Stack>

        {/* Contact (desktop) */}
        <Button
          component={Link}
          to="/contacto"
          variant="outlined"
          size="small"
          sx={{
            display: { xs: "none", md: "inline-flex" },
            color: "#fff",
            borderColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: 999,
            px: 2,
            py: 0.6,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "rgba(255,255,255,0.06)",
            },
          }}
        >
          contacto
        </Button>

        {/* Hamburger (mobile/tablet) */}
        <IconButton
          aria-label="menu"
          onClick={() => setOpen(true)}
          sx={{ color: "#fff", display: { xs: "inline-flex", md: "none" }, ml: "auto" }}
        >
          <MenuRoundedIcon />
        </IconButton>

        {/* Drawer menu */}
        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: { width: "85vw", maxWidth: 360, bgcolor: "rgba(10,15,25,0.9)", backdropFilter: "blur(8px)", color: "#fff" }
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography sx={{ fontFamily: "Hargloves", fontSize: 22 }}>Stem Care</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}><CloseRoundedIcon/></IconButton>
          </Stack>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
          <List>
            <ListItemButton onClick={() => go("/acerca")}><ListItemText primary="Acerca de" /></ListItemButton>
            <ListItemButton onClick={() => go("/programa-stem-care")}><ListItemText primary="Programa Stem Care" /></ListItemButton>
            <ListItemButton onClick={() => go("/planes")}><ListItemText primary="Planes" /></ListItemButton>
            <ListItemButton onClick={() => go("/yoamoamibebe-blog")}><ListItemText primary="yoamoamibebe blog" /></ListItemButton>
            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.12)" }} />
            <ListItemButton onClick={() => go("/contacto")} sx={{ "& .MuiListItemText-primary": { fontWeight: 700 } }}>
              <ListItemText primary="contacto" />
            </ListItemButton>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

function SpacerUnlessHome() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <Box sx={{ height: { xs: 64, md: 82 } }} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <SpacerUnlessHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/programa-stem-care" element={<Programa />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/yoamoamibebe-blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<div style={{ padding: 24, color: "#fff" }}>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
