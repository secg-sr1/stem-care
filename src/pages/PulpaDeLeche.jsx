import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";

// Icons
import Dentistry from "@mui/icons-material/EmojiNature";             // used as a tooth-ish pictogram
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";
import AcUnitRounded from "@mui/icons-material/AcUnitRounded";
import ChecklistRounded from "@mui/icons-material/ChecklistRounded";
import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import TipsAndUpdatesRounded from "@mui/icons-material/TipsAndUpdatesRounded";
import ReceiptLongRounded from "@mui/icons-material/ReceiptLongRounded";
import Circle from "@mui/icons-material/Circle";

// Shared card style (same vibe as your other pages)
const CARD_SX = {
  bgcolor: "#fff",
  color: "#05080d",
  borderRadius: 3,
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
  transition: "transform .2s ease, box-shadow .2s ease",
  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 40px rgba(0,0,0,0.55)" },
};

function SectionHeader({ icon, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color:"primary.main" }}>
      {icon}
      <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
        {text}
      </Typography>
    </Box>
  );
}

function Bullets({ items }) {
  return (
    <List dense sx={{ py: 0 }}>
      {items.map((t, i) => (
        <ListItem key={i} sx={{ px: 0, alignItems: "flex-start" }}>
          <ListItemIcon sx={{ minWidth: 24, mt: "2px" }}>
            <Circle sx={{ fontSize: 8, opacity: 0.7 }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ variant: "body2", sx: { opacity: 0.95 } }} primary={t} />
        </ListItem>
      ))}
    </List>
  );
}

export default function PulpaDeLeche() {
  // Lists built from your content
  const celulasPulpa = [
    "Odontoblastos",
    "Fibroblastos",
    "Células mesenquimales indiferenciadas",
    "Células inflamatorias",
    "Células asociadas a los vasos sanguíneos",
    "Células endoteliales",
    "Células perivasculares y pericitos",
    "Células madre",
  ];

  const funcionesPulpa = [
    "Las células de los vasos sanguíneos y los nervios de la pulpa proveen la vitalidad del diente.",
    "Función inductiva",
    "Formativa",
    "Protectiva",
    "Nutritiva",
    "Reparativa",
  ];

  const usosBeneficios = [
    "Actualmente se tratan con éxito una gran cantidad de enfermedades utilizando células madre.",
    "Los estudios constantes han permitido grandes adelantos.",
    "Al provenir de la misma persona, el trasplante no es rechazado.",
    "Compatibilidad perfecta con el niño o niña; muy bajas probabilidades de rechazo por otros factores.",
    "Pocas complicaciones comparado con tratamientos que usan células de un donador.",
    "Costo considerablemente más bajo frente a otras alternativas o a la búsqueda de un donador de médula ósea.",
    "No tiene cuestionamiento ético o moral; es la opción recomendada para evitar el uso de embriones humanos.",
  ];

  const beneficiosPropios = [
    "El congelamiento de las células madre se lleva a cabo en pocas horas, asegurando mayor viabilidad y porcentaje de recolección.",
    "Están listas para su uso inmediato.",
    "Sistema de almacenaje y bi-archivo por coordenadas dentro del tanque y registro computarizado para evitar error humano.",
  ];

  const pasosContratacion = [
    "Llenar formularios y enviarlos junto con copias del DPI de ambos padres y Certificado de Nacimiento del hijo(a).",
    "Avisar a Stem Care el lugar, fecha y hora de extracción de los dientes de leche.",
    "Realizar el pago por depósito, transferencia, cheque o tarjeta de crédito.",
  ];

  const recomendaciones = [
    "La extracción debe realizarse antes de que los dientes de leche del niño(a) se aflojen.",
    "Avisar al dentista que realizará la extracción que contratarán el servicio de almacenamiento de pulpa de diente de leche.",
  ];

  return (
    <Box sx={{ bgcolor: "#ffff", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h4" sx={{ color: "#05080d", fontWeight: 800, mb: { xs: 3, md: 5 } }}>
          Pulpa de Diente de Leche
        </Typography>

        {/* Intro / ciencia */}
        <Card id="pulpa" sx={{ ...CARD_SX, mb: 3, border:1, borderColor:"#d2d2d2" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<Dentistry sx={{ color: "primary.main" }} />} text="Pulpa de Diente de Leche" />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              La investigación de células madre se ha convertido en un campo prometedor para la regeneración
              de tejidos y la medicina regenerativa. Desde la caracterización de células madre mesenquimales
              de médula ósea, se han descrito poblaciones similares en cerebro, piel, músculo esquelético y
              tracto gastrointestinal.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Estudios revelan la presencia de células madre en tejidos de origen dental. Se han descrito
              cultivos primarios con células progenitoras de pulpa dental y de ligamento periodontal.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Las células de pulpa dental pueden diferenciarse a <strong>tejido óseo</strong>, <strong>tejido
              neural</strong> e incluso aplicarse en <strong>ingeniería de tejidos dentales</strong>. La pulpa
              dental es, por tanto, una <strong>fuente prometedora de células mesenquimales</strong> para
              terapias celulares e ingeniería de tejidos.
            </Typography>
            <Divider sx={{ my: 2, opacity: 0.12 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SectionHeader icon={<BiotechRounded sx={{ color: "primary.main" }} />} text="Las células de la pulpa" />
                <Bullets items={celulasPulpa} />
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionHeader icon={<ScienceRounded sx={{ color: "primary.main" }} />} text="Funciones de la pulpa" />
                <Bullets items={funcionesPulpa} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Usos y beneficios */}
        <Card sx={{ ...CARD_SX, mb: 3, border:1, borderColor:"#d2d2d2" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<ChecklistRounded sx={{ color: "primary.main" }} />} text="Usos y beneficios" />
            <Bullets items={usosBeneficios} />
          </CardContent>
        </Card>

        {/* Criogénesis */}
        <Card sx={{ ...CARD_SX, mb: 3, border:1, borderColor:"#d2d2d2" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<AcUnitRounded sx={{ color: "primary.main" }} />}
              text="Criogénesis: técnica de almacenamiento de células madre"
            />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              El diente de leche se prepara y almacena por medio de un proceso <strong>criogénico</strong>, con el fin
              de garantizar la viabilidad de las células durante el almacenamiento. La criogenia, con más de 80 años de
              desarrollo, ha demostrado conservar células, tejidos y organismos sin pérdida de características vitales.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Las células madre pueden congelarse por <strong>criogénesis</strong> sin perder su viabilidad. El principio
              es la congelación profunda mediante <strong>nitrógeno líquido</strong> a −196&nbsp;°C y el uso de agentes
              crioprotectores que mantienen la integridad celular.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Existen células humanas almacenadas por 60 años y células madre por más de 30 años que mantienen su
              viabilidad; se estima que pueden conservarse <strong>hasta 200 años</strong> bajo condiciones normales.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Otros ejemplos: sangre de cordón umbilical, óvulos, espermatozoides, médula ósea, sangre completa, suero,
              plasma, plaquetas y tejidos como hueso, cartílago, córneas, etc. Stem Care utiliza equipos modernos de
              criogénesis (Thermo-Electron).
            </Typography>

            <Divider sx={{ my: 2, opacity: 0.12 }} />
            <SectionHeader icon={<TipsAndUpdatesRounded sx={{ color: "primary.main" }} />} text="Nuestros beneficios" />
            <Bullets items={beneficiosPropios} />
          </CardContent>
        </Card>

        {/* Pasos / Recomendaciones / Costos */}
        <Card sx={{ ...CARD_SX, border:1, borderColor:"#d2d2d2" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SectionHeader
                  icon={<AssignmentTurnedInRounded sx={{ color: "primary.main" }} />}
                  text="Pasos para la contratación"
                />
                <Bullets items={pasosContratacion} />
                <Divider sx={{ my: 2, opacity: 0.12 }} />
                <SectionHeader
                  icon={<TipsAndUpdatesRounded sx={{ color: "primary.main" }} />}
                  text="Recomendaciones"
                />
                <Bullets items={recomendaciones} />
              </Grid>

              <Grid item xs={12} md={6}>
                <SectionHeader icon={<ReceiptLongRounded sx={{ color: "primary.main" }} />} text="Costos" />
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24, mt: "2px" }}>
                      <Circle sx={{ fontSize: 8, opacity: 0.7 }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ variant: "body2", sx: { opacity: 0.95 } }}
                      primary="Costo del servicio: Q10,500.00 (incluye un año de almacenamiento)"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24, mt: "2px" }}>
                      <Circle sx={{ fontSize: 8, opacity: 0.7 }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ variant: "body2", sx: { opacity: 0.95 } }}
                      primary="Costo anualidades: Q820.00"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24, mt: "2px" }}>
                      <Circle sx={{ fontSize: 8, opacity: 0.7 }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ variant: "body2", sx: { opacity: 0.95 } }}
                      primary="Precio incluye IVA"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
