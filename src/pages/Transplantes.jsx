// src/pages/Transplantes.jsx
import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Icons
import HealingRounded from "@mui/icons-material/HealingRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import BloodtypeRounded from "@mui/icons-material/BloodtypeRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import ShieldRounded from "@mui/icons-material/ShieldRounded";
import BubbleChartRounded from "@mui/icons-material/BubbleChartRounded";
import Circle from "@mui/icons-material/Circle";

// shared card style (same vibe as your other pages)
const CARD_SX = {
  bgcolor: "#fff",
  color: "#0b0f14",
  borderRadius: 3,
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
  transition: "transform .2s ease, box-shadow .2s ease",
  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 40px rgba(0,0,0,0.55)" },
};

function SectionHeader({ icon, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      {icon}
      <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.2, color:"#5b5868" }}>
        {text}
      </Typography>
    </Box>
  );
}

function CategoryList({ title, icon, items }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color:"#5b5868" }}>
          {title}
        </Typography>
      </Box>
      <List dense sx={{ py: 0 }}>
        {items.map((it, i) => (
          <ListItem key={i} sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 26 }}>
              <Circle sx={{ fontSize: 8, opacity: 0.7 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: "body2", sx: { opacity: 0.95 } }} primary={it} />
          </ListItem>
        ))}
      </List>
      
    </Box>
  );
}

export default function Transplantes() {
  // --- DATA (grouped exactly as you provided) ---
  const grupos = [
    {
      title: "Aplicaciones",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Diabetes",
        "Esclerosis Múltiple",
        "Artritis Reumatoide",
        "Lupus Eritematoso Sistémico",
        "Enfermedad de Alzheimer",
        "Distrofia muscular",
        "Enfermedad de Parkinson",
        "Daños de la médula espinal",
      ],
    },
    {
      title: "Otras enfermedades tumorales",
      icon: <ScienceRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Tumor cerebral",
        "Cáncer de mama",
        "Sarcoma de Ewing",
        "Neuroblastoma",
        "Cáncer de ovario",
        "Carcinoma de células renales",
        "Cáncer testicular",
      ],
    },
    {
      title: "Enfermedades autoinmunes",
      icon: <ShieldRounded sx={{ color: "#5b5868" }} />,
      items: ["Síndrome de Evan"],
    },
    {
      title: "Regeneración de órganos",
      icon: <AutoAwesomeRounded sx={{ color: "#5b5868" }} />,
      items: ["Reparación de cicatriz post-infarto", "Derrame cerebral", "Enfermedades hepáticas"],
    },
    {
      title: "Leucemias agudas",
      icon: <BloodtypeRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Leucemia bifenotípica aguda",
        "Leucemia linfocítica aguda (ALL)",
        "Leucemia mielocítica aguda (AML)",
        "Leucemia aguda no diferenciada",
      ],
    },
    {
      title: "Leucemias crónicas",
      icon: <BloodtypeRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Leucemia linfocítica crónica (CLL)",
        "Leucemia mielocítica crónica (CML)",
        "Leucemia mielocítica juvenil crónica (JCML)",
        "Leucemia mielomonocítica juvenil (JMML)",
      ],
    },
    {
      title: "Síndromes mielodisplásicos",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Amiloidosis",
        "Leucemia mielomonocítica crónica (CMML)",
        "Anemia refractaria (RA)",
        "Anemia refractaria con exceso de blastos (RAEB)",
        "Anemia refractaria con exceso de blastos en transformación (RAEB-T)",
        "Anemia refractaria con sideroblastos en anillo (RARS)",
      ],
    },
    {
      title: "Síndromes de células madre",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Anemia aplástica severa",
        "Citopenia congénita",
        "Disqueratosis congénita",
        "Anemia de Fanconi",
        "Hemoglobinuria paroxística nocturna (PNH)",
      ],
    },
    {
      title: "Síndromes mieloproliferativos",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: ["Mielofibrosis aguda", "Metaplasia mieloide agnogénica (Mielofibrosis)", "Trombocitemia esencial", "Policitemia Vera"],
    },
    {
      title: "Síndromes linfoproliferativos",
      icon: <BloodtypeRounded sx={{ color: "#5b5868" }} />,
      items: ["Enfermedad de Hodgkin", "Linfoma No-Hodgkin", "Leucemia promielocítica"],
    },
    {
      title: "Síndromes fagocitarios",
      icon: <BubbleChartRounded sx={{ color: "#5b5868" }} />,
      items: ["Síndrome de Chédiak-Higashi", "Granulomatosis crónica", "Deficiencia de actina del neutrófilo", "Disgénesis reticular"],
    },
    {
      title: "Enfermedades por depósito lisosomal",
      icon: <ScienceRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Adrenoleucodistrofia",
        "Enfermedad de Gaucher",
        "Síndrome de Hunter (MPS-II)",
        "Síndrome de Hurler (MPS-IH)",
        "Enfermedad de Krabbe",
        "Síndrome Maroteaux-Lamy (MPS-VI)",
        "Leucodistrofia metacromática",
        "Síndrome de Morquio (MPS-IV)",
        "Mucolipidosis II (Enfermedad celular)",
        "Mucopolisacaridosis (MPS)",
        "Enfermedad de Niemann-Pick",
        "Síndrome de Sanfilippo (MPS-III)",
        "Síndrome de Scheie (MPS-IS)",
        "Síndrome de Sly",
        "Deficiencia de beta-glucuronidasa (MPS-VII)",
        "Enfermedad de Wolman",
      ],
    },
    {
      title: "Síndromes histiocíticos",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Linfohistiocitosis hemofagocítica familiar",
        "Hemofagocitosis",
        "Histiocitosis de células de Langerhans",
        "Histiocitosis-X",
      ],
    },
    {
      title: "Anormalidades eritrocíticas congénitas",
      icon: <BloodtypeRounded sx={{ color: "#5b5868" }} />,
      items: ["Beta talasemia mayor", "Anemia de Blackfan-Diamond", "Aplasia pura de eritrocitos", "Anemia de células falciformes"],
    },
    {
      title: "Síndromes congénitos del sistema inmune",
      icon: <ShieldRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Ausencia de linfocitos T y B (SCID)",
        "Ausencia de linfocitos T con linfocitos B normales (SCID)",
        "Ataxia-Telangiectasia",
        "Síndrome del linfocito desnudo",
        "Inmunodeficiencia común variable",
        "Síndrome de DiGeorge",
        "Síndrome de Kostmann",
        "Deficiencia de adhesión leucocitaria",
        "Síndrome de Omenn",
        "SCID con deficiencia de adenosina deaminasa",
        "Síndrome linfoproliferativo ligado al cromosoma X",
      ],
    },
    {
      title: "Otras enfermedades congénitas",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: [
        "Hipoplasia del cartílago",
        "Lipofuscinosis ceroide",
        "Porfiria eritropoyética congénita",
        "Trombastenia de Glanzmann",
        "Síndrome de Lesch-Nyhan",
        "Osteopetrosis",
        "Enfermedad de Tay-Sachs",
      ],
    },
    {
      title: "Anormalidades plaquetarias congénitas",
      icon: <BloodtypeRounded sx={{ color: "#5b5868" }} />,
      items: ["Amegacariocitosis / Trombocitopenia congénita"],
    },
    {
      title: "Desórdenes de células plasmáticas",
      icon: <BiotechRounded sx={{ color: "#5b5868" }} />,
      items: ["Mieloma múltiple", "Leucemia de células plasmáticas", "Macroglobulinemia de Waldenström"],
    },
  ];

  return (
    <Box sx={{ bgcolor: "#ffff", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h4" sx={{ color: "#05080d", fontWeight: 800, mb: { xs: 3, md: 5 } }}>
          Trasplantes de Células Madre
        </Typography>

        {/* Intro / historia */}
        <Card id="transplantes" sx={{ ...CARD_SX, mb: 3, border:1, borderColor:"#d2d2d2" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<HealingRounded sx={{ color: "#5b5868" }} />}
              text="¿En qué enfermedades pueden aplicarse las células madre de cordón umbilical?"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              En el año 2006 inicia operaciones Stem Care, el primer banco privado de células madre de sangre
              de cordón umbilical en Guatemala. En 2008, un equipo multidisciplinario realizó el <strong>primer
              tratamiento con células madre adultas</strong> en Guatemala y Centroamérica, en un paciente con
              infarto agudo al miocardio que le dejó una enfermedad crónica del corazón.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Diez años después del tratamiento, la <em>fracción de eyección cardíaca</em> del paciente mejoró
              significativamente, permitiéndole caminar y realizar sus actividades con independencia. Los
              resultados se presentaron en el Congreso de Medicina Interna de Guatemala y en el Congreso de
              Cardiología en Argentina.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Hoy, en Stem Care somos uno de los <strong>pocos equipos en el mundo</strong> y uno de cuatro en
              Latinoamérica con capacidad para ofrecer tratamientos con células madre adultas aplicando
              <strong> técnicas innovadoras</strong> desarrolladas por nuestro equipo.
            </Typography>
          </CardContent>
        </Card>

        {/* Aplicaciones */}
        <Card sx={{ ...CARD_SX, border:1, borderColor:"#d2d2d2" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<LocalHospitalRounded sx={{ color: "#5b5868" }} />}
              text="Aplicaciones clínicas (enfermedades y síndromes)"
            />
            <Divider sx={{ my: 2, opacity: 0.12 }} />

            <Grid container spacing={3}>
              {grupos.map((g, idx) => (
                <Grid key={idx} item xs={12} md={6}>
                  <CategoryList title={g.title} icon={g.icon} items={g.items} />
                </Grid>
              ))}
            </Grid>


            <Box
                sx={{
                 columnCount: { xs: 1, md: 2, lg: 3 },   // 1 → 2 → 3 columns
                 columnGap: 3,                            // theme spacing between columns
               }}
             >
               {grupos.map((g, idx) => (
                 <Box
                   key={idx}
                   sx={{
                     breakInside: 'avoid-column',         // prevent splitting a section
                     WebkitColumnBreakInside: 'avoid',
                     pageBreakInside: 'avoid',
                     display: 'inline-block',             // needed for proper column flow
                     width: '100%',
                     mb: 3,
                   }}
                 >
                   <CategoryList title={g.title} icon={g.icon} items={g.items} />
                 </Box>
               ))}
             </Box>
            

            <Divider sx={{ mt: 1, opacity: 0.12 }} />
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ScienceRounded sx={{ color: "#5b5868" }} />
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                La indicación y aplicación terapéutica debe ser evaluada por el equipo médico tratante,
                con base en la evidencia científica más actual y el contexto clínico del paciente.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
