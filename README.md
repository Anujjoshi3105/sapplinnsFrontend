# 🌱 Sapplinns – Empowering Farmers with Precision Technology

**Grow smarter, greener, and more resilient with Sapplinns.**  
Sapplinns is an intelligent AgriTech platform designed to support sustainable and organic farming through advanced monitoring, smart crop prediction, and data-driven tools. Built with a focus on accessibility and scalability, it offers tailored solutions for farmers of all sizes.

## [Live Demo](https://sapplinns.netlify.app/)

![sapplinn](https://github.com/user-attachments/assets/a3c13004-d586-4a40-a63a-eda011dc8e23)

---

## 🛠 Tech Stack

| Tech          | Role                                            |
|---------------|-------------------------------------------------|
| **Next.js**   | Frontend framework with dynamic routing and SSR |
| **FastAPI**   | High-performance Python backend/API             |
| **Tailwind CSS** | Utility-first CSS for responsive UI         |
| **Framer Motion** | Page and component animations               |
| **Rate Limiting** | Protect APIs from overuse (via FastAPI middleware) |

---

## 🌿 Features

- 🚜 **Smart Crop Prediction** using soil nutrients, weather, and environmental data
- 🌦 **Sensor-based Monitoring** for pH, temperature, humidity, rainfall, and nutrients
- 🌾 **Farming Plans** for small to enterprise farms with tiered features
- 🧪 **Real-time Health Insights** with nitrogen, phosphorus, potassium analysis
- 📈 **AI-powered Analysis & Forecasting** for optimized decision-making
- 🧠 **Pest & Disease Alerts** customized by crop and region
- 💌 **Email Subscription & Contact Forms** for user engagement
- 🌍 **Sustainable & Organic Focus** with community-driven farming methods
- 🔒 **API Rate Limiting** for secure, efficient backend usage

---

## 📁 Project Structure

```

sapplinns/
├── frontend/                # Next.js app
│   ├── pages/              # Routes (index, about, contact, plans, etc.)
│   ├── components/         # UI components (Navbar, Cards, Forms)
│   ├── styles/             # Tailwind CSS and global styles
│   └── public/             # Static assets (images, icons)
│
├── backend/                # FastAPI backend
│   ├── main.py             # FastAPI entry point
│   ├── routes/             # API endpoints (predict, monitor, plans)
│   ├── models/             # Pydantic models and validation
│   ├── services/           # Crop prediction logic and AI modules
│   └── middleware/         # Rate limiting logic
│
└── README.md

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sapplinns.git
cd sapplinns
````

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

### 3. Setup Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# API runs on http://localhost:8000
```

---

## 🔐 API Security & Rate Limiting

To prevent abuse, Sapplinns backend uses FastAPI middleware to:

* Limit requests per IP using time-based quotas
* Return 429 responses if thresholds are exceeded
* Allow safe retry headers for compliant clients


## 📄 License

This project is developed for educational, research, and sustainable agricultural use. Commercial licensing is available upon request.

---

## ✨ Credits

Built with 💚 by [Anuj Joshi](https://github.com/Anujjoshi3105) and contributors
Inspired by the vision of transforming Indian agriculture with tech innovation.
