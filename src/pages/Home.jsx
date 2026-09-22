import { GenomeTypography as Typography } from '../components/GenomeHeading.jsx';
import * as React from "react";
import { Box, Button, Container, IconButton, Stack,  Grid } from '@mui/material';
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useNavigate } from "react-router-dom";
// import cordBaby from "../assets/cord-baby.png"; // or "../../assets/cord-baby.jpg" based on your tree
import EnrollmentTimeline from '../components/EnrollmentTimeline.jsx';
import VideoCard from "../components/VideoCard.jsx";
import TypeText from "../components/TypeText.jsx";
import IMG from "../assets/cord-baby.png"; 

import { BiologicalHero, BiologicalJourney } from "../components/Biology.jsx";

const OVERLAY_COLOR = "#0e1a28";
const OVERLAY_OPACITY = 0.58;

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <BiologicalHero />

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
              variant="contained" className="stem-editorial-cta"
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
            <div className="program-brochures"><a href="/Programa-Stem-Care-2026.pdf" download>Descargar folleto - Programa Stem Care <span aria-hidden="true">↓</span></a><a href="/Stem-Care-Aplicaciones-2026.pdf" download>Descargar folleto - Aplicaciones Células Madre <span aria-hidden="true">↓</span></a></div>
          </Container>
        </Box>
      </section>

      <BiologicalJourney />
      <FamilyStory />

      <SectionServicios />

      <SectionDirectores />

      <SectionParagraph />

      <EnrollmentTimeline />
      <SectionVideos />

    </>
  );
}





function FamilyStory() {
  const [active, setActive] = React.useState(0);
  const host = React.useRef(null);
  const stories = [{"title":"Las células madre de cordón umbilical de tu bebé disponibles inmediatamente.","text":"Almacenar las células madre de sangre de cordón umbilical es una decisión importante, hacerlo con Stem Care es una decisión inteligente.","src":"/cord-baby.png"},{"title":"Somos expertos y líderes de opinión en nuestro campo.","text":"Nuestro servicio es único en la región porque atendemos llamadas de recolección las 24 horas, los 365 días del año. Por ser almacenadas en Guatemala, las muestras son procesadas y crío preservadas en menos de 24 horas para garantizar la calidad y cantidad de células madre almacenadas.","src":"/brcg-09.png"}];
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.story)); }), {rootMargin:'-30% 0px -35% 0px'});
    host.current.querySelectorAll('[data-story]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <section className="family-story" ref={host}><div className="family-story-stage" aria-hidden="true">{stories.map((story,i) => <img key={story.src} src={story.src} alt="" className={i === active ? 'is-active' : ''} />)}</div><div className="family-story-steps">{stories.map((story,i) => <article key={story.src} data-story={i}><img className="family-story-mobile" src={story.src} alt={i ? 'Especialista de Stem Care en el laboratorio' : 'Una familia sostiene los pies de su bebé'} /><span className="care-story-index">0{i+1} / STEM CARE</span><Typography component="h2">{story.title}</Typography><p>{story.text}</p></article>)}</div></section>;
}
function SectionServicios() {
  const [active, setActive] = React.useState(0);
  const host = React.useRef(null);
  const cards = [
    { src: '/pruebas-geneticas.png', label: 'Programa Stem Care', path: '/programa-stem-care' },
    { src: '/pulpa-diente-de-leche.png', label: 'Pulpa de Diente de Leche', path: '/programa-stem-care/pulpa' },
    { src: '/programa-stem-care.png', label: 'Pruebas Genéticas Veritas', path: '/programa-stem-care/pruebas-geneticas' },
  ];
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.service)); });
    }, { rootMargin: '-30% 0px -35% 0px' });
    host.current.querySelectorAll('[data-service]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <section className="services-experience" ref={host}>
    <Typography component="h2">Nuestros Servicios</Typography>
    <div className="services-scroll">
      <div className="services-stage" aria-hidden="true">
        <div className="services-orbit" />
        {cards.map((card, index) => <img key={card.src} className={active === index ? 'is-active' : ''} src={card.src} alt="" />)}
        <span className="services-count">0{active + 1} / 03</span>
      </div>
      <div className="services-steps">{cards.map((card, index) => <article key={card.path} data-service={index} className={active === index ? 'is-active' : ''}>
        <img className="services-mobile-image" src={card.src} alt="" loading="lazy" />
        <span className="care-story-index">0{index + 1}</span>
        <Typography component="h3">{card.label}</Typography>
        <a className="services-link" href={card.path}>Más información <span aria-hidden="true">↗</span></a>
      </article>)}</div>
    </div>
  </section>;
}

function SectionDirectores() {
  const navigate = useNavigate();
  const cards = [
    { src: '/Erwin.png', label: 'Dr. Humberto Calgua Guerra', alt: 'Dr. Humberto Calgua Guerra' },
    { src: '/Ale.png', label: 'María Alejandra Calgua Guerra', alt: 'María Alejandra Calgua Guerra' },
    { src: '/Byron.png', label: 'Dr. Byron Rene Calgua Guerra', alt: 'Dr. Byron Rene Calgua Guerra' },
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
                    aspectRatio: '1 / 1',         // consistent tile height; adjust to your art
                    overflow: 'hidden',
                    borderRadius: 3
                  }}
                >
                  <img
                    src={src}
                    alt={alt} loading="lazy" decoding="async"
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
              variant="contained" className="stem-editorial-cta"
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

          {videos.map(({ src, label }) => (
            <Grid key={label} size={{ xs: 12, sm: 6, md: 6 }}>
              <VideoCard src={src} label={label} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
