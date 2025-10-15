import * as React from "react";
import {
  AppBar, Box, Button, Stack, Toolbar, Typography,
  IconButton, Drawer, List, ListItemButton, ListItemText, Divider, Menu, MenuItem, Collapse, ListItemIcon
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  BrowserRouter, Routes, Route, Link, useLocation, useNavigate
} from "react-router-dom";

import { LanguageProvider } from "./contexts/LanguageContext";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MedicalServicesRounded from "@mui/icons-material/MedicalServicesRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";



// pages
import Home from "./pages/Home.jsx";
import Acerca from "./pages/Acerca.jsx";
import Programa from "./pages/Programa.jsx";
import Planes from "./pages/Planes.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contacto from "./pages/Contacto.jsx";

import PorqueFamilias from "./pages/PorqueFamilias.jsx";

import Transplantes from "./pages/Transplantes.jsx";
import PulpaDeLeche from "./pages/PulpaDeLeche.jsx";
import PruebasGen from "./pages/PruebasGen.jsx";

import Footer from "./pages/Footer.jsx";
import FloatingCta from "./pages/FloatingCta.jsx";

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);


  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setServicesOpen(false);
  };

  const MENU_PAPER_SX = {
    mt: 1,
    borderRadius: 2,
    bgcolor: "rgba(10,15,25,0.92)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 24px 60px rgba(0,0,0,.55)",
    overflow: "hidden",
  };

  const ITEM_SX = {
    px: 2,
    py: 1.15,
    fontFamily: "Manrope, sans-serif",
    fontWeight: 600,
    letterSpacing: 0.2,
    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
  };

  const SUBITEM_SX = {
    pl: 5, pr: 2, py: 1,
    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
  };





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
          {/* <NavLinkBtn to="/programa-stem-care">Programa Stem Care</NavLinkBtn> */}


          <Button
            onClick={handleOpen}
            aria-haspopup="true"
            aria-controls={openMenu ? "menu-programa" : undefined}
            aria-expanded={openMenu ? "true" : undefined}
            endIcon={
              <KeyboardArrowDown
                sx={{ transition: "transform .2s", transform: openMenu ? "rotate(180deg)" : "none" }}
              />
            }
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
            Programa Stem Care
          </Button>

          {/* MAIN MENU */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            disableScrollLock 
            keepMounted
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{ sx: MENU_PAPER_SX }}
            MenuListProps={{ dense: true }}
          >
            <MenuItem component={Link} to="/programa-stem-care" onClick={handleClose} sx={ITEM_SX}>
              ¿Por qué almacenar sangre del cordon de mi bebé?
            </MenuItem>

            <MenuItem component={Link} to="/programa-stem-care/por-que-las-familias-eligen-stem-care" onClick={handleClose} sx={ITEM_SX}>
              ¿Por qué las familias eligen Stem Care?
            </MenuItem>

            {/* <MenuItem component={Link} to="/programa-stem-care/pasos" onClick={handleClose} sx={ITEM_SX}>
              Pasos para contratar
            </MenuItem> */}

            <MenuItem component={Link} to="/planes" onClick={handleClose} sx={ITEM_SX}>
              Planes de pago
            </MenuItem>

            <Divider sx={{ my: 0.5, borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Servicios inline toggle */}
            <MenuItem
              onClick={() => setServicesOpen((v) => !v)}
              sx={{ ...ITEM_SX, pr: 1.25 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 1 }}>
                <Box sx={{ flexGrow: 1 }}>Servicios</Box>
                <KeyboardArrowRight
                  fontSize="small"
                  sx={{ transition: "transform .2s", transform: servicesOpen ? "rotate(90deg)" : "none" }}
                />
              </Box>
            </MenuItem>

            {/* Submenu content INSIDE the same Paper */}
            <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ py: 0.25 }}>
                <ListItemButton
                  component={Link}
                  to="/programa-stem-care/transplantes"
                  onClick={handleClose}
                  sx={SUBITEM_SX}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <MedicalServicesRounded sx={{ fontSize: 18, opacity: 0.9, color: "#d2d2d2" }} />
                  </ListItemIcon>
                  <ListItemText primary="Transplantes de células madre" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/programa-stem-care/pulpa"
                  onClick={handleClose}
                  sx={SUBITEM_SX}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <BiotechRounded sx={{ fontSize: 18, opacity: 0.9, color: "#d2d2d2" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pulpa de Diente de Leche" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/programa-stem-care/pruebas-geneticas"
                  onClick={handleClose}
                  sx={SUBITEM_SX}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <ScienceRounded sx={{ fontSize: 18, opacity: 0.9, color: "#d2d2d2" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pruebas Genéticas Veritas Int." />
                </ListItemButton>
              </List>
            </Collapse>
          </Menu>



          
          <NavLinkBtn to="/planes">Planes de Pago</NavLinkBtn>
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
            <ListItemButton onClick={() => go("/programa-stem-care")}><ListItemText primary="¿Por qué almacenar sangre del cordon de mi bebé?" /></ListItemButton>
            <ListItemButton onClick={() => go("/programa-stem-care/por-que-las-familias-eligen-stem-care")}><ListItemText primary="¿Por qué las familias eligen Stem Care?" /></ListItemButton>
            <ListItemButton onClick={() => go("/planes")}><ListItemText primary="Planes" /></ListItemButton>
            <ListItemButton onClick={() => go("/yoamoamibebe-blog")}><ListItemText primary="yoamoamibebe blog" /></ListItemButton>
            
            {/* Servicios (mobile) */}
            <ListItemButton
              onClick={() => setMobileServicesOpen(v => !v)}
              sx={{ "& .MuiListItemText-primary": { fontWeight: 700 } }}
              aria-expanded={mobileServicesOpen ? "true" : "false"}
              aria-controls="mobile-services-submenu"
            >
              <ListItemText primary="Servicios" />
              <KeyboardArrowDown
                sx={{ transition: "transform .2s", transform: mobileServicesOpen ? "rotate(180deg)" : "none" }}
              />
            </ListItemButton>

            <Collapse in={mobileServicesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding id="mobile-services-submenu">
                <ListItemButton sx={{ pl: 4 }} onClick={() => go("/programa-stem-care/transplantes")}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <MedicalServicesRounded sx={{ fontSize: 20, color: "#d2d2d2" }} />
                  </ListItemIcon>
                  <ListItemText primary="Transplantes de células madre" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={() => go("/programa-stem-care/pulpa")}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <BiotechRounded sx={{ fontSize: 20, color: "#d2d2d2" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pulpa de Diente de Leche" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={() => go("/programa-stem-care/pruebas-geneticas")}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <ScienceRounded sx={{ fontSize: 20, color: "#d2d2d2" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pruebas Genéticas Veritas Int." />
                </ListItemButton>
              </List>
            </Collapse>




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
    <LanguageProvider>
      <BrowserRouter>
        <Header />
        <SpacerUnlessHome />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/programa-stem-care" element={<Programa />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/yoamoamibebe-blog" element={<Blog />} />
        <Route path="/yoamoamibebe-blog/:slug" element={<BlogPost />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/programa-stem-care/por-que-las-familias-eligen-stem-care" element={<PorqueFamilias />} />

        <Route path="/programa-stem-care/transplantes" element={ <Transplantes /> } />
        <Route path="/programa-stem-care/pulpa" element={ <PulpaDeLeche /> } />
        <Route path="/programa-stem-care/pruebas-geneticas" element={ <PruebasGen /> } />


        <Route path="*" element={<div style={{ padding: 24, color: "#fff" }}>404</div>} />
      </Routes>


      <FloatingCta align="center" bottom={38} href="https://www.teravida.org/" label="Pregunta a StemCare AI" />

        <Footer />
        

      </BrowserRouter>
    </LanguageProvider>
  );
}
