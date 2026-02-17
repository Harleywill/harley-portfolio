# Harley Williams - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development projects and skills. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dark Theme with Accent Colors**: Lime green (#c5ff41) and orange (#f46c38) accents
- **Responsive Design**: Mobile-first approach, works seamlessly on all devices
- **Smooth Animations**: Fade-in and slide-up animations on page load
- **Project Showcase**: Featured projects with descriptions and tech stack
- **Skills Section**: Organized by categories (Frontend, Backend, DevOps, Other)
- **Contact Form**: Easy way for visitors to get in touch
- **Navigation**: Fixed header with smooth scrolling
- **Performance Optimized**: Static export for fast loading times

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 3
- **Fonts**: Google Fonts (Poppins)
- **Build**: Static export for VPS deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create optimized production build
npm run build

# Build output will be in the `out/` directory
```

## Project Structure

```
harley-portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── Projects.tsx        # Projects showcase
│   ├── ProjectCard.tsx     # Individual project card
│   ├── Skills.tsx          # Skills section
│   ├── Contact.tsx         # Contact form
│   ├── Navigation.tsx      # Fixed navigation bar
│   └── Footer.tsx          # Footer with social links
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Dependencies and scripts
```

## Customization

### Update Contact Information

Edit `components/Contact.tsx`:
- Change email address in the mailto link
- Update LinkedIn and GitHub URLs
- Add social media links in Footer component

### Update Projects

Edit `components/Projects.tsx`:
- Modify the `projects` array with your projects
- Update project titles, descriptions, and technologies
- Add project links

### Update Skills

Edit `components/Skills.tsx`:
- Modify `skillCategories` array
- Add/remove skills in each category
- Change category names and icons

### Update Colors

Edit `tailwind.config.ts`:
- Modify color values in the `colors` section
- Change lime: '#c5ff41' and orange: '#f46c38' to your preferred colors

## Deployment to VPS

### Step 1: Build the Project

```bash
npm run build
# Output will be in the `out/` directory
```

### Step 2: SSH into Your VPS

```bash
ssh root@72.62.6.180
```

### Step 3: Create Directory and Copy Files

```bash
# Create directory for portfolio
mkdir -p /var/www/harley-portfolio

# From your local machine, copy the build output
scp -r out/* root@72.62.6.180:/var/www/harley-portfolio/
```

### Step 4: Configure Nginx

Create a new Nginx configuration file:

```bash
nano /etc/nginx/sites-available/harley-portfolio
```

Add this configuration:

```nginx
server {
    server_name harley.com www.harley.com;
    root /var/www/harley-portfolio;
    index index.html;

    listen 80;
    listen [::]:80;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/harley-portfolio /etc/nginx/sites-enabled/
nginx -t  # Test configuration
systemctl reload nginx
```

### Step 5: Set Up SSL Certificate (Free with Let's Encrypt)

```bash
# Install certbot if not already installed
apt install certbot python3-certbot-nginx

# Generate certificate
certbot --nginx -d harley.com -d www.harley.com
```

### Step 6: Point Domain DNS

In your domain registrar (Hostinger, GoDaddy, etc.):
- Create an **A record** pointing to your VPS IP: `72.62.6.180`
- For both `harley.com` and `www.harley.com`

It may take up to 24 hours for DNS to fully propagate.

## Updating Your Portfolio

After making changes:

```bash
# Build locally
npm run build

# Copy to VPS
scp -r out/* root@72.62.6.180:/var/www/harley-portfolio/

# Reload Nginx on VPS
ssh root@72.62.6.180 'nginx -t && systemctl reload nginx'
```

## Performance

- **Static Export**: No server-side rendering needed, instant loading
- **Tailwind CSS**: Only includes used styles (~30KB gzipped)
- **Image Optimization**: Responsive images with proper sizing
- **Caching**: Browser caching enabled for fast repeat visits

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2026 Harley Williams. All rights reserved.
