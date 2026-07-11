# Use a lightweight Node base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json first to leverage Docker build cache
COPY package.json ./

# Install packages
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Vite development server port (configured to 3000 in vite.config.js)
EXPOSE 3000

# Start Vite dev server in host mode
CMD ["npm", "run", "dev"]
