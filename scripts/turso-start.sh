#!/bin/bash

echo "Installing Turso 👹"

curl -sSfL https://get.tur.so/install.sh | bash

chmod +x packages/bot/src/utils/create_schema.js

read -p "Whats the name of your DB? " db_name

echo "Creating DB 📦"

turso db create $db_name

echo "DB Created 🚀"

url=$(turso db show $db_name | grep -i URL: | awk '{print $2}')
token=$(turso db tokens create $db_name)

echo "Creating Tables 📦"

node packages/bot/src/utils/create_schema.js $db_name $url $token

sleep 3

echo "Here is your DB URL: $url"
echo "Here is your DB Token: $token"

sleep 2

echo "All done! 🎉"