FROM php:8.1-fpm-alpine as base

# General dependencies
RUN apk add --no-cache git \
    $PHPIZE_DEPS \
    linux-headers

# Pure Extensions
RUN docker-php-ext-install pdo_mysql

# mbstring extension
RUN apk add --no-cache oniguruma-dev \
    && docker-php-ext-install mbstring

# intl extension
RUN apk add --no-cache icu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

# xml, soap extension
RUN apk add --no-cache libxml2-dev \
    && docker-php-ext-install xml \
    && docker-php-ext-install soap

# redis extension
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \docker \
    &&  docker-php-ext-enable redis

# zip extension
RUN apk add --no-cache zlib-dev \
    libpq-dev \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip

# gd extension with jpeg, png, webp, freetype
RUN apk add --no-cache \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    freetype-dev \
    && docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype \
    && docker-php-ext-install -j$(nproc) gd

# Supervisor
RUN apk add --no-cache supervisor

# Composer
COPY --from=composer:2.4 /usr/bin/composer /usr/bin/composer


RUN mkdir -p /run/php

ARG uid=1000
ARG gid=1000

# Create an user (mandatory for supervisor...)
ARG uname=laravel
RUN addgroup --gid $gid $uname
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "$uname" \
    --no-create-home \
    --uid "$uid" \
    "$uname"

# Adding crontab as root crontab but running as laravel user
ADD crontab /etc/crontabs/$uname
RUN crontab -u $uname -e

RUN chown ${uid}:${gid} /run/php

WORKDIR /var/www/html

FROM base as dev

# xdebug extension
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Copy php.ini for development
RUN cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

FROM base as prod

# Opcache
RUN docker-php-ext-configure opcache \
    && docker-php-ext-install opcache

# Copy php.ini optimized
RUN cp "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini";
