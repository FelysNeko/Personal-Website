# THIS IS A MEMO, DO NOT EXECUTE IT DIRECTLY

# ssh neko@<ip-address>
sudo passwd -d root
sudo passwd -l root

sudo apt install nginx
sudo ufw allow http

# go to galaxyneko.website, you should see the default webpage 

sudo mkdir /var/www/galaxyneko.website
sudo unlink /etc/nginx/sites-enabled/default
sudo cp galaxyneko.website /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/galaxyneko.website /etc/nginx/sites-enabled/
sudo nginx -t

sudo systemctl restart nginx.service


# if your website show 403
# turn off vpn, clear cache, and reopen browser

# if it still shows 403
sudo chmod 755 -R /var/www/galaxyneko.website
# restart service

# if it sometimes shows 403
# edit the nginx config file: /etc/nginx/nginx.conf
# change www-data to root and save it
# restart service