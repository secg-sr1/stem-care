import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      nombre,
      apellidos,
      email,
      telefono,
      semana,
      ginecologo,
      telefonosContacto,
      hospital,
      mensaje,
    } = req.body;

    // Validate required fields
    if (!nombre || !apellidos || !email || !telefono || !mensaje) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #1f2937; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; }
            .field { margin-bottom: 10px; }
            .label { font-weight: 600; color: #4b5563; }
            .value { color: #111827; margin-top: 4px; }
            .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nuevo Mensaje de Contacto - Stem Care</h2>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Datos de Contacto</div>
                <div class="field">
                  <div class="label">Nombre:</div>
                  <div class="value">${nombre} ${apellidos}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Teléfono:</div>
                  <div class="value">${telefono}</div>
                </div>
              </div>

              ${(semana || ginecologo || telefonosContacto || hospital) ? `
              <div class="section">
                <div class="section-title">Información Médica</div>
                ${semana ? `
                <div class="field">
                  <div class="label">Semana de Embarazo:</div>
                  <div class="value">${semana}</div>
                </div>
                ` : ''}
                ${ginecologo ? `
                <div class="field">
                  <div class="label">Nombre de Ginecólogo:</div>
                  <div class="value">${ginecologo}</div>
                </div>
                ` : ''}
                ${telefonosContacto ? `
                <div class="field">
                  <div class="label">Teléfonos de Contacto:</div>
                  <div class="value">${telefonosContacto}</div>
                </div>
                ` : ''}
                ${hospital ? `
                <div class="field">
                  <div class="label">Hospital en donde se Atenderá:</div>
                  <div class="value">${hospital}</div>
                </div>
                ` : ''}
              </div>
              ` : ''}

              <div class="section">
                <div class="section-title">Mensaje</div>
                <div class="value" style="white-space: pre-wrap;">${mensaje}</div>
              </div>
            </div>
            <div class="footer">
              Este mensaje fue enviado desde el formulario de contacto de Stem Care
            </div>
          </div>
        </body>
      </html>
    `;

    // Build plain text version
    const emailText = `
Nuevo Mensaje de Contacto - Stem Care

DATOS DE CONTACTO
Nombre: ${nombre} ${apellidos}
Email: ${email}
Teléfono: ${telefono}

${(semana || ginecologo || telefonosContacto || hospital) ? `
INFORMACIÓN MÉDICA
${semana ? `Semana de Embarazo: ${semana}\n` : ''}${ginecologo ? `Nombre de Ginecólogo: ${ginecologo}\n` : ''}${telefonosContacto ? `Teléfonos de Contacto: ${telefonosContacto}\n` : ''}${hospital ? `Hospital en donde se Atenderá: ${hospital}\n` : ''}
` : ''}
MENSAJE
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de Stem Care
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Stem Care Contacto <onboarding@resend.dev>', // You may want to change this after verifying your domain
      to: process.env.CONTACT_TO || 'contacto@stem-care.com',
      replyTo: email,
      subject: `Nuevo Mensaje de Contacto de ${nombre} ${apellidos}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}

