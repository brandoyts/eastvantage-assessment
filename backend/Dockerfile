FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    bash \
    git \
    unzip \
    libzip-dev \
    oniguruma-dev \
    libpng-dev \
    curl \
    && docker-php-ext-install pdo_mysql mbstring zip gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html

RUN composer install --no-dev --optimize-autoloader

RUN if [ ! -f ".env" ]; then \
        cp .env.example .env && \
        php artisan key:generate; \
    fi

# Expose port
EXPOSE 8000

CMD ["sh", "-c", "php artisan migrate:fresh --seed && php artisan serve --host=0.0.0.0 --port=8000"]
