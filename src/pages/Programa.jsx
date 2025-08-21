// src/pages/Programa.jsx
import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
} from "@mui/material";

// Icons
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import EventAvailableRounded from "@mui/icons-material/EventAvailableRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";

// Shared card style (same vibe as Planes)
const CARD_SX = {
  bgcolor: "#0b0f14",
  color: "#fff",
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
      <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
        {text}
      </Typography>
    </Box>
  );
}

export default function Programa() {
  return (
    <Box sx={{ bgcolor: "#05080d", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: 800, mb: { xs: 3, md: 5 }, letterSpacing: 0.2 }}
        >
          Programa Stem Care
        </Typography>

        {/* NEW: ¿Por qué almacenar…? */}
        <Card id="por-que-almacenar" sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<FavoriteRounded sx={{ color: "primary.main" }} />}
              text="¿Por qué almacenar sangre del cordón de mi bebé?"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              La respuesta a esta pregunta es inmediata: <strong>Porque yo amo a mi bebé</strong>,
              por eso decido guardar localmente las células madre de cordón umbilical de mi bebé.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              En Stem Care hemos visto por más de una década la evolución del campo del
              almacenamiento de células madre de cordón umbilical. Entre los cambios más
              significativos están las posturas del <em>American College of Obstetricians &amp;
              Gynecologists</em> y el <em>American College of Pediatricians</em>, que recomiendan
              considerar el almacenamiento en bancos privados cuando existe <strong>riesgo de
              enfermedades genéticas</strong> en la familia. Dada la alta carga de enfermedad
              asociada a condiciones genéticas (cáncer, corazón, sistema nervioso, etc.),
              cada vez más familias en Guatemala y El Salvador muestran interés en conservar
              estas células.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Las células madre de cordón umbilical tienen la capacidad de regenerar
              tejidos sanguíneos y no sanguíneos. La literatura científica las describe como
              <em> células “inteligentes”</em> que, al implantarse, buscan el tejido dañado para
              regenerarlo y mejorar la calidad de vida del paciente, incluso llevarlo a una
              curación completa. A la fecha se han reportado <strong>más de 100 enfermedades
              tratables</strong> y se estima que se han realizado <strong>más de 40,000
              terapias</strong> en distintos países, incluyendo Guatemala, usando células madre
              de cordón umbilical.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Un aspecto menos visible pero muy relevante: algunas aseguradoras en Guatemala y
              El Salvador incluyen en sus pólizas el <strong>almacenamiento de células madre de
              cordón umbilical</strong>. Desde nuestra perspectiva, este servicio ha
              evolucionado a convertirse en un <strong>seguro biológico</strong> para las
              familias que lo contratan en bancos privados.
            </Typography>
          </CardContent>
        </Card>

        {/* ¿En qué consiste? */}
        <Card id="que-es" sx={{ ...CARD_SX, mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<InfoOutlined sx={{ color: "primary.main" }} />}
              text="¿En qué consiste el Programa Stem Care?"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              El Programa Stem Care de almacenamiento de células madre de sangre de cordón
              umbilical es un servicio que contratan las familias que están próximos a tener
              un bebé.
            </Typography>

            <Divider sx={{ my: 2, opacity: 0.12 }} />

            <SectionHeader
              icon={<LocalHospitalRounded sx={{ color: "primary.main" }} />}
              text="Entrega del kit y recolección"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 1.5 }}>
              Al contratar el Programa Stem Care les hacemos entrega del <strong>kit de
              recolección</strong> a los futuros padres; este kit debe llevarse al hospital el
              día del parto.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              La recolección se realiza en los <strong>primeros minutos posteriores al
              nacimiento</strong>. Este proceso lo realiza el ginecólogo o bien uno de los
              médicos de Stem Care, coordinado con anticipación al nacimiento.
            </Typography>

            <Divider sx={{ my: 2, opacity: 0.12 }} />

            <SectionHeader
              icon={<ScienceRounded sx={{ color: "primary.main" }} />}
              text="Procesamiento y almacenamiento"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Nuestro personal autorizado traslada la muestra de sangre de cordón al
              laboratorio, donde es <strong>procesada y almacenada en cinco crío viales
              individuales</strong>, para tener disponibilidad inmediata de las células madre
              cuando sea necesario en tratamientos de enfermedades crónicas y no crónicas.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Por ser un material biológico muy especial, se estima que las células madre de
              sangre de cordón umbilical podrán permanecer guardadas en <strong>crío
              preservación durante 200 años</strong>.
            </Typography>
          </CardContent>
        </Card>

        {/* ¿Qué pasa a los 18 años? */}
        <Card id="contrato-18" sx={{ ...CARD_SX }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<EventAvailableRounded sx={{ color: "primary.main" }} />}
              text="¿Qué pasa al cumplirse los 18 años?"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              El contrato es por <strong>18 años</strong>. La madre y el padre tendrán la
              potestad de la muestra hasta que su hijo(a) cumpla la mayoría de edad.
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Si las células no han sido usadas en su totalidad, el contrato se <strong>renueva por
              10 años más</strong>. Las células madre pueden ser utilizadas en cualquier etapa de la vida.
            </Typography>

            <Divider sx={{ my: 2, opacity: 0.12 }} />

            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Te invitamos a visitar{" "}
              <Link
                href="https://www.yoamoamibebe.com"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="primary.light"
              >
                www.yoamoamibebe.com
              </Link>{" "}
              para más información sobre células madre de cordón y su aplicación en
              enfermedades.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
