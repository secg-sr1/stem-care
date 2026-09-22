import GenomeHeading from './GenomeHeading.jsx';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

const stemPrices = {
  capital: { label: 'Capital', currency: 'Q', processing: 17430, annual: 820, total: 18250, prepaid: 25000 },
  salvador: { label: 'El Salvador', currency: '$', processing: 2370, annual: 130, total: 2500, prepaid: 3400 },
};
const description = 'Comprende los costos de administración, inducción, apertura de cuenta, kit de recolección. Comprende también el transporte de la sangre desde el centro hospitalario hasta nuestro laboratorio, proceso de crío preservación, certificación de condición de las células madre y legalización de contrato.';
export default function StemPricing() {
  const [location, setLocation] = useState('capital');
  const plan = stemPrices[location];
  const money = value => `${plan.currency} ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return <section className="stem-pricing" aria-labelledby="stem-pricing-title">
    <GenomeHeading as="h2" id="stem-pricing-title">Programa Stem Care</GenomeHeading>
    <Tabs value={location} onChange={(_, value) => setLocation(value)} aria-label="Ubicación del plan">
      {Object.entries(stemPrices).map(([key, item]) => <Tab key={key} value={key} label={item.label} id={`prices-tab-${key}`} aria-controls="stem-pricing-panel" />)}
    </Tabs>
    <div id="stem-pricing-panel" role="tabpanel" aria-labelledby={`prices-tab-${location}`} className="cards-row two-cols">
      <article className="plan-card"><GenomeHeading as="h3" className="plan-card__title">Plan Básico</GenomeHeading>
        <div className="price-detail"><span>Cuota única de procesamiento</span><strong>{money(plan.processing)}</strong></div>
        <p className="plan-card__desc-box">{description}</p>
        <div className="price-detail"><span>Cuota de almacenamiento anual</span><strong>{money(plan.annual)}</strong></div>
        <p className="plan-card__desc-box">Comprende la preservación y almacenamiento de la sangre de cordón umbilical (Pago se realiza en el mes de nacimiento del bebé).</p>
        <div className="price-detail price-total"><span>Total</span><strong>{money(plan.total)}</strong></div>
      </article>
      <article className="plan-card"><GenomeHeading as="h3" className="plan-card__title">Plan 18.0</GenomeHeading>
        <div className="price-detail"><span>Cuota única</span><strong>{money(plan.prepaid)}</strong></div>
        <p className="plan-card__desc-box">{description}</p>
        <p className="plan-card__desc-box">Incluye pago anticipado de 18 años de almacenamiento de células madre de sangre de cordón umbilical.</p>
      </article>
    </div>
  </section>;
}
