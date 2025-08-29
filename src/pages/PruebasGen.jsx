// PruebasGen.jsx
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
  Button,
  Stack,
  Chip,
} from "@mui/material";

// Icons (kept close to your style)
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import PregnantWomanRounded from "@mui/icons-material/PregnantWomanRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import Circle from "@mui/icons-material/Circle";

// Shared card style (mirrors your PulpaDeLeche.jsx)
const CARD_SX = {
  bgcolor: "#fff",
  color: "#05080d",
  borderRadius: 3,
  border: "1px solid #d2d2d2",
  boxShadow: "0 0 0 1px rgba(0,0,0,0.04) inset",
  transition: "transform .2s ease, box-shadow .2s ease",
  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 40px rgba(0,0,0,0.55)" },
};

// Reusable header and bullets (same pattern as your component)
function SectionHeader({ icon, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: "#5b5868" }}>
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

// Small helper for download buttons
function DownloadButton({ href, label = "Descargar PDF" }) {
  if (!href) return null;
  return (
    <Button
      component="a"
      href={href}
      download
      variant="contained"
      size="small"
      startIcon={<DownloadRounded />}
      sx={{
        bgcolor: "#5b5868",
        "&:hover": { bgcolor: "#686576ff" },
        borderRadius: 999,
        textTransform: "none",
        fontWeight: 500,
      }}
    >
      {label}
    </Button>
  );
}

/**
 * PruebasGen.jsx
 * Props:
 *  - pdfs: {
 *      myGenomeBrochure?: string,
 *      myCancerRisk?: string,
 *      myHealthScore?: string,
 *      myPrenatal?: string,
 *      sampleReport?: string,
 *    }
 *
 * Default expects files under `/public/docs/...` in your Vite/React app.
 * You can pass full URLs from a CDN/Directus if you prefer.
 */
export default function PruebasGen({
  pdfs = {
    myGenomeBrochure: "/docs/Medical Brochure myGenome ES.pdf",
    myCancerRisk: "/docs/MedicalBrochure_myCancerRisk_SP_8 11 22_online.pdf",
    myHealthScore: "/docs/MedicalBrochure_myHealthScore_SP_10 11 22_online.pdf",
    myPrenatal: "/docs/Medical Brochure_myPrenatal_StemCare2025.pdf",
    sampleReport: "/docs/Sample Report_myGenome_SP_14 03 24.pdf",
  },
}) {
  return (
    <Box sx={{ bgcolor: "#ffff", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h4" sx={{ color: "#05080d", fontWeight: 800, mb: { xs: 3, md: 5 } }}>
          Pruebas Genéticas – Veritas × Stem Care
        </Typography>

        {/* Partnership Overview */}
        <Card sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<VerifiedRounded sx={{ color: "#5b5868" }} />}
              text="Alianza Veritas – Stem Care"
            />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              <strong>Stem Care</strong> (banco privado de células madre de cordón umbilical en Guatemala) y{" "}
              <strong>Veritas Intercontinental</strong> (líderes en genómica clínica) unen fuerzas para ofrecer
              un ecosistema único: <em>preservación biológica</em> (células madre) + <em>prevención genética</em>
              (pruebas avanzadas) para familias en Guatemala y Centroamérica.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Prevención" size="small" />
              <Chip label="Medicina Personalizada" size="small" />
              <Chip label="Consejo Genético" size="small" />
              <Chip label="Biobanco" size="small" />
            </Stack>
          </CardContent>
        </Card>

        {/* myGenome */}
        <Card sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<ScienceRounded sx={{ color: "#5b5868" }} />} text="myGenome (WGS 30x)" />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              <strong>Secuenciación del genoma completo (30x)</strong> con interpretación clínica:
              más de <strong>650 enfermedades accionables</strong>, <strong>225</strong> recesivas (cribado
              reproductivo), <strong>150+</strong> fármacos (farmacogenómica) y <strong>50+</strong> rasgos
              (nutrición, deporte, longevidad, ascendencia), con <strong>asesoría genética</strong>.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <SectionHeader icon={<InsightsRounded sx={{ color: "#5b5868" }} />} text="¿Para qué sirve?" />
                <Bullets
                  items={[
                    "Prevención y seguimiento personalizado a lo largo de la vida.",
                    "Decisiones informadas sobre estilo de vida y chequeos clínicos.",
                    "Optimización de tratamientos (farmacogenómica).",
                  ]}
                />
                <Typography variant="body2" sx={{ opacity: 0.95, mt: 1 }}>
                  <em>Relación con células madre:</em> conocer riesgos a tiempo permite planificar cuidados y estar
                  preparado para terapias celulares/regenerativas futuras con muestras ya preservadas.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={1.5} alignItems={{ xs: "stretch", md: "flex-start" }}>
                  <DownloadButton href={pdfs.myGenomeBrochure} label="Descargar folleto myGenome" />
                  <DownloadButton href={pdfs.sampleReport} label="Descargar informe de ejemplo" />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* myCancerRisk */}
        <Card sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<BiotechRounded sx={{ color: "#5b5868" }} />} text="myCancerRisk (WES 40 genes)" />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              <strong>Exoma completo</strong> con cobertura optimizada para <strong>40 genes</strong> de cáncer
              hereditario (BRCA1/2, MLH1, MSH2, etc.), detectando hasta un <strong>50% más</strong> de personas en
              riesgo que paneles dirigidos.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <SectionHeader icon={<InsightsRounded sx={{ color: "#5b5868" }} />} text="¿Para quién?" />
                <Bullets
                  items={[
                    "Personas con cáncer o con familiares (1er grado) < 50 años.",
                    "Historial familiar sugestivo de componente hereditario.",
                    "Quienes desean conocer su riesgo para ajustar su seguimiento.",
                  ]}
                />
                <Typography variant="body2" sx={{ opacity: 0.95, mt: 1 }}>
                  <em>Relación con células madre:</em> complementar la prevención oncológica con material biológico
                  preservado que pueda ser útil en terapias/regeneración tras tratamientos.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={1.5} alignItems={{ xs: "stretch", md: "flex-end" }}>
                  <DownloadButton href={pdfs.myCancerRisk} label="Descargar folleto myCancerRisk" />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* myHealthScore */}
        <Card sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<LocalHospitalRounded sx={{ color: "#5b5868" }} />} text="myHealthScore (Riesgo Poligénico)" />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Puntuaciones poligénicas con millones de variantes para <strong>cardiovascular</strong> (EAC, FA,
              HTA, lípidos), <strong>diabetes tipo 2</strong> y <strong>cáncer</strong> (mama, próstata). Detecta
              riesgo “oculto” que no se ve con factores clínicos clásicos.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <SectionHeader icon={<InsightsRounded sx={{ color: "#5b5868" }} />} text="Beneficios" />
                <Bullets
                  items={[
                    "Iniciar prevención años antes de la aparición de factores clínicos.",
                    "Mejorar calculadoras de riesgo al agregar genética.",
                    "Segmentar chequeos y hábitos según riesgo acumulado.",
                  ]}
                />
                <Typography variant="body2" sx={{ opacity: 0.95, mt: 1 }}>
                  <em>Relación con células madre:</em> si a futuro aparece enfermedad cardiovascular/metabólica,
                  contar con células preservadas abre puertas a opciones regenerativas emergentes.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Stack spacing={1.5} alignItems={{ xs: "stretch", md: "flex-end" }}>
                  <DownloadButton href={pdfs.myHealthScore} label="Descargar folleto myHealthScore" />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* myPrenatal */}
        <Card sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<PregnantWomanRounded sx={{ color: "#5b5868" }} />} text="myPrenatal (NIPT GenomeScreen)" />
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              <strong>NIPT</strong> de alta precisión: <strong>trisomías 13/18/21</strong>, aneuploidías de{" "}
              <strong>X/Y</strong> y opción <strong>GenomeScreen</strong> con CNVs &gt; 7 Mb en todos los cromosomas.
              Resultados en ~<strong>5 días</strong>; disponible para embarazo único y gemelar.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <SectionHeader icon={<InsightsRounded sx={{ color: "#5b5868" }} />} text="¿Por qué con Stem Care?" />
                <Bullets
                  items={[
                    "Planificación del parto con visión genética temprana.",
                    "Sinergia natural: NIPT + criopreservación del cordón al nacer.",
                    "Doble capa de prevención para el recién nacido.",
                  ]}
                />

                <Grid item xs={12} md={5}>
                    <Stack spacing={1.5} alignItems={{ xs: "stretch", md: "flex-start" }}>
                    <DownloadButton href={pdfs.myPrenatal} label="Descargar folleto myPrenatal" />
                    </Stack>
                </Grid>
              </Grid>
              
            </Grid>
          </CardContent>
        </Card>

        {/* Benefits & Stem Cells Relationship */}
        <Card sx={{ ...CARD_SX }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader icon={<VerifiedRounded sx={{ color: "#5b5868" }} />} text="Beneficios y relación con terapia celular" />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Bullets
                  items={[
                    "Estrategia familiar integral: Embarazo (NIPT) → Nacimiento (cordón) → Adultez (genómica).",
                    "Prevención proactiva: riesgos visibles antes de síntomas.",
                    "‘Seguro biológico’: células listas para potenciales terapias futuras.",
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Bullets
                  items={[
                    "Personalización de chequeos y tratamientos con farmacogenómica.",
                    "Acceso ágil a ensayos y terapias emergentes con datos genéticos + muestras preservadas.",
                    "Liderazgo regional en medicina preventiva y regenerativa.",
                  ]}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
