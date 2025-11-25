# 📋 Complete Deployment Checklist for Pilot Capital

**Goal**: Deploy Pilot Capital to `pilot.lingano.live` on your existing VPS without breaking other apps.

## 🎯 Overview

-   Your app will run on ports 3001 (frontend) and 3002 (backend)
-   Your existing nginx will proxy `pilot.lingano.live` to these ports
-   Zero downtime for your existing applications

---

## 📝 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Prepare GitHub Repository

1. **Push your current code to GitHub** (if not already done):

    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2. **Configure GitHub Secrets**:

    - Go to your GitHub repository
    - Navigate to: Settings → Secrets and variables → Actions
    - Add these 3 secrets:

    | Secret Name   | Value                | Example                                |
    | ------------- | -------------------- | -------------------------------------- |
    | `VPS_HOST`    | Your VPS IP address  | `123.456.789.012`                      |
    | `VPS_USER`    | Your VPS username    | `root` or `ubuntu`                     |
    | `VPS_SSH_KEY` | Your private SSH key | Copy entire content of `~/.ssh/id_rsa` |

---

### STEP 2: Prepare Your VPS

1. **SSH into your VPS**:

    ```bash
    ssh your-username@your-vps-ip
    ```

2. **Clone your repository**:

    ```bash
    cd /var/www
    sudo git clone https://github.com/pilot-capital/pilot-capital-core.git pilot-capital
    sudo chown -R $USER:$USER /var/www/pilot-capital
    cd pilot-capital
    ```

3. **Run the setup script**:

    ```bash
    chmod +x scripts/setup-vps.sh
    ./scripts/setup-vps.sh
    ```

    **Note**: When asked about SSL setup, choose 'y' only if you don't already have SSL for pilot.lingano.live

4. **Configure environment variables**:

    ```bash
    cd /var/www/pilot-capital
    cp .env.production .env
    nano .env
    ```

    **Update these values in .env**:

    ```env
    # Generate secret key: python -c "from django.utils.crypto import get_random_string; print(get_random_string(50))"
    SECRET_KEY=your-generated-secret-key-here

    # Create a secure password for database
    DB_PASSWORD=your-secure-database-password

    # Keep these as-is
    DEBUG=False
    DOMAIN=pilot.lingano.live
    ```

---

### STEP 3: Configure Nginx Integration

**Choose ONE of these methods:**

#### Method A: Use Provided Configuration File

```bash
# Copy the complete nginx configuration
sudo cp nginx/pilot-capital-nginx.conf /etc/nginx/sites-available/pilot-capital

# Enable the site
sudo ln -sf /etc/nginx/sites-available/pilot-capital /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

#### Method B: Add to Your Existing Configuration

If you prefer to manually add to your existing nginx config:

1. **Open your existing nginx configuration**:

    ```bash
    sudo nano /etc/nginx/sites-available/your-existing-config
    ```

2. **Add these upstream definitions** (at the top, before server blocks):

    ```nginx
    upstream pilot_frontend {
        server 127.0.0.1:3001;
    }

    upstream pilot_backend {
        server 127.0.0.1:3002;
    }
    ```

3. **Add a new server block** for pilot.lingano.live:

    ```nginx
    server {
        listen 80;
        server_name pilot.lingano.live;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name pilot.lingano.live;

        # Your existing SSL configuration...
        ssl_certificate /etc/letsencrypt/live/pilot.lingano.live/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/pilot.lingano.live/privkey.pem;

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

4. **Test and reload**:
    ```bash
    sudo nginx -t
    sudo systemctl reload nginx
    ```

---

### STEP 4: Setup SSL Certificate (if needed)

**Only do this if you don't already have SSL for pilot.lingano.live:**

```bash
sudo certbot --nginx -d pilot.lingano.live
```

---

### STEP 5: Configure DNS

**Ensure your domain points to your VPS**:

-   Add an A record: `pilot.lingano.live` → `your-vps-ip-address`
-   Wait 5-10 minutes for DNS propagation

---

### STEP 6: Deploy the Application

1. **Push to trigger deployment** (from your local machine):

    ```bash
    git push origin main
    ```

    This will automatically:

    - Build the React frontend
    - Deploy to your VPS
    - Start Docker containers
    - Run database migrations

2. **Or deploy manually on VPS**:
    ```bash
    cd /var/www/pilot-capital
    chmod +x scripts/deploy.sh
    ./scripts/deploy.sh
    ```

---

### STEP 7: Verify Deployment

1. **Check container status**:

    ```bash
    cd /var/www/pilot-capital
    docker-compose -f docker-compose.prod.yml ps
    ```

    You should see:

    - ✅ pilot-capital_frontend_1 (Up, 0.0.0.0:3001->80/tcp)
    - ✅ pilot-capital_backend_1 (Up, 0.0.0.0:3002->8000/tcp)
    - ✅ pilot-capital_db_1 (Up, 5432/tcp)
    - ✅ pilot-capital_redis_1 (Up, 6379/tcp)

2. **Test services locally**:

    ```bash
    # Test frontend
    curl -I http://localhost:3001

    # Test backend API
    curl -I http://localhost:3002/api/airlines/
    ```

3. **Test through nginx**:

    ```bash
    # Test frontend
    curl -I https://pilot.lingano.live

    # Test API
    curl -I https://pilot.lingano.live/api/airlines/
    ```

4. **Visit your website**: https://pilot.lingano.live

---

## 🚨 TROUBLESHOOTING

### Container Issues

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Rebuild containers
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### Nginx Issues

```bash
# Check nginx status
sudo systemctl status nginx

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

### SSL Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew --dry-run
```

### Database Issues

```bash
# Access database
docker-compose -f docker-compose.prod.yml exec backend python manage.py dbshell

# Run migrations manually
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
```

---

## 📊 POST-DEPLOYMENT TASKS

### Create Admin User

```bash
cd /var/www/pilot-capital
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

### Add Sample Data (Optional)

```bash
docker-compose -f docker-compose.prod.yml exec backend python create_sample_data.py
```

### Setup Monitoring

```bash
# Add to crontab for log rotation
echo "0 2 * * * cd /var/www/pilot-capital && docker-compose -f docker-compose.prod.yml logs --tail=1000 > logs/app-$(date +\%Y\%m\%d).log 2>&1" | crontab -
```

---

## ✅ FINAL CHECKLIST

-   [ ] GitHub secrets configured (VPS_HOST, VPS_USER, VPS_SSH_KEY)
-   [ ] Repository cloned to `/var/www/pilot-capital`
-   [ ] Setup script executed successfully
-   [ ] Environment variables configured in `.env`
-   [ ] Nginx configuration added and tested
-   [ ] SSL certificate configured (if needed)
-   [ ] DNS A record points to VPS IP
-   [ ] Application deployed (manually or via GitHub Actions)
-   [ ] All containers running and healthy
-   [ ] Website accessible at https://pilot.lingano.live
-   [ ] API accessible at https://pilot.lingano.live/api/airlines/
-   [ ] Admin panel accessible at https://pilot.lingano.live/admin/

---

## 🔄 FUTURE DEPLOYMENTS

**Automatic**: Push to main branch

```bash
git push origin main
```

**Manual**: Run deployment script

```bash
cd /var/www/pilot-capital
./scripts/deploy.sh
```

---

## 📞 NEED HELP?

**Common Commands:**

-   View logs: `docker-compose -f docker-compose.prod.yml logs -f`
-   Restart: `docker-compose -f docker-compose.prod.yml restart`
-   Stop: `docker-compose -f docker-compose.prod.yml down`
-   Update: `git pull origin main && ./scripts/deploy.sh`

**Port Usage:**

-   Frontend: localhost:3001 → pilot.lingano.live
-   Backend: localhost:3002 → pilot.lingano.live/api
-   Your other apps: Unchanged (still on 80/443)

🎉 **Your Pilot Capital application will be live at: https://pilot.lingano.live**
