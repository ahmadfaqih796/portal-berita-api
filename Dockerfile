# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose a port (jika diperlukan)
EXPOSE 3000

# Command to run the application
CMD [ "node", "app.js" ]