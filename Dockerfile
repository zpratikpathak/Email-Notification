# Use a smaller Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy the rest of the project files to the working directory
COPY . .
COPY .env .env

# Expose a port (if your Node.js app listens on a specific port)
EXPOSE 3005

# Start the Node.js application
CMD [ "npm", "start" ]