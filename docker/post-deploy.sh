#!/bin/bash

# Configure NewRelic Monitoring
# Disable monitoring if NEWRELIC_KEY is not set
if [ -n "$NEWRELIC_KEY" ]; then
	sed -i -e"s/REPLACE_WITH_REAL_KEY/$NEWRELIC_KEY/g" /usr/local/etc/php/conf.d/newrelic.ini
else
	sed -i -e"s/;newrelic.enabled\s*=\s*true/newrelic.enabled = false/g" /usr/local/etc/php/conf.d/newrelic.ini
fi

if [ -n "$NEWRELIC_APPLICATION" ]; then
	sed -i -e"s/PHP Application/$NEWRELIC_APPLICATION/" /usr/local/etc/php/conf.d/newrelic.ini
else
	sed -i -e"s/PHP Application/$PROJECT_NAME \($ENVIRONMENT\)/" /usr/local/etc/php/conf.d/newrelic.ini
fi

# Symlink application to nginx
if [ "$ENVIRONMENT" = "production" ]; then
	ln -nsf /home/app/dist /var/www/app
else
	ln -nsf /home/app/src /var/www/app
fi
