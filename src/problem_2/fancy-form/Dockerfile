# Stage 1: Build the Vite project
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to take advantage of caching
COPY package.json yarn.lock ./

# Install dependencies safely
RUN yarn install --frozen-lockfile

# Copy the remaining source files
COPY . .

# Build the project
RUN yarn build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built files from the previous stage
COPY --from=builder /app/dist ./

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
