# Base image: Node.js 18 on Alpine Linux (lightweight, production-ready)
FROM node:18-alpine

# Set working directory inside the container where all commands will execute
WORKDIR /src

# Copy package.json and package-lock.json (if exists) from host to container
COPY package*.json ./

# Install all project dependencies listed in package.json
RUN npm install

# Copy entire project source code from host machine to container
COPY . .

# Build the NestJS application for production
RUN npm run build

# Expose port 3000 to allow external traffic
EXPOSE 3000

# Set the default command to start the application in production mode
CMD ["npm", "run", "start:prod"]
