# Harley Williams - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development projects and skills. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and modern web technologies.

**Live Site:** [harleywilliams.co.uk](https://harleywilliams.co.uk)

---

## ✨ Features

- **Modern Dark Theme** - Sleek dark interface with lime green (#c5ff41) and orange (#f46c38) accents
- **Fully Responsive** - Mobile-first design that works seamlessly across all devices
- **Smooth Animations** - Elegant fade-in and slide-up animations powered by Framer Motion
- **Project Showcase** - Featured projects with detailed descriptions and tech stacks
- **Skills Section** - Organized by expertise areas (Frontend, Backend, DevOps, Tools)
- **Contact Form** - Easy way for visitors and potential clients to get in touch
- **Fixed Navigation** - Smooth scrolling navigation with dark theme
- **High Performance** - Optimized for fast loading and great user experience
- **3D Graphics** - Interactive 3D elements using Three.js and OGL

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) + TypeScript |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion |
| **3D Graphics** | Three.js, OGL |
| **Charts** | Recharts |
| **Email** | Nodemailer |
| **Icons** | FontAwesome |
| **Font** | Poppins (Google Fonts) |
| **Deployment** | VPS (PM2) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Harleywill/harley-portfolio.git
cd harley-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in development mode.

### Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Static export (for VPS deployment)
npm run export
```

---

## 📁 Project Structure

```
harley-portfolio/
├── app/
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles and Tailwind imports
│   └── api/                 # API routes (if any)
├── components/
│   ├── Hero.tsx             # Hero/intro section
│   ├── Projects.tsx         # Projects showcase grid
│   ├── ProjectCard.tsx      # Individual project card component
│   ├── Skills.tsx           # Skills breakdown by category
│   ├── Contact.tsx          # Contact form with validation
│   ├── Navigation.tsx       # Fixed header navigation
│   └── Footer.tsx           # Footer with social links
├── public/                  # Static assets (images, icons)
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies and scripts
```

---

## 🎨 Customization

### Update Your Information

**Contact Details** (`components/Contact.tsx`):
- Change email address in form submission
- Update LinkedIn and GitHub profile URLs
- Modify contact form fields as needed

**Featured Projects** (`components/Projects.tsx`):
- Edit the `projects` array
- Add project titles, descriptions, and technologies
- Include project links and live demos
- Update project images

**Skills** (`components/Skills.tsx`):
- Modify `skillCategories` array
- Add/remove skills in each category
- Update category icons and colors

**Colors & Theme** (`tailwind.config.ts`):
- Modify the `colors` object to customize theme
- Update lime green: `#c5ff41`
- Update orange accent: `#f46c38`
- Change to your preferred color scheme

### Add Your Own Content

1. Update profile information in all component files
2. Replace placeholder images in `/public` directory
3. Add your actual projects with links and descriptions
4. Customize the color scheme to match your brand
5. Update social media links in Footer component

---

## 🚀 Deployment

### VPS Deployment (PM2)

The portfolio is configured to run on a VPS using PM2 process manager with Next.js standalone mode.

```bash
# Build for production
npm run build

# Push to your repository
git push origin main

# On VPS: Pull and restart
pm2 restart harley-portfolio
```

### Static Export (Nginx)

Alternative: Build as static site for Nginx:

```bash
# Create static export
npm run export

# Output will be in the `out/` directory
# Copy to your web server: scp -r out/* user@server:/var/www/portfolio/
```

---

## 📊 Performance

- ⚡ **Fast Page Load** - Optimized for Core Web Vitals
- 🎯 **SEO Optimized** - Proper meta tags and structured data
- 📦 **Code Splitting** - Automatic route-based code splitting
- 🖼️ **Image Optimization** - Next.js Image component for responsive images
- 💾 **Caching** - Browser caching enabled for repeat visits
- 🗜️ **Compression** - GZIP compression for assets

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome/Edge | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| iOS Safari | 14+ | ✅ Full support |
| Chrome Mobile | Latest | ✅ Full support |

---

## 📝 License

© 2026 Harley Williams. All rights reserved.

This is a personal portfolio website. Feel free to use this as inspiration for your own portfolio, but please do not copy the design or content directly.

---

## 🤝 Contributing

This is a personal portfolio project. If you find any issues or have suggestions, feel free to open an issue on GitHub.

---

## 📬 Contact

- **Website:** [harleywilliams.co.uk](https://harleywilliams.co.uk)
- **Email:** hjakewilliams@gmail.com
- **GitHub:** [@Harleywill](https://github.com/Harleywill)
- **LinkedIn:** [Harley Williams](https://linkedin.com/in/harley-williams)

---

**Last Updated:** May 2026
