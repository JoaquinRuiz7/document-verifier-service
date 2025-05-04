#!/bin/bash

echo "🚨 Emergency space clearing to allow apt to work..."
# Delete npm and PM2 logs first
sudo rm -rf ~/.npm/_* ~/.cache/* ~/.pm2/logs/*

# Clean up Docker images if used
sudo docker system prune -af || true
sudo docker volume prune -f || true

# Clear out any large core dumps or forgotten files
sudo find / -type f -name 'core' -exec rm -f {} + 2>/dev/null || true

echo "🧹 Starting general cleanup..."
# Basic cleanup before installation
sudo rm -rf /tmp/* /var/tmp/*
sudo rm -rf /var/log/*.gz
sudo truncate -s 0 /var/log/*.log
npm cache clean --force || true

# Try to free more space
sudo apt-get clean || true
sudo apt-get autoclean || true
sudo apt-get autoremove --purge -y || true

echo "🧹 Cleanup complete. Continuing with setup..."

# Get latest code changes
echo "📦 Pulling latest code from Git..."
git pull

echo "📦 Installing Node.js dependencies..."
npm install
npm prune
npm run build
cp .env dist/.env

# Install required packages only if not installed
echo "🔍 Checking required packages..."
REQUIRED_PKGS=(curl node)
for pkg in "${REQUIRED_PKGS[@]}"; do
    if ! command -v $pkg &>/dev/null; then
        echo "📦 Installing $pkg..."
        if [ "$pkg" == "node" ]; then
            curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
            sudo apt install -y nodejs
        else
            sudo apt install -y $pkg
        fi
    else
        echo "✅ $pkg already installed."
    fi
done

# Redis check
if ! command -v redis-server &> /dev/null; then
    echo "📦 Installing Redis..."
    sudo apt install -y redis-server
    sudo systemctl enable redis-server
    sudo systemctl start redis-server
else
    echo "✅ Redis already installed."
fi

# PM2 check
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
else
    echo "✅ PM2 already installed."
fi

# STOPING SERVICES
echo "🛑 Stopping any existing services to avoid port conflicts..."
sudo fuser -k 80/tcp || true
sudo fuser -k 443/tcp || true
sudo systemctl stop redis || true

#Starting redis
echo "🚀 Starting Redis server..."
sudo systemctl start redis

# PM2 setup
echo "🚀 Starting application with PM2..."
pm2 delete all || true
pm2 flush
pm2 reset all
pm2 start dist/main.js --name document-verifier
pm2 save
pm2 startup | bash

echo "✅ Deployment finished successfully."