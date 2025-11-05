# 🚀 Deployment Guide for Pilot Capital

This guide will help you deploy Pilot Capital to your VPS at `pilot.lingano.live` with automatic CI/CD. This setup is designed to work alongside your existing apps on the same VPS.

## 📋 Prerequisites

1. **VPS Server** with Ubuntu 20.04+ and root access
2. **Domain** `pilot.lingano.live` pointed to your VPS IP
3. **GitHub Repository** with your code
4. **GitHub Secrets** configured for deployment
5. **Existing Nginx** setup on your VPS (ports 80/443 in use)

## 🔧 Setup Instructions

### Step 1: Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

```
VPS_HOST=your.vps.ip.address
VPS_USER=your-username
VPS_SSH_KEY=your-private-ssh-key
```

### Step 2: Prepare Your VPS

1. **SSH into your VPS:**

    ```bash
    ssh your-username@your.vps.ip.address
    ```

2. **Run the setup script:**

    ```bash
    wget https://raw.githubusercontent.com/your-username/pilot-capital-core/main/scripts/setup-vps.sh
    chmod +x setup-vps.sh
    ./setup-vps.sh
    ```

3. **Configure environment variables:**

    ```bash
    cd /var/www/pilot-capital
    nano .env
    ```

    Update these critical values:

    ```env
    SECRET_KEY=your-super-secret-django-key
    DB_PASSWORD=your-secure-database-password
    DEBUG=False
    DOMAIN=pilot.lingano.live
    ```

### Step 3: Deploy

1. **Push to main branch:**

    ```bash
    git add .
    git commit -m "Initial deployment setup"
    git push origin main
    ```

2. **GitHub Actions will automatically:**
    - Build your React frontend
    - Deploy to your VPS
    - Start Docker containers
    - Run database migrations

## 🏗️ Architecture Overview

````
Internet → Your Existing Nginx (Port 80/443) → Docker Containers
                    ↓
            pilot.lingano.live routes:
                    ├── /api/* → Backend (Port 3002)
                    ├── /admin/* → Backend (Port 3002)
                    └── /* → Frontend (Port 3001)

Docker Containers:
├── Frontend (React/Nginx) - Port 3001
├── Backend (Django/Gunicorn) - Port 3002
├── Database (PostgreSQL) - Internal
└── Cache (Redis) - Internal
```## 📁 File Structure

````

pilot-capital-core/
├── apps/
│ ├── api/
│ │ ├── Dockerfile # Django container
│ │ └── requirements.txt # Python dependencies
│ └── web/
│ ├── Dockerfile # React container
│ └── nginx.conf # Frontend routing
├── .github/workflows/
│ └── deploy.yml # CI/CD pipeline
├── docker-compose.prod.yml # Production containers
├── .env.production # Environment template
└── scripts/
└── setup-vps.sh # VPS setup script

````

## 🔄 Deployment Process

1. **Code Push** → GitHub Actions triggered
2. **Build Frontend** → Create production React build
3. **Deploy to VPS** → SSH and run Docker containers
4. **Database Migration** → Update database schema
5. **Service Restart** → Reload all services

## 🛠️ Manual Commands

**View logs:**

```bash
docker-compose -f docker-compose.prod.yml logs -f
````

**Restart services:**

```bash
docker-compose -f docker-compose.prod.yml restart
```

**Update deployment:**

```bash
cd /var/www/pilot-capital
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```

**Database backup:**

```bash
docker-compose -f docker-compose.prod.yml exec db pg_dump -U pilot_user pilot_capital > backup.sql
```

## 🔒 Security Features

-   **SSL/TLS** with Let's Encrypt certificates
-   **Security Headers** (XSS protection, HSTS, etc.)
-   **Environment Variables** for sensitive data
-   **Docker Isolation** for service separation
-   **Nginx Rate Limiting** for DDoS protection

## 🚨 Troubleshooting

**Container not starting:**

```bash
docker-compose -f docker-compose.prod.yml logs backend
```

**SSL certificate issues:**

```bash
sudo certbot renew --dry-run
```

**Database connection issues:**

```bash
docker-compose -f docker-compose.prod.yml exec backend python manage.py dbshell
```

**Static files not loading:**

```bash
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic
```

## 📊 Monitoring

-   **Application Logs:** `docker-compose logs -f`
-   **Nginx Logs:** `sudo tail -f /var/log/nginx/access.log`
-   **SSL Status:** `sudo certbot certificates`
-   **Disk Usage:** `docker system df`

## 🔄 Updates

The application automatically deploys when you push to the `main` branch. For manual updates:

1. SSH into your VPS
2. Navigate to `/var/www/pilot-capital`
3. Run: `git pull && docker-compose -f docker-compose.prod.yml up -d --build`

## 📞 Support

For issues with deployment:

1. Check GitHub Actions logs
2. Review VPS logs: `docker-compose -f docker-compose.prod.yml logs`
3. Verify environment variables in `.env`
4. Ensure domain DNS points to VPS IP

Your Pilot Capital application will be available at: **https://pilot.lingano.live** 🚀

## 🔌 Port Configuration

This deployment uses internal ports to avoid conflicts with your existing apps:

-   **Frontend (React)**: Port 3001
-   **Backend (Django API)**: Port 3002
-   **Database (PostgreSQL)**: Internal Docker network only
-   **Cache (Redis)**: Internal Docker network only

## 🌐 Nginx Integration

To integrate with your existing nginx setup, add this configuration:

```nginx
# Add to your existing nginx configuration
upstream pilot_frontend {
    server 127.0.0.1:3001;
}

upstream pilot_backend {
    server 127.0.0.1:3002;
}

server {
    listen 443 ssl http2;
    server_name pilot.lingano.live;

    # Your existing SSL configuration...

    # API routes
    location /api/ {
        proxy_pass http://pilot_backend/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin panel
    location /admin/ {
        proxy_pass http://pilot_backend/admin/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static/Media files
    location ~ ^/(static|media)/ {
        proxy_pass http://pilot_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Frontend (React)
    location / {
        proxy_pass http://pilot_frontend/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📱 Quick Deployment Commands

**Deploy manually:**

```bash
cd /var/www/pilot-capital
./scripts/deploy.sh
```

**Check status:**

```bash
docker-compose -f docker-compose.prod.yml ps
```

**View logs:**

```bash
docker-compose -f docker-compose.prod.yml logs -f
```
