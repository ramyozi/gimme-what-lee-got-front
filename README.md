# Gimme What Lee Got – Frontend

This is the **frontend React app** for **Gimme What Lee Got**, built with **React + TypeScript + Vite**.
It provides the interactive UI and consumes the Django REST API.
---

## 🚀 Tech Stack

- **React 19 + TypeScript**
- **Vite** (dev server & bundler)
- **Axios** – API calls
- **Ant Design / Bootstrap** – UI components
- **React Router** – routing & navigation

---

## ⚙️ Setup & Run Locally

### 1) Clone the repository

```bash
git clone https://github.com/ramyozi/gimmewhatleegot-frontend.git
cd gimmewhatleegot-frontend
```

### 2) Install dependencies

```bash
git clone https://github.com/ramyozi/gimmewhatleegot-frontend.git
cd gimmewhatleegot-frontend
```

### 3) Configure environment

Create a `.env` file in the project root based on `.env.example`:
```bash
VITE_API_URL=http://127.0.0.1:8000/api
```

### 4) Run frontend

```bash
npm run dev
```

Frontend will be available at: [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Project Structure

```
gimmewhatleegot-frontend/
├── src/
│   ├── pages/       # React pages
│   ├── layouts/     # Shared layouts (nav, etc.)
│   ├── services/    # Axios API calls
│   ├── router.tsx   # React Router config
│   ├── App.tsx
│   └── main.tsx
└── package.json

```

