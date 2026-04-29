# Use Node.js LTS version as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (only production for smaller size, but we need Vite to build first)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port Cloud Run expects
EXPOSE 8080

# Define the environment variable to run server in production mode
ENV NODE_ENV=production

# Start the Express server
CMD ["npm", "start"]
