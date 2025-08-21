// src/pages/PorqueFamilias.jsx
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
} from "@mui/material";

import { CheckCircle } from "@mui/icons-material";
import { ArrowForward } from "@mui/icons-material";
import { FiberManualRecord } from "@mui/icons-material";

// Icons
import StarRounded from "@mui/icons-material/StarRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded";
import FlashOnRounded from "@mui/icons-material/FlashOnRounded";
import SupportAgentRounded from "@mui/icons-material/SupportAgentRounded";
import BiotechRounded from "@mui/icons-material/BiotechRounded";
import VaccinesRounded from "@mui/icons-material/VaccinesRounded";
import GavelRounded from "@mui/icons-material/GavelRounded";
import ScienceRounded from "@mui/icons-material/ScienceRounded";
import DomainVerificationRounded from "@mui/icons-material/DomainVerificationRounded";

// const CARD_SX = {
//   bgcolor: "#0b0f14",
//   color: "#fff",
//   borderRadius: 3,
//   border: "1px solid rgba(255,255,255,0.12)",
//   boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
//   transition: "transform .2s ease, box-shadow .2s ease",
//   "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 40px rgba(0,0,0,0.55)" },
// };


const CARD_SX = {
  bgcolor: "#ffffffff",
  color: "#0b0f14",
  borderRadius: 3,
  border: "1px solid rgba(255, 255, 255, 0.3)",
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

export default function PorqueFamilias() {
  return (
    // <Box sx={{ bgcolor: "#05080d", minHeight: "100vh" }}>
    <Box sx={{ bgcolor: "#ffffffff", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: 800, mb: { xs: 3, md: 5 }, letterSpacing: 0.2 }}
        >
          ¿Por qué las familias eligen a Stem Care?
        </Typography>

        {/* --- Section 1 --- */}
        <Card id="familias-por-que" sx={{ ...CARD_SX, mb: 3, border:1, borderColor:'#d2d2d2' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<ArrowForward sx={{ color: "#05080d" }} />}
              text="¿POR QUÉ LAS FAMILIAS ELIGEN A STEM CARE?"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Stem Care es único en Guatemala y la región: ofrece un programa genuino de
              bienestar y <strong>salud preventiva</strong> y acceso inmediato a profesionales
              médicos altamente calificados para servicios especializados.
            </Typography>

            <Divider sx={{ my: 2, opacity: 0.12 }} />

            {/* 1 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              1. Almacenamiento de células madre de cordón umbilical en el país
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 1.5 }}>
              Somos el único laboratorio que, cuando el médico tratante lo requiere, puede
              ofrecer <strong>personal médico con más de una década de experiencia</strong> en
              recolección. Nuestro equipo está listo <strong>24/7/365</strong>, lo que ha
              permitido almacenar el 100% de las muestras que recibimos.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Además, lideramos la implementación del <strong>clampeo tardío</strong> del cordón
              umbilical y asesoramos a familias y médicos con guías internacionales.
            </Typography>

            {/* 2 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              2. Traslado y procesamiento en las primeras 24 horas
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Stem Care es el <strong>único laboratorio ubicado y autorizado en Guatemala</strong>.
              Sin oficinas intermediarias: independientemente del lugar de recolección en
              Guatemala o El Salvador, <strong>trasladamos la muestra de inmediato</strong> al
              laboratorio, impactando positivamente en la calidad celular.
            </Typography>

            {/* 3 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              3. Disponibilidad inmediata para los clientes
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Nuestra ubicación en Ciudad de Guatemala permite <strong>acceso y
              disponibilidad inmediata</strong> a las células almacenadas, sin costos de
              traslados internacionales.
            </Typography>

            {/* 4 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              4. Asesoría inmediata sobre tratamientos
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Contamos con <strong>Departamento de Investigación y Desarrollo</strong> propio
              desde el cual se coordina la clínica de tratamientos y un equipo
              multidisciplinario para consultas locales e internacionales, con base en la
              evidencia científica y principios éticos. El departamento es dirigido por el
              Dr. Erwin Calgua, ex Director General de Investigación de la Universidad de San
              Carlos de Guatemala (2018), con formación en la Escuela Perelman de Medicina,
              Universidad de Pensilvania (EE. UU.), y experiencia en epidemiología clínica y
              regulación de productos médicos.
            </Typography>

            {/* 5 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              5. Asesoría genética en criopreservación
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Trabajamos una alianza con <strong>Veritas Intercontinental</strong> para acercar
              servicios de genómica que apoyen la toma de decisiones familiares y médicas
              cuando se considera almacenar células madre de cordón umbilical.
            </Typography>

            {/* 6 */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
              6. Acceso a tests genéticos para recién nacidos
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              En colaboración con Veritas Intercontinental, ofrecemos el test
              <strong> myNewborn</strong>, que va más allá del tamizaje neonatal convencional y
              permite identificar predisposiciones genéticas a enfermedades catastróficas
              tratables hoy con células madre de sangre de cordón umbilical.
            </Typography>

            {/* nice pictogram list */}
            <List dense sx={{ mt: 2 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <LocalHospitalRounded sx={{ color: "#05080d" }} />
                </ListItemIcon>
                <ListItemText primary="Equipo médico propio para recolección 24/7" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <LocalShippingRounded sx={{ color: "#05080d" }} />
                </ListItemIcon>
                <ListItemText primary="Traslado inmediato al laboratorio autorizado" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <FlashOnRounded sx={{ color: "#05080d" }} />
                </ListItemIcon>
                <ListItemText primary="Disponibilidad local e inmediata" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <SupportAgentRounded sx={{ color: "#05080d" }} />
                </ListItemIcon>
                <ListItemText primary="Asesoría clínica e investigación" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <BiotechRounded sx={{ color: "#05080d" }} />
                </ListItemIcon>
                <ListItemText primary="Apoyo genómico con Veritas Intercontinental" />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <VaccinesRounded sx={{ color: "#05080d" }} />
                </ListItemIcon>
                <ListItemText primary="Tests genéticos para recién nacidos (myNewborn)" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* --- Section 2 --- */}
        <Card id="autorizaciones" sx={{ ...CARD_SX,  border:1, borderColor:'#d2d2d2' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <SectionHeader
              icon={<ArrowForward sx={{ color: "#05080d" }} />}
              text="¿CON QUÉ AUTORIZACIONES CUENTA STEM CARE PARA OPERAR EL LABORATORIO LOCALMENTE?"
            />

            <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
              Stem Care <strong>no es una oficina intermediaria</strong>. Es el único
              laboratorio que opera bajo autorizaciones locales e internacionales:
            </Typography>

            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <FiberManualRecord sx={{ color: "#05080d", fontSize:'16px' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Registro Sanitario como Laboratorio — Ministerio de Salud Pública (DRACES)"
                />
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <FiberManualRecord sx={{ color: "#05080d", fontSize:'16px' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Registro como Laboratorio en el Colegio de Químicos y Farmacéuticos de Guatemala"
                  secondary="Único laboratorio autorizado para procesar y almacenar células madre de cordón umbilical en Guatemala."
                />
              </ListItem>

              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <FiberManualRecord sx={{ color: "#05080d", fontSize:'16px' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Registro en CBER/FDA (Center for Biologics Evaluation and Research)"
                  secondary="Único laboratorio de células madre de cordón umbilical de Guatemala registrado."
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2, opacity: 0.12 }} />

            <Typography variant="body2" sx={{ opacity: 0.95 }}>
              Para informar adecuadamente a las familias de Guatemala y El Salvador, nuestro
              Departamento de Investigación y Desarrollo pone a disposición personal
              médico-científico calificado que puede explicar las autorizaciones vigentes y
              evitar desinformación sobre acreditaciones no válidas.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
