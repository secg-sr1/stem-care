import React from "react";
// import { Box, Container, Typography, Grid, Stack, Link as MLink } from "@mui/material";
import { Stack, Container, Box, Typography, Divider, Link as MLink } from "@mui/material";


export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#0a0f19", color: "#e9eef8", py: 6, mt: 8 }}>
      <Container maxWidth="lg">
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
            {/* 1) Correo */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                Contáctanos a los números
                </Typography>
                {["+502 5702-9736", "+502 4512-4809", "+502 2508-2963", "+502 4511-4751"].map((num) => (
                <Typography key={num}>
                    <MLink href={`tel:${num.replace(/\s|\+/g, "")}`} color="inherit" underline="hover">
                    {num}
                    </MLink>
                </Typography>
                ))}
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

            {/* 3) Números */}
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
              El Laboratorio de Stem Care cuenta con Registro Sanitario y autorización para
              operar del Ministerio de Salud Pública de Guatemala, así como del Colegio de
              Químicos Farmacéuticos y la certificación de protocolos de la FDA (Food and
              Drug Administration de los Estados Unidos de América), dicha certificación es
              autorizada año con año para mantenernos actualizados.
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
