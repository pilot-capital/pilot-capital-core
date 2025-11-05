#!/bin/bash

# Simple deployment script for Pilot Capital
# This script only handles Docker containers, not nginx configuration

APP_DIR="/var/www/pilot-capital"
COMPOSE_FILE="docker-compose.prod.yml"

echo "🚀 Deploying Pilot Capital..."

# Navigate to app directory
cd $APP_DIR || exit 1

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.production .env
    echo "⚠️  Please edit .env file with your production values!"
    echo "   Run: nano .env"
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f $COMPOSE_FILE down

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose -f $COMPOSE_FILE build --no-cache
docker-compose -f $COMPOSE_FILE up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run migrations
echo "🗃️  Running database migrations..."
docker-compose -f $COMPOSE_FILE exec -T backend python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
docker-compose -f $COMPOSE_FILE exec -T backend python manage.py collectstatic --noinput

# Create sample data (optional)
echo "📊 Creating sample data..."
docker-compose -f $COMPOSE_FILE exec -T backend python create_sample_data.py || echo "Sample data creation skipped"

# Show status
echo "📊 Container status:"
docker-compose -f $COMPOSE_FILE ps

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Services running on:"
echo "  - Frontend: http://localhost:3001"
echo "  - Backend API: http://localhost:3002"
echo ""
echo "Next steps:"
echo "1. Configure your nginx reverse proxy to route pilot.lingano.live to these ports"
echo "2. Use the nginx configuration from: nginx/pilot-capital-nginx.conf"
echo "3. Test the deployment: curl http://localhost:3001"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose -f $COMPOSE_FILE logs -f"
echo "  - Restart: docker-compose -f $COMPOSE_FILE restart"
echo "  - Stop: docker-compose -f $COMPOSE_FILE down"