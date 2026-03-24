# 🚀 Smart Grocery Basket

Full-stack web application that helps users optimize grocery shopping by comparing prices across stores and generating recipes based on selected products.

The project combines backend price analysis, user basket logic, authentication, and AI-powered recipe generation.

---

## 🎯 Problem

Grocery shopping is often inefficient:

- Prices vary across stores  
- Hard to find the cheapest option for a full basket  
- Users often don’t know what to cook  

This project solves these problems by:

- Comparing basket prices across stores  
- Suggesting the cheapest store  
- Generating recipes based on selected items  

---

## 💡 Key Features

### 🛒 Smart Basket
- Add products to a basket  
- Calculate total cost across multiple stores  
- Identify the cheapest store  

---

### 📊 Price Comparison
- Backend calculates basket prices  
- Supports overlapping products  
- Uses latest pricing data  

---

### 🔐 Authentication & User Profile
- User login system  
- AI available only for logged-in users  
- Save generated recipes to profile  
- Access saved recipes later  

---

### 🍳 Recipe System
- Predefined recipes with ingredient mapping  
- Ingredients linked to real products  
- Add all ingredients to basket in one click  

---

### 🤖 AI Recipe Generation
- Generate recipes based on basket  
- Uses OpenAI API  
- Returns structured output (ingredients + steps)  

---

## 🛠️ Tech Stack

### Backend
- Java 21  
- Spring Boot  
- REST API  
- Maven  

### Database
- PostgreSQL (Docker)

### Frontend
- Vue 3  
- Vite  
- Node.js  

### Infrastructure
- Docker  
- Docker Compose  
- .env configuration  

---

## 🧱 Project Structure
smart-grocery-web/
│
├── client/
├── grocery-backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

---

## ▶️ Live Demo

🔗 [Add your deployed link here]

⚠️ If the site was inactive (~15 minutes), the server may sleep.  
Please wait 1–3 minutes for it to restart.

---

## ⚙️ How to Run Locally

### Requirements
- Docker Desktop  
- Git  

### Steps
git clone https://github.com/cherriesc/smart-grocery-web.git
cd smart-grocery-web
docker compose up --build

Backend:
http://localhost:8080

Frontend:
cd client
npm install
npm run dev

Open:
http://localhost:5173

---

## 🔌 Backend API

### Get productsGET /products

### Get storesGET /stores

### Compare basketPOST /basket/compare

Example:
{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}

---

## 🗄️ Database

- PostgreSQL in Docker  
- Database name: grocery  
- Seeded with sample data  

---

## 👨‍💻 My Role

- Backend architecture design  
- REST API implementation  
- Basket price logic  
- AI integration (OpenAI)  
- Database design (PostgreSQL)  
- Docker setup  

---

## 👥 Team

- Backend: Me  
- Frontend: Team members (Vue, UI/UX, integration)

---

## 📸 Screenshots

(Add screenshots here)

---

## 📄 License

Educational and demonstration purposes.
