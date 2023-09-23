#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
for file in /usr/share/nginx/html/static/js/*
do
  sed -i 's|REACT_APP_BACKEND_URL_PLACEHOLDER|'${REACT_APP_BACKEND_URL}'|g' $file
done
# Starting NGINX
nginx -g 'daemon off;'
