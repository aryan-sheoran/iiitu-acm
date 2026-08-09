# IIIT Una ACM Student Chapter Website

A lightweight, solid-colored, clean, and dynamic website built for the IIIT Una ACM Student Chapter.

## Features
- **Homepage**: Dynamically-populated Hero Carousel, Faculty Sponsor section, and Student Chairman section.
- **Executive Team**: Clean grid of profile cards for Executive Heads with social links.
- **Chapter Members**: Dynamic roster of members with standard search/filtering.
- **Admin Panel (`/admin`)**: Fully functional dashboard to login and perform CRUD operations on carousel slides, sponsor/chairman messages, executive officers, and members.
- **Lightweight Design**: Solid, minimal colors matching the IIIT Una and ACM brand palettes (No unnecessary gradients or heavy effects).

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS (v4)
- **Backend**: Node.js, Express, Mongoose, MongoDB
- **Auth**: JWT (JSON Web Tokens), bcryptjs

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or on a cloud instance (e.g. MongoDB Atlas)

### Setup & Run

#### 1. Start MongoDB Server
Ensure MongoDB is running locally on `mongodb://localhost:27017` or prepare your connection string.

#### 2. Run Backend Server
```bash
cd server
npm install
npm run dev
```
*The server will start on port `5000`.*
*By default, if the database is empty, the server automatically seeds two carousel slides, a Faculty Sponsor message, a Student Chairman message, and a default admin user:*
- **Username**: `admin`
- **Password**: `admin123`

#### 3. Run Frontend Client
In a separate terminal:
```bash
cd client
npm install
npm run dev
```
*The client dev server will run on port `5173` (or the next available port) and proxy API requests to `http://localhost:5000` automatically.*
