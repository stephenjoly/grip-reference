FROM nginxinc/nginx-unprivileged:stable-alpine@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03
ARG SOURCE_REVISION=unknown
LABEL org.opencontainers.image.source="https://github.com/stephenjoly/grip-reference" \
      org.opencontainers.image.revision="${SOURCE_REVISION}"
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css app.js settings.js data.js favicon.svg /usr/share/nginx/html/
COPY assets/geist.ttf assets/Geist-OFL.txt /usr/share/nginx/html/assets/
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
