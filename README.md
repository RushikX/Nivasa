# 🏢 Nivasa — Apartment Administration System

A **modern, full-stack web application** for managing apartment communities, built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Live Demo

> 🔗 [https://nivasa-production-7aa9.up.railway.app](https://nivasa-production-7aa9.up.railway.app)

---

## 📚 Table of Contents

- [✨ Features](#✨-features)
- [🛠️ Tech Stack](#🛠️-tech-stack)
- [📁 Project Structure](#📁-project-structure)
- [🧑‍💻 Getting Started (Local)](#🧑‍💻-getting-started-local)
- [☁️ Deployment (Railway)](#☁️-deployment-railway)
- [🔑 Environment Variables](#🔑-environment-variables)
- [🔌 API Overview](#🔌-api-overview)
- [🛠️ Customization](#🛠️-customization)
- [🤝 Contributing](#🤝-contributing)
- [📄 License](#📄-license)

---

## ✨ Features

### 🧑‍💼 Tenants
- Create and track maintenance tickets  
- View ticket status and history  
- View and contact neighbors  
- See maintenance payment history  

### 🧑‍💼 Admins
- Real-time dashboard with ticket stats  
- Manage tenants and technicians  
- Approve/reject maintenance payments  
- Set maintenance fees and bank details  

### ⚙️ General
- Role-based dashboards (Admin/Tenant/Technician)  
- Responsive UI (desktop & mobile)  
- Real-time notifications (toasts)  
- Secure authentication (JWT)  

---

## 🛠️ Tech Stack

| Layer        | Tech                                       |
| ------------ | ----------------------------------------- |
| **Frontend** | React (Vite + TypeScript), Tailwind CSS, shadcn/ui, React Query |
| **Backend**  | Node.js, Express.js, Mongoose             |
| **Database** | MongoDB (local or MongoDB Atlas)          |
| **Deployment** | Railway                                 |
| **Icons**    | Lucide React                              |

---

## 📁 Project Structure

```
Nivasa/
├── backend/       # Express API & MongoDB models
│   ├── models/
│   ├── routes/
│   ├── public/    # Serves frontend build
│   └── server.js
├── frontend/      # React + Vite app
│   ├── src/
│   ├── public/
│   └── ...
├── README.md
```

---

## 🧑‍💻 Getting Started (Local)

### Backend
```bash
cd backend
npm install
# Create a .env file as described below
npm run dev
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev
```

✅ Visit: [http://localhost:8080](http://localhost:8080)

---

## ☁️ Deployment (Railway)

1. Push your code to GitHub.  
2. Go to [Railway](https://railway.app), create a new project, and link your repo.  
3. Set environment variables as described below.  
4. Railway will auto-deploy and give you a public URL.  

---

## 🔑 Environment Variables

**Backend (`backend/.env`):**
```ini
MONGO_URI=your-mongodb-connection-string
NODE_ENV=production
PORT=8080
```

**Frontend (`frontend/.env.production`):**
```ini
VITE_API_URL=https://your-railway-url.up.railway.app
```

---

## 🔌 API Overview

### 🔐 Auth
- `POST /api/auth/register-apartment`
- `POST /api/auth/signup-admin`
- `POST /api/auth/signup-resident`
- `POST /api/auth/login`
- `POST /api/auth/validate`

### 🎫 Tickets
- `POST /api/auth/new-complaint`
- `GET /api/auth/all-complaint`
- `PUT /api/auth/update-complaint/:id`
- `GET /api/auth/stats/:apartmentCode`

### 💵 Maintenance
- `POST /api/auth/maintenance/amount`
- `GET /api/auth/maintenance/amount`
- `POST /api/auth/maintenance/payment`
- `GET /api/auth/maintenance/payments`
- `GET /api/auth/maintenance/my-payments`
- `POST /api/auth/maintenance/bank-details`
- `GET /api/auth/maintenance/bank-details`
- `PATCH /api/auth/maintenance/payment/:id/status`

### 🧑‍🔧 Technicians
- `GET /api/all-technicians`
- `POST /api/add-technicians`
- `PATCH /api/technicians/:id/status`
- `PUT /api/technicians/:id`
- `DELETE /api/technicians/:id`

---

## 🛠️ Customization

- **Add ticket categories:** Edit `frontend/src/components/CreateTicketForm.tsx`.  
- **Modify roles or permissions:** Update the user model and dashboard routing.  
- **Theme customization:** Adjust `tailwind.config.ts` and `frontend/src/index.css`.  

---

## 🤝 Contributing

Pull requests are welcome!  
Please open an issue first to discuss major changes.

---

## 📄 License

---

**Built with ❤️ for apartment communities.**
