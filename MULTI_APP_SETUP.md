# 🔧 Multi-App VPS Deployment Summary

## What's Changed for Multi-App Setup

Your deployment has been updated to work alongside existing apps on your VPS:

### ✅ **Port Configuration**

-   **Frontend**: Port 3001 (instead of 80)
-   **Backend API**: Port 3002 (instead of 8000)
-   **Database & Redis**: Internal Docker network (no external ports)

### ✅ **Nginx Integration**

-   Provided nginx configuration for your existing reverse proxy
-   Routes pilot.lingano.live traffic to the correct internal ports
-   No conflicts with your existing apps on ports 80/443

### ✅ **Simplified Deployment**

-   Uses existing nginx setup (doesn't override your configuration)
-   Docker containers only handle the application, not SSL termination
-   Easy to integrate with your current server setup

## 🚀 Quick Setup Steps

1. **Configure GitHub secrets** (VPS_HOST, VPS_USER, VPS_SSH_KEY)

2. **Run on your VPS:**

    ```bash
    cd /var/www
    git clone your-repo pilot-capital
    cd pilot-capital
    chmod +x scripts/setup-vps.sh
    ./scripts/setup-vps.sh
    ```

3. **Add nginx configuration:**

    ```bash
    # Option 1: Use provided config file
    sudo cp nginx/pilot-capital-nginx.conf /etc/nginx/sites-available/pilot-capital
    sudo ln -sf /etc/nginx/sites-available/pilot-capital /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx

    # Option 2: Add to your existing config manually
    # See DEPLOYMENT.md for the configuration snippets
    ```

4. **Deploy:**
    ```bash
    git push origin main  # Triggers automatic deployment
    ```

## 🔍 Service Access

-   **Frontend**: http://localhost:3001 (proxied via nginx to pilot.lingano.live)
-   **Backend API**: http://localhost:3002 (proxied via nginx to pilot.lingano.live/api)
-   **Admin Panel**: http://localhost:3002/admin (proxied via nginx to pilot.lingano.live/admin)

## 📋 Integration Checklist

-   [ ] GitHub secrets configured
-   [ ] VPS setup script executed
-   [ ] Environment variables configured (.env file)
-   [ ] Nginx configuration added to existing setup
-   [ ] SSL certificate for pilot.lingano.live (if not already configured)
-   [ ] DNS A record: pilot.lingano.live → your VPS IP
-   [ ] First deployment: `git push origin main`

Your Pilot Capital app will run alongside your existing applications without any port conflicts! 🎉
