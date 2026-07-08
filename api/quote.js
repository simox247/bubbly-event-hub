import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, eventDate, venue, guestCount, services, notes } = req.body;

  if (!name || !email || !phone || !eventDate || !venue || !guestCount || !services?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  const serviceLabels = {
    mocktails: 'Mocktails',
    juices: 'Fresh Juices',
    coffee: 'Specialty Coffee',
    infused: 'Infused Water',
    glassware: 'Ice & Glassware',
    staff: 'Professional Staff',
  };

  const serviceList = services
    .map(s => serviceLabels[s] || s)
    .join(', ');

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffaf0; border-radius: 16px; overflow: hidden; border: 1px solid #e8d5a0;">
      <div style="background: linear-gradient(135deg, #B8860B, #D4A017); padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">New Quote Request</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Dr Beverage Website</p>
      </div>
      <div style="padding: 32px 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b; width: 140px;">Name</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">Email</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">Phone</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">Event Date</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${eventDate}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">Venue / Area</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${venue}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">Guest Count</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${guestCount}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">Services</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${serviceList}</td>
          </tr>
          ${notes ? `
          <tr>
            <td style="padding: 12px 8px; font-weight: 600; color: #5a3e1b;">Notes / Budget</td>
            <td style="padding: 12px 8px; color: #2c1a00;">${notes}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      <div style="background: #f5edd8; padding: 16px; text-align: center; font-size: 12px; color: #8a7055;">
        Submitted from dr-beverage.online quote form
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Dr Beverage" <${process.env.ZOHO_EMAIL}>`,
      to: 'info@dr-beverage.online',
      replyTo: email,
      subject: `New Quote Request: ${name} — ${guestCount} guests`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
