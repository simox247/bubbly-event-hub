import { useEffect, useRef, useState } from 'react';
import './Apply.css';

interface FormData {
  name: string;
  company: string;
  phone: string;
  role: string;
  experience: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  phone?: string;
  role?: string;
}

export default function Apply() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    role: '',
    experience: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!canvasRef.current) return;
    const count = 18;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'bubble';
      const size = 6 + Math.random() * 20;
      b.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        --dur:${8 + Math.random() * 12}s;
        --delay:${-Math.random() * 15}s;
      `;
      canvasRef.current.appendChild(b);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!form.company.trim()) newErrors.company = 'اسم الشركة مطلوب';
    if (!form.phone.trim()) {
      newErrors.phone = 'رقم التليفون مطلوب';
    } else if (!/^[\d\s+()-]{10,20}$/.test(form.phone.trim())) {
      newErrors.phone = 'رقم تليفون غير صحيح';
    }
    if (!form.role.trim()) newErrors.role = 'الوظيفة مطلوبة';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          role: form.role,
          experience: form.experience,
        }),
      });

      if (!response.ok) throw new Error('Submit failed');

      setSubmitted(true);
    } catch {
      alert('حصل مشكلة في الإرسال، حاول تاني.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-container">
      {/* Ambient background */}
      <div className="bg-canvas" ref={canvasRef}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Main Card */}
      <div className="apply-card">
        <div className="logo-mark">
          <div className="logo-dot"></div>
          <span className="logo-text">Event Management Group</span>
          <div className="logo-dot"></div>
        </div>

        <div className="apply-heading">
          <h1>انضم لفريقنا</h1>
        </div>
        <p className="apply-subtext">سجّل بياناتك وهنتواصل معاك في أقرب وقت</p>

        <div className="apply-divider">
          <div className="apply-divider-line"></div>
          <svg className="apply-divider-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(184,134,11,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <div className="apply-divider-line"></div>
        </div>

        {!submitted ? (
          <form className="apply-form" onSubmit={handleSubmit} noValidate>
            <div className="apply-field">
              <label className="apply-label" htmlFor="name">الاسم</label>
              <input
                id="name"
                name="name"
                type="text"
                className={`apply-input ${errors.name ? 'error' : ''}`}
                placeholder="الاسم بالكامل"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="apply-error">{errors.name}</span>}
            </div>

            <div className="apply-field">
              <label className="apply-label" htmlFor="company">اسم الشركة الحالية</label>
              <input
                id="company"
                name="company"
                type="text"
                className={`apply-input ${errors.company ? 'error' : ''}`}
                placeholder="الشركة اللي شغال فيها حالياً"
                value={form.company}
                onChange={handleChange}
              />
              {errors.company && <span className="apply-error">{errors.company}</span>}
            </div>

            <div className="apply-field">
              <label className="apply-label" htmlFor="phone">رقم التليفون</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`apply-input ${errors.phone ? 'error' : ''}`}
                placeholder="01xxxxxxxxx"
                value={form.phone}
                onChange={handleChange}
                style={{ direction: 'ltr', textAlign: 'right' }}
              />
              {errors.phone && <span className="apply-error">{errors.phone}</span>}
            </div>

            <div className="apply-field">
              <label className="apply-label" htmlFor="role">الوظيفة</label>
              <input
                id="role"
                name="role"
                type="text"
                className={`apply-input ${errors.role ? 'error' : ''}`}
                placeholder="مسمّاك الوظيفي"
                value={form.role}
                onChange={handleChange}
              />
              {errors.role && <span className="apply-error">{errors.role}</span>}
            </div>

            <div className="apply-field">
              <label className="apply-label" htmlFor="experience">
                نبذة عن خبراتك السابقة في مجال التنظيم
                <span className="optional">(اختياري)</span>
              </label>
              <textarea
                id="experience"
                name="experience"
                className="apply-textarea"
                placeholder="اكتب نبذة مختصرة عن خبرتك..."
                value={form.experience}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="apply-submit" disabled={isSubmitting}>
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </form>
        ) : (
          <div className="apply-success">
            <div className="apply-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2>تم إرسال طلبك بنجاح!</h2>
            <p>شكراً لاهتمامك بالانضمام لفريقنا.<br/>هنتواصل معاك في أقرب وقت.</p>
          </div>
        )}

        <div className="apply-footer">
          <div className="apply-footer-line"></div>
          <p className="apply-footer-text">&copy; 2024 Event Management Group. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
