import { useEffect, useRef } from 'react';
import './SocialLinks.css';

export default function SocialLinks() {
  const canvasRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="social-links-container">
      {/* Ambient background */}
      <div className="bg-canvas" ref={canvasRef}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Main Card */}
      <div className="card">
        <div className="logo-mark">
          <div className="logo-dot"></div>
          <span className="logo-text">Dr-Beverage</span>
          <div className="logo-dot"></div>
        </div>

        <div className="heading-wrap">
          <h1><span>Follow Us</span></h1>
          <p className="subtext">Join our community &amp; stay updated</p>
        </div>

        <div className="divider">
          <div className="divider-line"></div>
          <svg className="divider-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(184,134,11,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9c0-1 .895-2 2-2h8c1.105 0 2 .895 2 2v8c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2V9z"></path>
            <path d="M9 5v2m6-2v2"></path>
            <circle cx="12" cy="15" r="1"></circle>
          </svg>
          <div className="divider-line"></div>
        </div>

        <div className="buttons">
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=61580929321620" target="_blank" rel="noopener noreferrer" className="btn btn-fb" aria-label="Follow us on Facebook">
            <span className="btn-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="#1877F2" stroke="none"/>
              </svg>
            </span>
            <span className="btn-label">Facebook</span>
            <span className="btn-arrow">→</span>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/dr_beverage_eg/" target="_blank" rel="noopener noreferrer" className="btn btn-ig" aria-label="Follow us on Instagram">
            <span className="btn-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C13584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </span>
            <span className="btn-label">Instagram</span>
            <span className="btn-arrow">→</span>
          </a>

          {/* Website */}
          <a href="https://www.dr-beverage.online" target="_blank" rel="noopener noreferrer" className="btn btn-web" aria-label="Visit our website">
            <span className="btn-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </span>
            <span className="btn-label">Website</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>

        <div className="footer">
          <div className="footer-line"></div>
          <p className="footer-text">&copy; 2024 Dr-Beverage. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}