import React from "react";
import {
  Stack,
  Container,
  Box,
  Typography,
  Link as MLink,
  IconButton,
  Tooltip,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const SOCIALS = [
  {
    label: "WhatsApp",
    href:
      "https://wa.me/50257029736?text=Hola%20Stem%20Care,%20quisiera%20m%C3%A1s%20informaci%C3%B3n",
    Icon: WhatsAppIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Stem-Care-El-Primer-Banco-de-Sangre-de-Cord%C3%B3n-Umbilical-en-Guatemala/100063470394118/?mibextid=LQQJ4d",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yoamoamibebegt/?igsh=eWg2d2EzZDZzcXJv&utm_source=qr#",
    Icon: InstagramIcon,
  },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#0a0f19", color: "#e9eef8", py: 6, mt: 8 }}>
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        {/* Social icons cluster */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            position: { md: "absolute", xs: "static" },
            top: { md: 16 },
            right: { md: 16 },
            justifyContent: { xs: "center", md: "flex-end" },
            mb: { xs: 3, md: 0 },
          }}
        >
          {SOCIALS.map(({ label, href, Icon }) => (
            <Tooltip key={label} title={label} arrow>
              <IconButton
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  width: 44,
                  height: 44,
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.14)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "50%",
                  transition: "transform .2s, background .2s",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.16)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Icon fontSize="medium" />
              </IconButton>
            </Tooltip>
          ))}
        </Stack>

        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={700}>
            Contáctanos
          </Typography>

          {/* ---- TOP ROW (3 columns) ---- */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 6 }}
            useFlexGap
            sx={{ alignItems: "flex-start" }}
          >
            {/* 1) Números */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                Contáctanos a los números
              </Typography>
              {["+502 5702-9736", "+502 4512-4809", "+502 2508-2963", "+502 4511-4751"].map(
                (num) => (
                  <Typography key={num}>
                    <MLink href={`tel:${num.replace(/\s|\+/g, "")}`} color="inherit" underline="hover">
                      {num}
                    </MLink>
                  </Typography>
                )
              )}
            </Box>

            {/* 2) Dirección */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                Dirección
              </Typography>
              <Typography>
                Encuéntranos en 2da calle 21-66 zona 15 <br />
                Edificio Plaza 21 Vista Hermosa II <br />
                3er nivel, oficina 3
              </Typography>
            </Box>

            {/* 3) Correo */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                Correo
              </Typography>
              <MLink href="mailto:contacto@stem-care.com" color="inherit" underline="hover">
                contacto@stem-care.com
              </MLink>
            </Box>
          </Stack>

          {/* ---- CERTIFICATIONS ---- */}
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              ACERCA DE LAS CERTIFICACIONES
            </Typography>
            <Typography>
              El Laboratorio de Stem Care cuenta con Registro Sanitario y autorización para operar del
              Ministerio de Salud Pública de Guatemala, así como del Colegio de Químicos Farmacéuticos
              y la certificación de protocolos de la FDA (Food and Drug Administration de los Estados
              Unidos de América), dicha certificación es autorizada año con año para mantenernos
              actualizados.
            </Typography>
          </Box>

          {/* ---- COPYRIGHT ---- */}
          <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
            © 2025. Stem Care. Reservados todos los Derechos.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
