# Code Explanation And Requirement Audit

This document explains what was built, where it lives, how the main flow works, and which React state is used.

## Rewritten Prompt

Build a LinkTree-style app where:

- The home page stays intact.
- Users can register/login with Google.
- After login, users reach a private dashboard.
- Users create one public bio link like `/u/username`.
- Users add multiple destination links inside that public bio page.
- Visitors can open the public bio link and click active links.
- Clicks are tracked by the backend.
- Analytics are private and visible only to the logged-in owner.
- A dedicated `/analytics` page shows link performance, top links, and last 7 days activity.

## Requirement Audit

| Requirement | Status | Where |
| --- | --- | --- |
| Register page | Done | `client/src/features/auth/pages/RegisterPage.jsx` |
| Login page | Done | `client/src/features/auth/pages/LoginPage.jsx` |
| Google auth flow | Done | `server/src/features/auth`, `client/src/features/auth` |
| Home page intact | Done | `client/src/features/home` |
| Public testimonials removed from home | Done | Current home page does not expose private analytics |
| Analytics not public | Done | Public page only fetches active links |
| Dedicated analytics page | Done | `client/src/features/analytics/pages/AnalyticsPage.jsx` |
| Backend analytics endpoint | Done | `GET /api/links/analytics` |
| Owner-only analytics | Done | `requireAuth` protects analytics route |
| Total links count | Done | `getUserLinkAnalytics` |
| Link performance stats | Done | `topLinks` in analytics response |
| Last 7 days activity | Done | `weeklyClicks` buckets |
| Graph/chart visualization | Done | `AnalyticsPanel.jsx` |
| Public bio link | Done | `/u/:username` |
| Multiple links in stack | Done | `LinkForm`, `LinkList`, public profile page |
| Backend serves built frontend | Done | `server/src/app.js` serves `client/dist` |
| Vite dev proxy | Done | `client/vite.config.js` proxies `/api` |

## Folder Structure

```txt
client/src/
  app/
    AppRouter.jsx        # Small SPA router
    routes.js            # Route constants

  features/
    auth/                # Login/register/callback/context
    dashboard/           # Private link management dashboard
    analytics/           # Private analytics page
    home/                # Landing page
    publicProfile/       # Visitor-facing /u/:username page

  shared/
    api/                 # fetch helpers
    components/          # reusable UI
    lib/                 # tiny custom router

server/src/
  config/                # env/db/logger
  features/
    auth/                # Google OAuth and token issuing
    links/               # links, public profile, analytics
    user/                # user model and user lookup/update
  shared/                # error handling, auth middleware, utils
```

## Frontend Flow

### Auth

- `AuthPanel.jsx` renders the Google login/register CTA.
- The CTA uses `getGoogleAuthUrl()` from `authApi.js`.
- The browser navigates to `/api/auth/google`.
- Backend completes Google OAuth and redirects to `/auth/callback?accessToken=...`.
- `AuthCallbackPage.jsx` calls `completeGoogleCallback`.
- `AuthContext.jsx` saves the access token and routes the user to `/dashboard`.

### Dashboard

Main file: `client/src/features/dashboard/pages/DashboardPage.jsx`

Dashboard loads three independent pieces in parallel:

- `fetchLinks()` for the user's destination links.
- `fetchLinkAnalytics()` for private dashboard analytics.
- `fetchDashboardProfile()` for the public username and public URL.

Dashboard state:

- `links`: current user's destination links.
- `profile`: public bio profile data, including `username` and `publicUrl`.
- `analytics`: totals, top links, and 7-day click buckets.
- `dashboardLoading`: full dashboard loading state.
- `saving`: link creation loading state.
- `profileSaving`: public username save loading state.
- `dashboardError`: API error shown at the top of dashboard.

### Public Bio Link

Main files:

- `PublicProfileCard.jsx`
- `PublicProfilePage.jsx`

Owner flow:

- User chooses a username in `PublicProfileCard`.
- Backend checks uniqueness.
- Dashboard shows a public URL like `http://localhost:5173/u/username`.
- User can copy this URL into Instagram/YouTube bio.

Visitor flow:

- Visitor opens `/u/:username`.
- Frontend calls `GET /api/links/public/:username`.
- Backend returns profile data and active links only.
- Visitor clicks a link.
- Frontend calls `POST /api/links/:id/click`.
- Backend increments click count and returns the real destination URL.

Why the public API does not return link URLs directly:

- The click endpoint must run before the visitor leaves the app.
- This keeps analytics accurate.

### Analytics Page

Main file: `client/src/features/analytics/pages/AnalyticsPage.jsx`

State:

- `analytics`: private analytics data.
- `pageLoading`: analytics page loading state.
- `pageError`: page-level API error.

The page uses `loadCurrentUser()` before loading analytics. If the user is not logged in, it shows `Login required`.

## Backend Flow

### Auth Middleware

File: `server/src/shared/middlewares/auth.middleware.js`

`requireAuth` supports:

- Passport session user.
- Bearer access token from frontend.

This keeps Google redirect login and later API requests working together.

### Links

Files:

- `link.routes.js`
- `link.controller.js`
- `link.service.js`
- `link.repository.js`
- `link.validation.js`
- `link.model.js`

Layer responsibility:

- Routes define HTTP endpoints.
- Controllers parse request data and return responses.
- Services hold business logic.
- Repositories talk to MongoDB.
- Validation keeps external input safe.

### Analytics

Endpoint:

```txt
GET /api/links/analytics
```

Protected by:

```txt
requireAuth
```

The backend uses the logged-in user ID from `req.user`, so a user cannot ask for another user's analytics by changing a URL parameter.

### Public Profile

Endpoint:

```txt
GET /api/links/public/:username
```

Returns:

- Public profile data.
- Active links only.

Does not return:

- Analytics.
- Inactive links.
- Owner-only dashboard metadata.

## State Management Choice

The app uses React Context for auth and local component state for feature pages.

Why Context:

- Auth state is shared across header, dashboard, callback, and logout.

Why local state:

- Dashboard links, analytics, and profile data are page-specific.
- Redux would add extra complexity for this current scope.

## Functionality Check Summary

No core assignment functionality is intentionally left out.

Current implemented flow:

1. Visitor opens home page.
2. User logs in/registers with Google.
3. Backend creates or loads the user.
4. User reaches dashboard.
5. User creates public bio URL.
6. User adds multiple destination links.
7. Visitor opens public URL.
8. Visitor sees active links.
9. Visitor click is tracked.
10. User opens `/analytics` to see private analytics.

## Interview Angle

This project demonstrates:

- Feature-based architecture.
- OAuth redirect handling.
- Protected API routes.
- Public/private data separation.
- React state separation by ownership.
- Backend controller/service/repository layering.
- SPA fallback serving from Express.
