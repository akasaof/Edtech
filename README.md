# Edtech

A full-stack learning platform for a coding bootcamp. Students log in with their phone number and a one-time code, follow a week-by-week curriculum (videos, cheatsheets, exams), practise from a question bank, and browse a job board. Admins log in with a password and manage students, questions, and job postings.

The project is a React single-page app (`edtech/`) talking to a Node.js/Express REST API (`server/`) backed by MongoDB.

## Features

**Students**
- **Phone + OTP login** – enter a 10-digit mobile number, then the 4-digit OTP.
- **Home** – your weekly schedule: pick a week and see its videos, cheatsheets, and exams.
- **Journey** – a card for every week of the course; click one to jump to that week.
- **Question Bank** – all practice questions with difficulty badges (easy / medium / hard) and a filter for weeks 1–12.
- **Job Board** – open roles with company, title, and description.

**Admins**
- **User management** – list, add, edit, and delete students.
- **Question bank management** – add, edit, and delete questions.
- **Job board management** – add, edit, and delete job postings.
- Admins sign in with a password (bcrypt-hashed) instead of an OTP.

## Tech stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7, Redux Toolkit, Axios, Bootstrap 5 + Bootstrap Icons, CSS Modules |
| Backend | Node.js (ES modules), Express 5, Mongoose 9, JSON Web Tokens, bcrypt, Multer, CORS, dotenv |
| Database | MongoDB |

## Project structure

```
.
├── edtech/                      # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx              # Routes
│       ├── main.jsx             # Entry point, Redux provider
│       ├── pages/               # login, home, journey, questionBank, jobBoard
│       ├── adminAcess/          # Admin screens: userManagement, QbManagement,
│       │                        #   jobManagement, and formsComp/ (add/edit forms)
│       ├── component/           # nav.jsx, sidebar.jsx
│       ├── redux/               # store.js and slices (userinfo, sampleSlice)
│       └── uploads/             # Week/course images used by the UI
└── server/                      # Express API
    ├── server.js                # App setup and all routes
    ├── config/dbconfig.js       # MongoDB connection
    ├── models/                  # account, courses, questionBank, jobBoard
    ├── controllers/             # OTP, question filtering, admin CRUD operations
    ├── middleware/              # auth, authentication, otpgen, hashing
    ├── uploads.js               # Multer image upload config
    └── uploads/                 # Uploaded course images (served at /uploads)
```

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended for Vite) and npm
- A MongoDB database (local, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string)

### 1. Clone

```bash
git clone https://github.com/akasaof/Edtech.git
cd Edtech
```

### 2. Backend

```bash
cd server
npm install
```

Create `server/.env`. The variable names are lowercase and must match exactly:

```env
url=mongodb://localhost:27017/edtech
port=1000
```

| Variable | Description |
| --- | --- |
| `url` | MongoDB connection string |
| `port` | Port the API listens on. **Use `1000`**: the frontend calls `http://localhost:1000` |

Start the API (uses nodemon, so it restarts on changes):

```bash
npm start
```

Run it from inside `server/`, because the `.env` file and the `uploads/` folder are resolved relative to the current directory.

### 3. Frontend

```bash
cd edtech
npm install
npm run dev
```

Open the URL Vite prints (normally http://localhost:5173).

Other scripts: `npm run build` (production build), `npm run preview` (serve the build), `npm run lint`.

### 4. Create your first accounts

There is no sign-up page or seed script. Accounts live in the `accounts` collection, and the first admin has to be inserted directly (with MongoDB Compass, `mongosh`, etc.).

**Admin** – generate a bcrypt hash from the `server/` folder:

```bash
node -e "require('bcrypt').hash('choose-a-password', 10).then(console.log)"
```

then insert:

```json
{ "phone": 9876543210, "name": "Admin", "role": "Admin", "password": "<the bcrypt hash>" }
```

Log in with that phone number and the password. From the admin panel you can add students.

**Students** – create them from **User Management** in the admin panel (or insert documents with `"role": "Student"`). Students log in with their phone number and OTP.

### 5. Add course content

Weekly content is stored in the `courses` collection (one document per week). Add documents with the fields below directly in MongoDB; there is currently no admin screen for courses (see [Known issues](#known-issues)).

## Data model

| Collection (Mongoose model) | Fields |
| --- | --- |
| `accounts` (`Account`) | `phone` (Number), `name`, `role` (`"Student"` or `"Admin"`), `Fees`, `Otp` (Number), `password` |
| `courses` (`course`) | `weekNo` (Number), `title`, `videoa` (Array), `cheatsheets` (Array), `exams` (Array), `image` (filename) |
| `qbs` (`QB`) | `week` (Number), `title`, `difficulty`, `status` |
| `jobs` (`job`) | `jobTitle`, `jobDesc`, `jobComp`, `count` (Number) |

## How authentication works

1. `POST /otp` with the phone number. The server finds the account and, for students, generates a 4-digit OTP and stores it on the account. It returns a JWT (valid for 1 day) plus the account record.
2. `POST /login` with the JWT and the OTP (students) or password (admins). The server checks the OTP against the stored value for students, and the bcrypt hash for admins.
3. The frontend keeps the token in browser storage (local and session storage). Admin API calls send it in the `authorization` header (the raw token, no `Bearer ` prefix), and the server rejects any non-admin.

> **No SMS is sent.** The OTP is generated and stored, but no SMS provider is integrated.

## API reference

Base URL: `http://localhost:1000`

### Public

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/otp` | Body `{ number }`. Starts login, returns `{ result, token }` |
| `POST` | `/login` | Body `{ password, token }`. Returns `true` / `false` |
| `GET` | `/getData` | All weekly course documents |
| `GET` | `/getData/:week` | One week, e.g. `/getData/Week-3` |
| `GET` | `/getqb` | All questions |
| `POST` | `/getfilterqb` | Body is an array like `["week-1", "week-3"]`. Returns matching questions |
| `GET` | `/jobBoard` | Returns `{ jobs }` |
| `GET` | `/uploads/<file>` | Uploaded course images |
| `POST` | `/upload` | Multipart form: `image` file + `id` (course id). Attaches an image to a course |

### Admin (header `authorization: <token>`, admin role required)

All admin routes are `POST /<resource>/<operation>` with the operation's data in the JSON body.

| Route | Operations |
| --- | --- |
| `/User/:operation` | `get` (students), `create` (`{ account }`), `update` (`{ id, changes }`), `delete` (`{ account: id }`) |
| `/Qb/:operation` | `get`, `getById` (`{ id }`), `create`, `update` (`{ id, changes }`), `delete` (`{ id }`) |
| `/JobBoard/:operation` | `get`, `getById` (`{ id }`), `create`, `update` (`{ id, changes }`), `delete` (`{ id }`) |
| `/course/:operation`, `/Admincourse/:operation` | `get`, `getbyid` (`{ id }`), `create`, `update` (`{ id, changes }`), `delete` (`{ id }`) |

## Known issues

- **Course management UI is disabled.** The course admin form and its API exist, but the routes are commented out in `edtech/src/App.jsx`.
- **Course field name.** The model stores videos in `videoa`, while the Home page reads `videos`. The two need to match for videos to appear.
- **API URL is hardcoded.** The frontend uses `http://localhost:1000` throughout; deploying elsewhere means changing it in each file (or moving it to a Vite env variable).
- **"Apply Now" on the Job Board** is a placeholder and does nothing yet.

## Before deploying to production

- Move the hardcoded JWT secret (used in `server/middleware/` and `server/controllers/otpGenerator.js`) into an environment variable.
- Integrate an SMS provider for OTPs, and don't return the account record (which includes the OTP) from `/otp`.
- Protect `/upload` and `/hashAdmin` with the admin check; they currently have none.
- Add `.gitignore` files and stop tracking `node_modules/` and `server/.env`. If that `.env` holds real database credentials, rotate them.
- Restrict CORS to your frontend's origin.
