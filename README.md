# Nano's Golf Scorecard

Nano's Golf Scorecard is a simple, modern web application for tracking golf scores. It allows you to record strokes for each hole and view your total score. The app is built with React, TypeScript, and Vite for the frontend, and Flask for the backend API.

---

## Features

- **Scorecard:** Enter strokes for each hole and view your total score.
- **Extensible:** Ready for future features like user management, multiplayer, and advanced scoring.

---

## Project Structure

```
scorecard/
├── scorecard-webapp/   # React + TypeScript frontend
├── scorecard-api/      # Flask backend API
└── README.md           # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python](https://www.python.org/) (v3.10+ recommended)
- [pip](https://pip.pypa.io/en/stable/)
- [venv](https://docs.python.org/3/library/venv.html) for Python virtual environments

---

### 1. Clone the Repository

```sh
git clone https://github.com/rognoni-ignacio/scorecard.git
cd scorecard
```

---

### 2. Setup and Run the Backend API

```sh
cd scorecard-api
python -m venv venv
# Activate the virtual environment (Windows)
venv\Scripts\activate
# Or (Mac/Linux)
source venv/bin/activate

pip install -r requirements.txt

# Run the Flask API
set FLASK_APP=api/index.py      # Windows
export FLASK_APP=api/index.py   # Mac/Linux

flask run
```

The API will be available at [http://localhost:5000/api](http://localhost:5000/api).

---

### 3. Setup and Run the Frontend Web App

```sh
cd scorecard-webapp
npm install

# Start the development server
npm run dev
```

The web app will be available at [http://localhost:5173](http://localhost:5173).

---

## Configuration

- **API URL:** The frontend uses an environment variable `VITE_API_URL` to connect to the backend.  
  Edit `.env` in `scorecard-webapp` if your API runs on a different host or port.

---

## Deployment

- The app is ready for deployment on platforms like Vercel, Netlify, or GitHub Pages for the frontend.
- The backend can be deployed to services like Heroku, Vercel (Serverless), or any cloud provider supporting Python/Flask.

---

## Acknowledgements

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---
