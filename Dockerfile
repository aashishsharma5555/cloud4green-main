

FROM node:22-alpine AS build

WORKDIR /app

ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    npm_config_cache=/tmp/npm-cache

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund && npm cache clean --force

COPY . .
RUN npm run build && rm -rf node_modules /tmp/npm-cache

FROM nginx:1.27-alpine AS runtime

RUN rm -f /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    listen [::]:8080;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;
    server_tokens off;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml image/svg+xml;

    location = /health {
        access_log off;
        default_type text/plain;
        return 200 "ok\n";
    }

    location = /individual {
        try_files /coming-soon.html =404;
    }

    location = /privacy {
        try_files /coming-soon.html =404;
    }

    location = /terms {
        try_files /coming-soon.html =404;
    }

    location ~ ^/services/automation/.+ {
        try_files /coming-soon.html =404;
    }

    location = /404.html {
        internal;
    }

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    error_page 404 /404.html;
}
EOF

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
