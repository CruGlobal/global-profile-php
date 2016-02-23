# global-profile-php
Global Profile Application

## Installation on localhost
Clone the repo and submodule
```bash
git clone -b staging https://github.com/CruGlobal/global-profile-php
cd global-profile-php
```
Install Composer and Download Dependencies
```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar install
```
Copy provided config.php to the config directory
```bash
cp config.php config/
```

Install bower, bower components and npm packages
```bash
npm install -g bower
npm install
bower install
gulp build
```

Point your server at the global-profile-php directory as the document root and serve index.php as the entry point to the application.
