
import React from "react";
import "./Planes.css";

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
import {
  MonetizationOn,
  FiberManualRecord,
  Description as DescriptionIcon,
  CheckCircle,
  CreditCard,
  AccountBalance,
  Payments,
  AttachMoney,
  ArrowForward,
} from "@mui/icons-material";

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

function SectionHeader({ icon, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      {icon}
      <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.2, color:"primary.main" }}>
        {text}
      </Typography>
    </Box>
  );
}

function ProcesoPrevio() {
  return (
    <section className="info-card">
      <h3 className="info-card__title">
        Pasos para contratar
      </h3>

      <h4>
        Proceso administrativo previo al Nacimiento:
      </h4>

      {/* Keep your original numbering (1,2,3,5,6,7) */}
      <ol className="info-card__list">
        <li value={1}>
          Debes de llenar el <strong>Formulario de Inscripción al Programa Stem Care</strong> y el
          <strong> Formulario de Forma de Pagos</strong> y entregar a Stem Care al correo
          <strong> ventas3@stem-care.com</strong>. Adjuntar una copia de DPI o Pasaporte tanto de la madre como del padre
          (pueden enviar la imagen escaneada por correo o al Whatsapp <strong>5702-9736</strong>).
        </li>

        <li value={2}>
          Stem Care al recibir los formularios, primero, hace el ingreso a <strong>Recolección en Espera</strong>, segundo,
          prepara el contrato. <strong>Hacemos entrega del Kit de Recolección junto con el contrato.</strong> Si se encuentran en
          el interior del país, hacemos la entrega a la dirección que nos indiquen por medio de Cargo Expreso.
        </li>

        <li value={3}>
          Debes realizar el <strong>pago previo al nacimiento del bebé</strong>.
        </li>

        <li value={5}>
          La madre debe entregar los resultados del <strong>Panel de Infecciosas</strong> a Stem Care en las semanas próximas al parto.
        </li>

        <li value={6}>
          Debes avisar a tu Obstetra sobre la contratación para coordinar la <strong>toma de muestra</strong> y debes mantener
          al tanto a Stem Care sobre la <strong>fecha probable de parto o cesárea</strong>.
        </li>

        <li value={7}>
          Tres semanas después del nacimiento Stem Care les entregará una <strong>copia del Contrato legalizado</strong> y el
          <strong> Informe de Resultados</strong> de la muestra almacenada.
        </li>
      </ol>
    </section>
  );
}



const PLANS = [
  {
    id: "stemcare",
    title: "Programa Stem Care",
    precios: [
      { label: "PRECIO CAPITAL", value: "Q 22,000.00" },
      { label: "PRECIO CAPITAL", value: "Q 23,000.00" },
      { label: "PRECIO EL SALVADOR", value: "$ 3,100.00" },
    ],
    descripcion:
      "Incluye los costos de administración, inducción, apertura de cuenta, entrega del kit de recolección. Comprende también el transporte de la sangre desde el centro hospitalario hasta nuestro laboratorio, proceso de crío preservación, informe de resultados, legalización de contrato y 18 años de almacenamiento.",
  },
  {
    id: "newborn",
    title: "myNewborn",
    precios: [
      { label: "PRECIO CAPITAL", value: "Q 8,000.00" },
      { label: "PRECIO INTERIOR", value: "Q 9,000.00" },
      { label: "PRECIO EL SALVADOR", value: "$ 1,300.00" },
    ],
    descripcion:
      "Prueba de análisis de 400 genes relacionados a 390 enfermedades metabólicas y genéticas de aparición en los primeros años de vida. Incluye kit de recolección, muestra de saliva, informe y asesoría con genetista.",
    // incluye: ["Kit de recolección", "Muestra de saliva", "Informe de Resultados", "Asesoría con Genetista"],
  },
  {
    id: "prenatal",
    title: "myPrenatal",
    precios: [
      { label: "PRECIO CAPITAL", value: "Q 7,000.00" },
      { label: "PRECIO INTERIOR", value: "Q 8,000.00" },
      { label: "PRECIO EL SALVADOR", value: "$ 1,125.00" },
    ],
    descripcion:
      "Prueba no invasiva de cribado prenatal que estudia las anomalías cromosómicas más frecuentes (trisomías 21, 18 y 13).",
  },
  {
    id: "healthscore",
    title: "myHealthScore",
    precios: [
      { label: "PRECIO CAPITAL", value: "Q 8,500.00" },
      { label: "PRECIO INTERIOR", value: "Q 9,500.00" },
      { label: "PRECIO EL SALVADOR", value: "$ 1,300.00" },
    ],
    descripcion:
      "Prueba genética de cribado que permite conocer el riesgo de presentar enfermedad cardiovascular, diabetes tipo 2, cáncer de mama y cáncer de próstata.",
  },
];

function PlanCard({ plan }) {
  return (
    <article className="plan-card">
      {/* Title */}
      <h3 className="plan-card__title">{plan.title}</h3>

      {/* Precios header + list */}
      <div className="plan-card__section">
        <ArrowForward className="icon icon-accent" sx={{ color:"primary.main"}} />
        <span className="plan-card__section-title">Precios</span>
      </div>
      <ul className="plan-card__prices with-icons">
        {plan.precios.map((p, i) => (
          <li key={i}>
            {/* <FiberManualRecord className="icon sm" /> */}
            <span>
              <strong>- {p.label}:</strong> {p.value}
            </span>
          </li>
        ))}
      </ul>

      {/* Descripción */}
      {plan.descripcion && (
        <>
          <div className="plan-card__section">
            {/* <DescriptionIcon className="icon icon-accent" /> */}
            <span className="plan-card__section-title">Descripción</span>
          </div>
          {/* <p className="plan-card__desc">{plan.descripcion}</p> */}
          <p className="plan-card__desc-box">{plan.descripcion}</p>

        </>
      )}

      {/* Incluye (only if provided) */}
      {Array.isArray(plan.incluye) && plan.incluye.length > 0 && (
        <>
          <div className="plan-card__section">
            <CheckCircle className="icon icon-success" />
            <span className="plan-card__section-title">Incluye</span>
          </div>
          <ul className="plan-card__list with-icons">
            {plan.incluye.map((it, i) => (
              <li key={i}>
                <CheckCircle className="icon sm icon-success" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

function PaymentCard() {
  return (
    



    <article className="plan-card">

      <h3 className="plan-card__title">Formas de Pago</h3>

      <ul className="plan-card__list with-icons">
        <li>
          <AttachMoney className="icon sm" />
          <span>Cheques de Bancos locales (Q y $)</span>
        </li>
        <li>
          <AccountBalance className="icon sm" />
          <span>Transferencias a Banco Industrial, BAC, Banrural</span>
        </li>
        <li>
          <CreditCard className="icon sm" />
          <span>Tarjetas Visa, Credomatic, MasterCard (7% recargo)</span>
        </li>
        <li>
          <Payments className="icon sm" />
          <span>Visa Cuotas 3, 6, 10, 12 y 18 (recargo según cuotas)</span>
        </li>
      </ul>
    </article>
  );
}

export default function Planes() {
  return (
    
    <Box sx={{ background:"#fff"}}>
      <main className="planes">
        {/* <h1 className="planes__title">Planes y Programas</h1> */}
        <ProcesoPrevio />     
        <SectionHeader
              icon={<ShoppingCartCheckoutIcon sx={{ color: "primary.main" }} />}
              text="Planes de Pago"
            />

        {/* Row 1 */}
        <section className="cards-row two-cols">
          <PlanCard plan={PLANS[0]} />
          <PlanCard plan={PLANS[1]} />
        </section>

        {/* Row 2 */}
        <section className="cards-row three-cols">
          <PlanCard plan={PLANS[2]} />
          <PlanCard plan={PLANS[3]} />
          <PaymentCard />
        </section>
      </main>
    </Box>
  );
}
