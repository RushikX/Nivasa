FROM node:18-alpine

# Set work directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies (no cache mount used here)
RUN npm install --omit=dev


# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Serve with a simple static server
RUN npm install -g serve

CMD ["serve", "-s", "dist", "--no-clipboard"]
