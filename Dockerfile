FROM node:18-alpine
WORKDIR /app

# Copy all files
COPY . .

# Build backend first if needed
RUN cd backend && npm ci --omit=dev && npm run build

# Build frontend
RUN cd frontend && npm ci && npm run build

# Serve built frontend
RUN npm install -g serve

CMD ["serve", "-s", "frontend/dist", "--no-clipboard"]
