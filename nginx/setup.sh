#!/bin/bash

# Update system
sudo apt update
sudo apt upgrade -y

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Create Nginx configuration
sudo cp transvastor.ru.conf /etc/nginx/sites-available/transvastor.ru

# Create symbolic link
sudo ln -sf /etc/nginx/sites-available/transvastor.ru /etc/nginx/sites-enabled/

# Remove default configuration
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test is successful, restart Nginx
if [ $? -eq 0 ]; then
    sudo systemctl restart nginx
    echo "Nginx configuration is valid and has been applied"
else
    echo "Nginx configuration test failed"
    exit 1
fi

# Get SSL certificate
sudo certbot --nginx -d transvastor.ru -d www.transvastor.ru

# Set up automatic renewal
echo "0 0 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab > /dev/null

echo "Nginx setup completed successfully!" 