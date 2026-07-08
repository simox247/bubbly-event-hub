import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, phone, role, experience } = req.body;

  // Validate required fields
  if (!name || !company || !phone || !role) {
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

  const htmlBody = `
    <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fffaf0; border-radius: 16px; overflow: hidden; border: 1px solid #e8d5a0;">
      <div style="background: linear-gradient(135deg, #B8860B, #D4A017); padding: 24px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">طلب انضمام جديد</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Event Management Group</p>
      </div>
      <div style="padding: 32px 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b; width: 140px;">الاسم</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">الشركة الحالية</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">رقم التليفون</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00; direction: ltr; text-align: right;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; font-weight: 600; color: #5a3e1b;">الوظيفة</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #e8d5a0; color: #2c1a00;">${role}</td>
          </tr>
          ${experience ? `
          <tr>
            <td style="padding: 12px 8px; font-weight: 600; color: #5a3e1b;">الخبرات السابقة</td>
            <td style="padding: 12px 8px; color: #2c1a00;">${experience}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      <div style="background: #f5edd8; padding: 16px; text-align: center; font-size: 12px; color: #8a7055;">
        تم الإرسال من نموذج التقديم على الموقع
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Event Management Group" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.NOTIFY_EMAIL || process.env.ZOHO_EMAIL,
      subject: `طلب انضمام جديد: ${name}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
