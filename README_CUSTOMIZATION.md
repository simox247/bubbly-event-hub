# Dr Beverage Website - Customization Guide

This is a one-page beverage catering website built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## 📝 How to Update Contact Information

### Phone Numbers
Search and replace `+20XXXXXXXXXX` (appears in multiple files) with your actual phone number:
- `src/components/Navigation.tsx` (lines with phone/WhatsApp links)
- `src/components/Hero.tsx` (WhatsApp button)
- `src/components/ContactForm.tsx` (WhatsApp submission)
- `src/components/Footer.tsx` (contact section)
- `src/components/WhatsAppButton.tsx` (floating button)

**Format:** Use international format: `+201234567890` (no spaces in the URL)

### Email Address
Replace `info@drbeverage.com` in:
- `src/components/Footer.tsx`

### Facebook Page
Replace `https://www.facebook.com/drbeverage` with your actual page URL in:
- `src/components/Gallery.tsx`
- `src/components/Footer.tsx`

### Canonical URL
Update `https://drbeverage.com` in:
- `index.html` (line 8: canonical tag)
- `index.html` (line 18: Open Graph URL)

## 💰 How to Update Pricing

Open `src/components/Packages.tsx` and update:

```typescript
{
  name: "Essential",
  price: "from EGP 5,000", // Change this
  ...
},
{
  name: "Premium",
  price: "from EGP 8,500", // Change this
  ...
},
```

## 🖼️ How to Change Images

### Hero Background
Replace `src/assets/hero-beverage.jpg` with your own image (recommended: 1920x1080px)

### Gallery Images
Replace files in `src/assets/`:
- `gallery-1.jpg` through `gallery-12.jpg`
- Recommended size: 800x800px
- Keep the same filenames for easy replacement

**Important:** Images are imported as ES6 modules. After replacing, just refresh the page.

## 🎨 How to Customize Colors

Edit `src/index.css` (lines 9-40):

```css
:root {
  /* Change these HSL values */
  --primary: 0 0% 7%;        /* Deep charcoal */
  --accent: 171 73% 45%;     /* Mint/teal */
  --secondary: 40 100% 70%;  /* Citrus yellow */
}
```

Use [HSL Color Picker](https://hslpicker.com/) to find new values.

## 📝 How to Update Content

### Services
Edit `src/components/Services.tsx` - update the `services` array

### Packages Features
Edit `src/components/Packages.tsx` - update the `packages` array

### Testimonials
Edit `src/components/Testimonials.tsx` - update the `testimonials` array

### FAQ
Edit `src/components/FAQ.tsx` - update the `faqs` array

## 🚀 How to Deploy

### Option 1: Lovable (Easiest)
1. Click "Publish" in the Lovable editor
2. Your site will be live at `yoursite.lovable.app`
3. Connect a custom domain in Project Settings

### Option 2: Netlify/Vercel
1. Push code to GitHub
2. Connect repository to Netlify or Vercel
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Mobile Optimization

The site is fully responsive and mobile-first. Test on different devices before launch.

## ♿ Accessibility

- All images have descriptive alt text
- Semantic HTML structure
- Keyboard navigation support
- High contrast colors for readability

## 🔍 SEO Checklist

Before launch, update in `index.html`:
- [x] Page title (line 6)
- [x] Meta description (line 7)
- [x] Canonical URL (line 8)
- [x] Open Graph tags (lines 11-18)
- [x] Structured data (lines 27-44)

## 📞 Support

For questions or issues, contact the development team or refer to:
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
