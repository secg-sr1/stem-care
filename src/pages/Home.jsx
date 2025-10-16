import * as React from "react";
import { Box, Button, Container, IconButton, Stack, Typography, Grid } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useNavigate } from "react-router-dom";
// import cordBaby from "../assets/cord-baby.png"; // or "../../assets/cord-baby.jpg" based on your tree
import IMG from "../assets/cord-baby.png"; 

const OVERLAY_COLOR = "#0e1a28";
const OVERLAY_OPACITY = 0.58;

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          pt: { xs: "64px", md: "82px" },      // appbar height
          backgroundImage: `url(/hero.png)`,    // put your image in /public/hero.jpg
          backgroundSize: "cover",
          backgroundPosition: "center",
          "::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: OVERLAY_COLOR,
            mixBlendMode: "screen",
            opacity: OVERLAY_OPACITY,
            pointerEvents: "none",
          },
          "::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 90% at 60% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
          },
        }}
      >

        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 82px)" },
            display: "grid",
            placeItems: "center",
            pb: { xs: 6, md: 10 },
          }}
        >
          <Box sx={{ textAlign: "center", px: { xs: 2, sm: 3, md: 0 } }}>
            <Typography
              sx={{
                color: "#e8edf6",
                fontFamily: "Manrope, sans-serif",
                fontSize: { xs: 28, sm: 34, md: 44, lg: 56 },
                lineHeight: { xs: 1.25, md: 1.15 },
                fontWeight: 300,
                letterSpacing: 0.2,
                maxWidth: { xs: 680, md: 920 },
                mx: "auto",
              }}
            >
              El Primer y Único Banco Privado de Células
              <br />
              Madre de Cordón Umbilical en Guatemala
              <br />
              desde el año 2006.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: { xs: 3, md: 5 }, flexWrap: "wrap" }}
            >
              <Button
                onClick={() => navigate("/planes")}
                variant="outlined"
                size="large"
                fullWidth={{ xs: true, sm: false }}
                sx={{
                  borderColor: "rgba(255,255,255,0.55)",
                  color: "#fff",
                  borderRadius: { xs: 1.5, sm: 2 },
                  px: { xs: 4, sm: 6 },
                  py: 1.6,
                  fontWeight: 700,
                  backdropFilter: "blur(2px)",
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                planes
              </Button>

              <Stack direction="row" spacing={1.25} alignItems="center">
                <IconButton
                  aria-label="Reproducir podcast Alejandra Calgua"
                  onClick={() => window.open("https://www.youtube.com/watch?app=desktop&v=yRuY5k6sIyg&fbclid=PAT01DUANeMCRleHRuA2FlbQIxMAABpx13RV59L8Lq5q6A6PUzsSnA9W7kJHzbWHc1hn9HhU_i0ZGEhqcgGLiAVbcE_aem_aH3VGSjqtittEkYSiam-iA", "_blank")}
                  sx={{
                    position: "relative",
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    color: "#0e1a28",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                    "&:hover": { backgroundColor: "#f1f1f1" },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: { xs: -5, sm: -8 },
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.55)",
                      opacity: 0,
                      animation: "pulse 2.2s ease-out infinite",
                    },
                    "&:hover::before, &:focus-visible::before": {
                      animationPlayState: "paused",
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                      "&::before": { animation: "none" },
                    },
                    "@keyframes pulse": {
                      "0%": { transform: "scale(0.9)", opacity: 0.7 },
                      "70%": { transform: "scale(1.25)", opacity: 0 },
                      "100%": { opacity: 0 },
                    },
                  }}
                >
                  <PlayArrowRoundedIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                </IconButton>
                <Typography sx={{ color: "#e8edf6", fontWeight: 600, fontSize: { xs: 15, sm: 16 } }}>
                  Podcast Alejandra Calgua
                </Typography>
              </Stack>
            </Stack>

            {/* Optional "scroll down" link */}
            {/* <Button href="#intro" sx={{ mt: 3, color: "#e8edf6", textTransform: "none" }}>↓ Más información</Button> */}
          </Box>
        </Container>
      </Box>

      {/* SECTION BELOW HERO */}
      <section id="intro">
        <Box sx={{ bgcolor: "#ffffff", color: "#2b3340", py: { xs: 8, sm: 10, md: 12 } }}>
          <Container maxWidth="md" sx={{ textAlign: "center", px: { xs: 3, sm: 4 } }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 700,
                fontSize: { xs: 32, sm: 38, md: 44 },
                letterSpacing: 0.4,
                mb: { xs: 3, sm: 4 },
              }}
            >
              Almacenamiento Local
            </Typography>

            <Typography
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 300,
                fontSize: { xs: 18, sm: 20 },
                lineHeight: 1.6,
                opacity: 0.9,
                maxWidth: 900,
                mx: "auto",
                mb: { xs: 5, sm: 6 },
              }}
            >
              Nuestro servicio es único en la región porque atendemos llamadas de recolección
              las 24 horas, los 365 días del año. Por ser almacenadas en Guatemala, las muestras
              son procesadas y crío preservadas en menos de 24 horas para garantizar la calidad
              y cantidad de células madre almacenadas.
            </Typography>

            <Button
              onClick={() => navigate("/programa-stem-care")}
              variant="contained"
              sx={{
                px: { xs: 4, sm: 6 },
                py: 1.5,
                fontWeight: 700,
                borderRadius: 0,
                backgroundColor: "#5b5868",
                "&:hover": { backgroundColor: "#4e4a5b" },
              }}
            >
              Programa Stem Care
            </Button>
          </Container>
        </Box>
      </section>

      <SectionCordBlood />

      <SectionCrio />

      <SectionServicios />

      <SectionDirectores />

      <SectionParagraph />

      <SectionVideos />

    </>
  );
}





function SectionCordBlood() {
  return (
    <Box component="section" sx={{ bgcolor: '#ffffffff', color: '#26313a', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
        {/* LEFT: image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              px: { xs: 2, md: 10 },
            }}
          >
            <img
              src="/cord-baby.png"
              alt="Cordón umbilical"
              style={{
                width: '100%',         // fluid on small screens
                height: 'auto',
                maxWidth: 520,         // cap on larger screens (adjust to taste)
                borderRadius: 0,
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        {/* RIGHT: text */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ pt: { xs: 2, md: 8 }, px: { xs: 2, md: 0 } }}>
            <Typography
              component="h2"
              sx={{
                color: '#26313a',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: { xs: 26, sm: 32, md: 40 },
                lineHeight: { xs: 1.25, md: 1.2 },
                letterSpacing: 0.2,
                mb: { xs: 2.5, md: 3 },
              }}
            >
              Las células madre de cordón umbilical de tu bebé
              <br />
              disponibles inmediatamente.
            </Typography>

            <Typography
              sx={{
                color: '#26313a',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 300,
                fontSize: { xs: 16, sm: 18, md: 20 },
                lineHeight: 1.7,
                opacity: 0.9,
                maxWidth: 620,
              }}
            >
              Almacenar las células madre de sangre de cordón umbilical es una
              decisión importante, hacerlo con Stem Care es una decisión
              inteligente.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}



function SectionCrio() {
  return (
    <Box component="section" sx={{ bgcolor: '#ffffffff', color: '#26313a', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
        {/* LEFT: image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ pt: { xs: 2, md: 8 }, px: { xs: 2, md: 10 } }}>
            <Typography
              component="h2"
              sx={{
                color: '#26313a',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: { xs: 26, sm: 32, md: 40 },
                lineHeight: { xs: 1.25, md: 1.2 },
                letterSpacing: 0.2,
                mb: { xs: 2.5, md: 3 },
              }}
            >
              Somos expertos y líderes de
              <br />
              opinión en nuestro campo.
            </Typography>

            <Typography
              sx={{
                color: '#26313a',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 300,
                fontSize: { xs: 16, sm: 18, md: 20 },
                lineHeight: 1.7,
                opacity: 0.9,
                maxWidth: 620,
              }}
            >
              Nuestro servicio es único en la región porque
              atendemos llamadas de recolección las 24
              horas, los 365 días del año. Por ser
              almacenadas en Guatemala, las muestras son
              procesadas y crío preservadas en menos de 24
              horas para garantizar la calidad y cantidad de
              células madre almacenadas.
            </Typography>
          </Box>
        </Grid>


        {/* RIGHT: text */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              px: { xs: 2, md: 8 },
            }}
          >
            <img
              src="/brcg-09.png"
              alt="Cordón umbilical"
              style={{
                width: '100%',         // fluid on small screens
                height: 'auto',
                maxWidth: 620,         // cap on larger screens (adjust to taste)
                borderRadius: 0,
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}


function SectionServicios() {
  const navigate = useNavigate();
  
  const cards = [
    { src: '/programa-stem-care.png', label: 'Programa Stem Care', alt: 'Programa Stem Care', path: '/programa-stem-care' },
    { src: '/pulpa-diente-de-leche.png', label: 'Pulpa de Diente de Leche', alt: 'Pulpa de Diente de Leche', path: '/programa-stem-care/pulpa' },
    { src: '/pruebas-geneticas.png', label: 'Pruebas Genéticas Veritas', alt: 'Pruebas Genéticas Veritas', path: '/programa-stem-care/pruebas-geneticas' },
  ];

  return (
    <Box component="section" sx={{ bgcolor: '#fff', color: '#26313a', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* dark band wrapper */}
        <Grid container size={{ xs: 12 }} sx={{ bgcolor: '#26313a', borderRadius: { md: 1 }, pb: { xs: 3, md: 6 } }}>
          {/* title */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  color: '#fff',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: 26, sm: 32, md: 40 },
                  lineHeight: { xs: 1.25, md: 1.2 },
                  letterSpacing: 0.2,
                }}
              >
                Nuestros Servicios
              </Typography>
            </Box>
          </Grid>

          {/* cards */}
          {cards.map(({ src, label, alt, path }) => (
            <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component="figure"
                onClick={() => navigate(path)}
                sx={{
                  m: 0,
                  px: { xs: 2, md: 4 },
                  // keep image and caption together & centered
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* keep a consistent aspect ratio so all cards line up nicely */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 420,                  // cap width on larger screens
                    aspectRatio: '11 / 9',         // consistent tile height; adjust to your art
                    overflow: 'hidden',
                    borderRadius: 1,
                    transition: 'box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>

                <Box component="figcaption" sx={{ textAlign: 'center' }}>
                  <Typography sx={{ 
                    color: '#fff', 
                    fontSize: { xs: 16, md: 18 },
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': {
                      color: '#e0e0e0',
                    },
                  }}>
                    {label}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          {/* CTA */}
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 2, md: 2 } }}>
            <Button
              onClick={() => navigate("/programa-stem-care")}
              variant="contained"
              sx={{
                px: { xs: 4, sm: 6 },
                py: 1.2,
                fontSize: { xs: 16, md: 18 },
                fontWeight: 600,
                borderRadius: 0,
                backgroundColor: '#5b5868',
                '&:hover': { backgroundColor: '#4e4a5b' },
              }}
            >
              Más información
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}





function SectionDirectores() {
  const cards = [
    { src: '/programa-stem-care.png', label: 'Dr. Humberto Calgua Guerra', alt: 'Dr. Humberto Calgua Guerra' },
    { src: '/pulpa-diente-de-leche.png', label: 'María Alejandra Calgua Guerra', alt: 'María Alejandra Calgua Guerra' },
    { src: '/pruebas-geneticas.png', label: 'Dr. Byron Rene Calgua Guerra', alt: 'Dr. Byron Rene Calgua Guerra' },
  ];

  return (
    <Box component="section" sx={{ bgcolor: '#fff', color: '#26313a', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* dark band wrapper */}
        <Grid container size={{ xs: 12 }} sx={{ bgcolor: '#ffffffff', borderRadius: { md: 1 }, pb: { xs: 3, md: 6 } }}>
          {/* title */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  color: '#26313a',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: 26, sm: 32, md: 40 },
                  lineHeight: { xs: 1.25, md: 1.2 },
                  letterSpacing: 0.2,
                }}
              >
                Directores Stem Care
              </Typography>
            </Box>
          </Grid>

          {/* cards */}
          {cards.map(({ src, label, alt }) => (
            <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component="figure"
                sx={{
                  m: 0,
                  px: { xs: 2, md: 4 },
                  // keep image and caption together & centered
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  
                }}
              >
                {/* keep a consistent aspect ratio so all cards line up nicely */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 420,                  // cap width on larger screens
                    aspectRatio: '11 / 9',         // consistent tile height; adjust to your art
                    overflow: 'hidden',
                    border:1
                  }}
                >
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>

                <Box component="figcaption" sx={{ textAlign: 'center' }}>
                  <Typography sx={{ color: '#26313a', fontSize: { xs: 16, md: 18 } }}>
                    {label}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          {/* CTA */}
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 2, md: 2 } }}>
            <Button
              onClick={() => navigate("/programa-stem-care")}
              variant="contained"
              sx={{
                px: { xs: 4, sm: 6 },
                py: 1.2,
                fontSize: { xs: 16, md: 18 },
                fontWeight: 600,
                borderRadius: 0,
                backgroundColor: '#5b5868',
                '&:hover': { backgroundColor: '#4e4a5b' },
              }}
            >
              Más información
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}


function SectionParagraph() {

  return (
    <Box component="section" sx={{ bgcolor: '#fff', color: '#26313a', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* dark band wrapper */}
        <Grid container size={{ xs: 12 }} sx={{ bgcolor: '#26313a', borderRadius: { md: 1 }, pb: { xs: 3, md: 6 } }}>
          {/* title */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  color: '#fff',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: 26, sm: 32, md: 38 },
                  lineHeight: { xs: 1.25, md: 1.2 },
                  letterSpacing: 0.2,
                  textAlign: 'center',
                }}
              >
                "La sangre del cordón umbilical representa una 
              oportunidad única de preservar células madre 
              que pueden salvar vidas. Cada familia que 
              decide almacenar estas células está creando 
              un tesoro biológico para el futuro de sus seres 
              queridos."
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  color: '#fff',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: 26, sm: 32, md: 24 },
                  lineHeight: { xs: 1.25, md: 1.2 },
                  letterSpacing: 0.2,
                }}
              >
                ● Dra. Eliane Gluckman, Pionera en Trasplantes de Cordón Umbilical
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function SectionVideos() {
  const videos = [
    { src: "https://www.youtube.com/embed/Zg9ez3L3Mxw?si=m5rrU6W9PnRzomXF", label: "Experiencia Stem Care" },
    { src: "https://www.youtube.com/embed/JUGgN3PB-5c?si=02aW8PGoFvjynTmd", label: "El Corazón de Stem Care" },
    { src: "https://www.youtube.com/embed/2mkFN3OIC-Q?si=CO1zxi6M1hkYSsaJ", label: "Stem Care Guatemala Spot" },
    { src: "https://www.youtube.com/embed/uzxoNG3eWag?si=ZbFZUnW4caMJt4PE", label: "Entrevista Dr. Erwin Calgua" },
  ];

  return (
    <Box component="section" sx={{ bgcolor: "#fff", color: "#26313a", py: { xs: 6, md: 10 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid container size={{ xs: 12 }} sx={{ bgcolor: "#fff", borderRadius: { md: 1 }, pb: { xs: 3, md: 6 } }}>
          {/* Title */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "center", pt: { xs: 4, md: 8 }, px: { xs: 2, md: 10 } }}>
              <Typography
                component="h2"
                sx={{
                  color: "#26313a",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: 26, sm: 32, md: 40 },
                  lineHeight: { xs: 1.25, md: 1.2 },
                  letterSpacing: 0.2,
                }}
              >
                Videos Stem Care
              </Typography>
            </Box>
          </Grid>

          {/* Cards with Videos */}
          {videos.map(({ src, label }) => (
            <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                component="figure"
                sx={{
                  m: 0,
                  px: { xs: 2, md: 1 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* Responsive video container */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 420,
                    aspectRatio: "16/9", // keeps the video responsive
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={src}
                    title={label}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: 0 }}
                  ></iframe>
                </Box>

                <Box component="figcaption" sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#26313a", fontSize: { xs: 16, md: 18 } }}>
                    {label}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}