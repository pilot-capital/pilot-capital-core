#!/bin/bash

# Pilot Capital VPS Setup Script
# Run this script on your VPS to prepare it for deployment

echo "🚀 Setting up VPS for Pilot Capital deployment..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Nginx and SSL tools (skip if already installed)
if ! command -v nginx &> /dev/null; then
    sudo apt install nginx -y
fi

if ! command -v certbot &> /dev/null; then
    sudo apt install certbot python3-certbot-nginx -y
fi

# Create application directory
sudo mkdir -p /var/www/pilot-capital
sudo chown $USER:$USER /var/www/pilot-capital

# Clone repository (you'll need to set this up)
cd /var/www
git clone https://github.com/your-username/pilot-capital-core.git pilot-capital
cd pilot-capital

# Copy environment file
cp .env.production .env

echo "📝 Please edit .env file with your production values:"
echo "   - SECRET_KEY: Generate a new Django secret key"
echo "   - DB_PASSWORD: Set a secure database password" 
echo "   - Other environment variables as needed"

# Create SSL directory
sudo mkdir -p /etc/nginx/ssl

# Setup SSL certificate (if not already configured)
echo "🔒 Setting up SSL certificate for pilot.lingano.live..."
echo "Note: If you already have SSL configured, you can skip this step"
read -p "Do you want to setup SSL certificate? (y/n): " setup_ssl

if [ "$setup_ssl" = "y" ]; then
    sudo certbot --nginx -d pilot.lingano.live
fi

echo "📝 Nginx configuration created at: nginx/pilot-capital-nginx.conf"
echo "Please add the contents of this file to your existing nginx configuration"
echo "or copy it to /etc/nginx/sites-available/ and enable it"

echo ""
echo "Manual nginx setup:"
echo "1. Copy nginx configuration:"
echo "   sudo cp nginx/pilot-capital-nginx.conf /etc/nginx/sites-available/pilot-capital"
echo "2. Enable the site:"
echo "   sudo ln -sf /etc/nginx/sites-available/pilot-capital /etc/nginx/sites-enabled/"
echo "3. Test and reload:"
echo "   sudo nginx -t && sudo systemctl reload nginx"

# Start the application
docker-compose -f docker-compose.prod.yml up -d

# Setup auto-renewal for SSL
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -

# Setup log rotation
sudo tee /etc/logrotate.d/pilot-capital << EOF
/var/www/pilot-capital/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
}
EOF

echo "✅ VPS setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit /var/www/pilot-capital/.env with your production settings"
echo "2. Push your code to the main branch to trigger deployment"
echo "3. Visit https://pilot.lingano.live to see your app!"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  - Restart: docker-compose -f docker-compose.prod.yml restart"
echo "  - Update: git pull && docker-compose -f docker-compose.prod.yml up -d --build"