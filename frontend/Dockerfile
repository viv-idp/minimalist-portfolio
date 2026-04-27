# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --ignore-scripts --optional

# Copy source code
COPY . .

# Copy public assets (resume PDF, etc.) into build output
# Vite automatically copies public/ contents to dist/
RUN mkdir -p public

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx config if exists
RUN rm -f /etc/nginx/conf.d/default.conf.bak

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/index.html || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
