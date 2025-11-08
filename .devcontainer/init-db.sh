#!/bin/bash
# init-db.sh

# Start MariaDB service
sudo service mariadb start

echo "Waiting for MariaDB to start..."
until sudo mysqladmin ping &>/dev/null; do
    sleep 1
done
echo "MariaDB is up!"

MYSQL_ROOT_PASSWORD="root"
DB_NAME="spring"
DB_USER="spring"
DB_PASSWORD="spring"

sudo mysql -u root <<MYSQL_SCRIPT
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
CREATE DATABASE IF NOT EXISTS ${DB_NAME};
CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';
FLUSH PRIVILEGES;
MYSQL_SCRIPT