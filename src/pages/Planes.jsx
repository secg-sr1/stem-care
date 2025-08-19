
import React from "react";
import "./Planes.css";

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
  ArrowForward
} from "@mui/icons-material";





const PLANS = [
  {
    id: "stemcare",
    title: "PROGRAMA STEM CARE",
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
        <ArrowForward className="icon icon-accent" />
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
          <p className="plan-card__desc">{plan.descripcion}</p>
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
    <main className="planes">
      <h1 className="planes__title">Planes y Programas</h1>

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
  );
}
