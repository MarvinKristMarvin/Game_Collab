# Stage 1: Build the frontend assets
FROM node:18-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend for production
RUN npm run build

# Stage 2: Serve the built frontend using a lightweight web server
FROM nginx:alpine

# Copy built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]

# Build and Run Commands ()
# 1. Build the Docker Image (from frontend folder)

# docker build -t frontend-image .

# 2. Run the Docker Container

# docker run -d --name frontend-container -p 3000:80 frontend-image

#     Replace 3000 with your preferred local port if needed.