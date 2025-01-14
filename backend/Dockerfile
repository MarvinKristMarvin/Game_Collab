# Use the official Node.js image as the base image
# Alpine is lightweight, but for simplicity with native dependencies, we'll use the slim version
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the application port
EXPOSE 5000

# Set environment variables (optional but useful for production defaults)
# Remove dangerous env variables from Dockerfile ENV variables
ENV NODE_ENV=development

# Command to run the application
CMD ["npm", "start"]

# 1. Build the Docker Image

# docker build -t backend-image .

# 2. Run the Docker Container

# docker run -d --name backend-container \
#   -p 5000:5000 \
#   --env-file .env \
#   backend-image
