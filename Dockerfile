FROM node:18-alpine
WORKDIR /app

COPY . .

# 1️⃣ Build frontend
RUN cd frontend && npm ci && npm run build

# 2️⃣ Build backend
RUN cd backend && npm ci --omit=dev && npm run build

# 3️⃣ Install serve globally
RUN npm install -g serve

# 4️⃣ Serve the frontend dist
CMD ["serve", "-s", "frontend/dist"]
