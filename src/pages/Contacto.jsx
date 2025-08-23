import React from "react";
import {
  Box, Container, Card, CardContent, Typography, Grid,
  TextField, MenuItem, InputAdornment, Button, Snackbar, Alert, Stack
} from "@mui/material";
import PersonRounded from "@mui/icons-material/PersonRounded";
import BadgeRounded from "@mui/icons-material/BadgeRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import CalendarViewWeekRounded from "@mui/icons-material/CalendarViewWeekRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import ContactsRounded from "@mui/icons-material/ContactsRounded";
import LocationCityRounded from "@mui/icons-material/LocationCityRounded";
import ChatRounded from "@mui/icons-material/ChatRounded";

const CARD_SX = {
  bgcolor: "#fff",
  color: "#05080d",
  borderRadius: 3,
  border: "1px solid #d2d2d2",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset",
};

// Softer grey filled fields
const TF_SX = {
  // label
  "& .MuiInputLabel-root": { color: "rgba(17,24,39,.65)" },              // grey-700 @ rest
  "& .MuiInputLabel-root.Mui-focused": { color: "rgb(37,99,235)" },      // primary on focus

  // filled input background + states
  "& .MuiFilledInput-root": {
    color: "#111827",                                                    // text grey-900
    backgroundColor: "#f1f5f9",                                          // field bg grey 100/200
    borderRadius: 2,
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
    transition: "background-color .2s, box-shadow .2s",
    "&:hover": { backgroundColor: "#eef2f7" },                           // hover a bit darker
    "&.Mui-focused": {
      backgroundColor: "#e9edf4",
      boxShadow: "inset 0 0 0 2px rgba(37,99,235,.6)",                   // subtle focus ring
    },
    // hide the default underlines for filled variant
    "&:before, &:after": { borderBottom: "0 !important" },
  },

  // placeholder + helper text
  "& .MuiInputBase-input::placeholder": { color: "rgba(17,24,39,.55)", opacity: 1 },
  "& .MuiFormHelperText-root": { color: "rgba(17,24,39,.6)" },
};



const weeks = Array.from({ length: 42 }, (_, i) => i + 1);

export default function Contacto() {
  const [values, setValues] = React.useState({
    nombre: "", apellidos: "", email: "", telefono: "",
    semana: "", ginecologo: "", telefonosContacto: "",
    hospital: "", mensaje: "",
  });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const onChange = (e) => setValues(v => ({ ...v, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!values.nombre.trim()) e.nombre = "Requerido";
    if (!values.apellidos.trim()) e.apellidos = "Requerido";
    if (!values.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email)) e.email = "E-mail inválido";
    if (!values.telefono.trim()) e.telefono = "Requerido";
    else if (values.telefono.replace(/\D/g, "").length < 8) e.telefono = "Mínimo 8 dígitos";
    if (values.semana && (+values.semana < 1 || +values.semana > 42)) e.semana = "1 a 42";
    if (!values.mensaje.trim()) e.mensaje = "Cuéntanos en qué podemos ayudarte";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    // TODO: send to backend
    setSent(true);
    setValues({
      nombre: "", apellidos: "", email: "", telefono: "",
      semana: "", ginecologo: "", telefonosContacto: "",
      hospital: "", mensaje: "",
    });
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h4" sx={{ color: "#05080d", fontWeight: 800, mb: { xs: 3, md: 5 } }}>
          Comunícate con Nosotros
        </Typography>

        <Card sx={CARD_SX}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>


            <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                    {/* Section: Datos de contacto */}
                    <Typography variant="overline" sx={{ color: "rgba(36, 36, 38, 0.75)", letterSpacing: 1 }}>
                    Datos de contacto
                    </Typography>

                    <Grid container rowSpacing={2.5} columnSpacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Nombre" name="nombre"
                        value={values.nombre} onChange={onChange}
                        error={!!errors.nombre} helperText={errors.nombre}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <PersonRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Apellidos" name="apellidos"
                        value={values.apellidos} onChange={onChange}
                        error={!!errors.apellidos} helperText={errors.apellidos}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <BadgeRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" type="email" label="E-mail" name="email"
                        value={values.email} onChange={onChange}
                        error={!!errors.email} helperText={errors.email}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <EmailRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Teléfono" name="telefono"
                        value={values.telefono} onChange={onChange}
                        error={!!errors.telefono}
                        helperText={errors.telefono || "Sólo números o +; ej. +502 5555 5555"}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <PhoneIphoneRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    </Grid>

                    {/* Section: Información médica */}
                    <Typography variant="overline" sx={{ color: "rgba(36, 36, 38, 0.75)", letterSpacing: 1 }}>
                        Información médica
                    </Typography>

                    <Grid container rowSpacing={2.5} columnSpacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Semana de Embarazo" name="semana"
                        value={values.semana} onChange={onChange}
                        error={!!errors.semana} helperText={errors.semana || "Opcional"}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <CalendarViewWeekRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                         />
                        {/* <MenuItem value="">—</MenuItem>
                        {weeks.map((w) => (
                            <MenuItem key={w} value={w}>Semana {w}</MenuItem>
                        ))} */}
                        {/* </TextField> */}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Nombre de Ginecólogo" name="ginecologo"
                        value={values.ginecologo} onChange={onChange}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <LocalHospitalRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Teléfonos de Contacto" name="telefonosContacto"
                        value={values.telefonosContacto} onChange={onChange}
                        helperText="Opcional — separa con comas si son varios"
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <ContactsRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth variant="filled" label="Hospital en donde se Atenderá" name="hospital"
                        value={values.hospital} onChange={onChange}
                        sx={TF_SX}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                                <LocationCityRounded sx={{ color: "#5b5868" }} />
                            </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    </Grid>

                    {/* Mensaje */}
                    <Typography variant="overline" sx={{ color: "rgba(36, 36, 38, 0.75)", letterSpacing: 1 }}>
                    Mensaje
                    </Typography>

                    <TextField
                    fullWidth variant="filled" multiline minRows={4} label="Mensaje" name="mensaje"
                    value={values.mensaje} onChange={onChange}
                    error={!!errors.mensaje} helperText={errors.mensaje}
                    sx={TF_SX}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start" sx={{ display: { xs: "inline-flex", md: "none" } }}>
                            <ChatRounded sx={{ color: "#5b5868", alignSelf: "flex-start", mt: 1 }} />
                        </InputAdornment>
                        ),
                    }}
                    />

                    <Box sx={{ textAlign: { xs: "center", sm: "right" } }}>
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 1, fontWeight: 700, px: 4 }}>
                        ENVIAR
                    </Button>
                    </Box>
                </Stack>
            </form>

            




          </CardContent>
        </Card>

        <Snackbar
          open={sent} autoHideDuration={4000} onClose={() => setSent(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setSent(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
            ¡Gracias! Recibimos tu mensaje. Te contactaremos pronto.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
