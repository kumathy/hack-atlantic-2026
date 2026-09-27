# <p align="center">Thorpe Watch</p>

<p align="center">
    Tracking truck strikes at the overpass of the Bill Thorpe Walking Bridge in Fredericton, NB
</p>

<img width="1565" height="1420" alt="screenshot_20260927_031317" src="https://github.com/user-attachments/assets/b0aeec7d-2d00-4462-ad65-819bb3ff3416" />


<p align="center">This project was built for
    <a href="https://hack-atlantic-sep27.devpost.com/">
    Hack Atlantic 2026
    </a>
</p>

<p align="center">
    Trucks keep getting stuck under the overpass of the Bill Thorpe Walking Bridge on Waterloo Row and became kind of a meme. Thorpe Watch counts the days since the last hit, switches to a live road closure view when         a vibration sensor on the bridge detects a new one, emails subscribers, and keeps a public timeline of past incidents.
</p>

<p align="center">
    Built with Next.js, TypeScript, Tailwind CSS, Leaflet,Python, Flask, SQLite and Supabase.
</p>

## Table of Contents

- [Project Structure](#project-structure)
- [Team](#team)
- [Running Locally](#running-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Project Structure

```bash
.
├── backend/
│   ├── app.py                  # Flask API and monitor
│   ├── data_taken.py           # Detected impacts
│   ├── profiles_database.py    # Email subscribers
│   ├── notification_service.py # Impact alerts
│   ├── email_service.py        # Email sending
│   ├── supabase_client.py      # Supabase connection
│   └── requirements.txt        # Python dependencies
└── frontend/
    ├── app/
    │   ├── page.tsx            # Homepage
    │   ├── timeline/page.tsx   # Incident timeline
    │   ├── layout.tsx          # Root layout
    │   └── globals.css         # Colours and themes
    ├── components/             # UI components
    └── lib/                    # Data and helpers
```

## Team

- **Anh Tran** (Frontend) - [@kumathy](https://github.com/kumathy)
- **Kristyn Le** (Frontend) - [@kristynle0608](https://github.com/kristynle0608)
- **Nguyen Thanh Khoi Tran** (Backend) - [@NguyenThanhKhoiTran](https://github.com/NguyenThanhKhoiTran)
- **Xuan Phat Phan** (Hardware) - [@XuanPhat2008](https://github.com/XuanPhat2008)

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v20.9 or higher
- [Python 3](https://www.python.org/downloads/)
- npm
- A Supabase project with a `bridge_status` table (row `id = 1` with `status`, `impact_time` and `acknowledged` columns)
- An SMTP account for sending emails

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/kumathy/thorpe-watch.git && cd thorpe-watch
```

#### 2. Start the backend

From the project root, create a virtual environment and install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_EMAIL=you@example.com
SMTP_PASSWORD=your-smtp-password
```

Start the server:

```bash
python app.py
```

This starts the API at `http://127.0.0.1:5000` and the bridge monitor in the background.

#### 3. Start the frontend

In a separate terminal, from the project root:

```bash
cd frontend && npm install
npm run dev
```

Open `http://localhost:3000`. The frontend expects the backend at `http://127.0.0.1:5000`.

To preview the live incident view without triggering the sensor, open `http://localhost:3000/?view=incident` (development only).
