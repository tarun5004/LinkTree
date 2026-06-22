# LinkTree Clone

A feature-based LinkTree-style app with Google OAuth, public bio pages, link management, and private analytics.

## What This App Does

- Users sign in with Google.
- Each user creates one public bio URL like `/u/yourname`.
- Inside the dashboard, the user adds multiple destination links.
- Visitors open the public bio URL and see only active links.
- Link clicks are tracked by the backend.
- Analytics stay private inside the user's dashboard.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: Passport Google OAuth + JWT access token + refresh cookie
- Validation: Zod

## Folder Structure

```txt
client/
  src/
    app/                 # SPA routes
    features/
      auth/              # login, register, callback, auth context
      dashboard/         # private dashboard, public URL setup, analytics
      home/              # landing page
      publicProfile/     # visitor-facing /u/:username page
    shared/
      api/               # frontend API helpers
      components/        # shared UI components

server/
  src/
    config/              # env, db, logger
    features/
      auth/              # Google OAuth routes and token flow
      links/             # links, public profile, analytics
      user/              # user model and user services
    shared/              # middleware, handlers, utilities
```

## Local Setup

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Create `server/.env`:

```env
PORT=8000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:5173
LOGGER_LEVEL=info
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

JWT_ACCESS_SECRET=use_a_long_random_secret
JWT_REFRESH_SECRET=use_a_long_random_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d
SESSION_SECRET=use_a_long_random_secret

CLIENT_REDIRECT_URL=http://localhost:5173
```

## Google OAuth Setup

In Google Cloud Console, set:

```txt
Authorized JavaScript origins:
http://localhost:5173

Authorized redirect URIs:
http://localhost:8000/api/auth/google/callback
```

## Run In Development

Start backend:

```bash
cd server
npm run dev
```

Start frontend:

```bash
cd client
npm run dev
```

Open:

```txt
http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:8000`, so frontend API calls can use same-origin `/api` paths.

## Build And Serve From Backend

Build the frontend:

```bash
cd client
npm run build
```

Start the backend:

```bash
cd ../server
npm start
```

Open:

```txt
http://localhost:8000
```

Express serves `client/dist` when it exists. This supports SPA routes like `/dashboard`, `/auth/callback`, and `/u/:username`.

## Important Routes

Frontend:

```txt
/                 Landing page
/login            Login page
/register         Register page
/dashboard        Private dashboard
/u/:username      Public bio page
```

Backend:

```txt
GET    /api/auth/google
GET    /api/auth/google/callback
GET    /api/auth/me
POST   /api/auth/logout

GET    /api/links
POST   /api/links
GET    /api/links/profile
PATCH  /api/links/profile
GET    /api/links/public/:username
GET    /api/links/analytics
PATCH  /api/links/:id
DELETE /api/links/:id
POST   /api/links/:id/click
```

## Checks

Frontend:

```bash
cd client
npm run lint
npm run build
```

Backend syntax check:

```bash
cd server
Get-ChildItem -Path src -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
```

## Production Notes

- Set `CLIENT_REDIRECT_URL` to the deployed frontend origin.
- Set `GOOGLE_CALLBACK_URL` to the deployed backend callback URL.
- Add production origins and redirect URIs in Google Cloud Console.
- Build `client/dist` before starting the backend if Express should serve the app.
