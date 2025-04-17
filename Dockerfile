FROM node:23.11.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=.pnpm-store pnpm install --frozen-lockfile
RUN pnpm run build

# Bundle static assets with nginx
FROM alpine:3.21.3 AS production

# VARIABLES TEMPORAIRES
ARG DOCUMENTROOT="/etc/nginx"

# Initialise le répertoire de travail
WORKDIR ${DOCUMENTROOT}

# Création d'un utilisateur et groupe non privilégiés
RUN addgroup -S nginx && adduser -S -G nginx nginx

# Installation des services et mise à jour de sécurité
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache nginx && \
    mkdir -p /run/nginx && \
    mkdir includes && \
    rm -f ${DOCUMENTROOT}/http.d/* ${DOCUMENTROOT}/sites-available/* ${DOCUMENTROOT}/sites-enabled/* && \
    rm -rf /var/cache/apk/*

# Copie les différents dossiers/fichiers de conf dans le container
COPY nginx.conf ${DOCUMENTROOT}
COPY site.conf ${DOCUMENTROOT}/sites-available/

# Copie des assets compilés depuis le builder
COPY --from=build /app/dist /usr/share/nginx/html

# Création du lien symbolique pour les configurations Nginx
RUN if [ ! -d "${DOCUMENTROOT}/sites-enabled" ]; then mkdir -p ${DOCUMENTROOT}/sites-enabled; fi && \
    ln -s ${DOCUMENTROOT}/sites-available/* ${DOCUMENTROOT}/sites-enabled/

# Ajustement des permissions pour l'utilisateur non root
RUN chown -R nginx:nginx ${DOCUMENTROOT} /run/nginx

# Passer à l'utilisateur non root
USER nginx

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]