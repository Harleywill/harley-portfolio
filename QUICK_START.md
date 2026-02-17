# Quick Start Guide

## 1. Run Locally

```bash
cd /Users/harleywilliams/harley-portfolio
npm run dev
# Visit http://localhost:3000
```

## 2. Test Build

```bash
npm run build
# Check if build completes without errors
```

## 3. Deploy to VPS (Once domain is purchased)

### Step 1: Build
```bash
npm run build
```

### Step 2: Copy to VPS
```bash
scp -r out/* root@72.62.6.180:/var/www/harley-portfolio/
```

### Step 3: SSH to VPS
```bash
ssh root@72.62.6.180
```

### Step 4: Configure Nginx

```bash
# Create config file
cat > /etc/nginx/sites-available/harley-portfolio << 'EOF'
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
    gzip_types text/plain text/css application/json;
}
EOF

# Enable and test
ln -s /etc/nginx/sites-available/harley-portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 5: SSL Certificate
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d harley.com -d www.harley.com
```

### Step 6: DNS Configuration
In your domain registrar, point domain to: `72.62.6.180`

## To Update Your Portfolio

```bash
# 1. Make changes in code
# 2. Build
npm run build

# 3. Deploy
scp -r out/* root@72.62.6.180:/var/www/harley-portfolio/

# 4. Reload Nginx (if needed)
ssh root@72.62.6.180 'nginx -t && systemctl reload nginx'
```

## File Locations

- **Build output**: `/Users/harleywilliams/harley-portfolio/out/`
- **On VPS**: `/var/www/harley-portfolio/`
- **Nginx config**: `/etc/nginx/sites-available/harley-portfolio`

## Troubleshooting

**Site not loading?**
- Check DNS propagation: `nslookup harley.com`
- Check Nginx: `systemctl status nginx`
- Check files copied: `ls -la /var/www/harley-portfolio/`

**SSL not working?**
- Check cert: `certbot certificates`
- Force HTTPS: Add redirect in Nginx config

**Old content showing?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
