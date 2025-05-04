echo "Installing redis.."
sudo apt update
sudo apt install redis-server -y
sudo apt update
sudo apt install postgresql -y
echo "Installing node"
sudo apt update
sudo apt install nodejs npm -y
echo "Install pm2 globally"
sudo npm install -g pm2


