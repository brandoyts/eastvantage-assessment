FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    $PHPIZE_DEPS \
    git \
    openssh-client \
    zip \
    unzip \
    postgresql-dev \
    libzip-dev \
    sqlite-dev \
    mysql-client \
    libpng-dev \
    jpeg-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip exif pcntl \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install gd \
    && rm -rf /var/cache/apk/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]