# Profile Management Application

A Profile Management app built with **React**, **TypeScript**, **Redux Toolkit**, **React Router**, and **Material UI (MUI)**.  
It supports creating, updating, viewing, and deleting a user profile with validation, routing, error handling, and localStorage persistence.

---

## Tech Stack

- React + TypeScript (Vite)
- Redux Toolkit & React Redux
- React Router DOM
- Material UI (MUI)
- LocalStorage
- Mock API (Promise-based)
- Environment variables (`VITE_API_BASE_URL`)

---

## Features

- **Profile Form**
  - First Name (required, min 3 characters)
  - Last Name (optional)
  - Email (required, must be valid email)
  - Age (optional, must be a valid positive number if provided)
  - Client-side validation with clear error messages

- **Profile Display**
  - Shows first name, last name, email, and age
  - Shows message if no profile exists and button to create one

- **Edit & Delete**
  - Edit profile (form is pre-filled when profile exists)
  - Delete profile with confirmation dialog
  - After delete, profile data is removed from Redux and localStorage

- **Global State (Redux Toolkit)**
  - `profileSlice` manages:
    - `data` (profile)
    - `loading`
    - `error`
  - Async thunks for:
    - `fetchProfile` (GET)
    - `saveProfile` (POST/PUT)
    - `removeProfile` (DELETE)

- **Routing (React Router)**
  - `/profile-form` – Create / Edit Profile
  - `/profile` – View Profile
  - `/404` – Custom 404 page
  - `*` – Redirects to `/404`
  - `/` – Redirects to `/profile`

- **Navbar**
  - Shown on all pages
  - Buttons for:
    - **Create/Edit Profile** (goes to `/profile-form`)
    - **Profile** (goes to `/profile`)
  - Displays user’s **FirstName LastName** when profile exists, otherwise “No Profile”

- **Persistence / Mock API**
  - Data is stored in **localStorage** so it survives page refreshes
  - Mock API functions simulate:
    - `createOrUpdateProfile`
    - `getProfile`
    - `deleteProfile`
  - Artificial delay + random failure added to test error handling
  - Error messages (server errors, 404, etc.) are shown using MUI `Alert`

- **Environment Variables**
  - `.env.development` and `.env.production` define:
    - `VITE_API_BASE_URL`
  - `mockProfileApi.ts` reads:  
    `const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";`
  - This allows easily switching between dev and prod API base URLs.

- **Styling**
  - Fully styled with Material UI
  - Custom modern gradient theme using MUI `ThemeProvider`
  - Responsive and clean layout

---

## Project Structure (Important Files Only)

src/
├── api/
│ └── mockProfileApi.ts
├── components/
│ └── Navbar.tsx
├── pages/
│ ├── ProfileFormPage.tsx
│ ├── ProfilePage.tsx
│ └── NotFoundPage.tsx
├── store/
│ ├── store.ts
│ └── profileSlice.ts
├── types/
│ └── profile.ts
├── App.tsx
├── App.css
├── index.css
├── main.tsx

---

# ⚙ Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/akhileshnuth/profile-management-app

2️⃣ Navigate to project folder
cd profile-management-app

3️⃣ Install dependencies
npm install

4️⃣ Start the app
npm run dev

5️⃣ Visit in browser

http://localhost:5173

Application Routing
Route	Page
/	Redirect → /profile
/profile-form	Create / Edit Profile
/profile	View Saved Profile
/404	Not Found Page
*	Wildcard → /404

Form Validation Rules
Field	Rule
First Name	Required, min 2 chars
Last Name	Required
Email	Required, must be valid email
Age	Optional, must be a number

Error messages appear below the fields.

Deployment (Vercel)

The project is deployed on Vercel.

Build Settings
Setting	Value
Framework	Vite
Build Command	npm run build
Output Directory	dist
Live App

https://profile-management-app-two.vercel.app

👨‍💻 Author

Akhilesh Nuthalapati
GitHub → https://github.com/akhileshnuth

Vercel → https://vercel.com/akhileshs-projects

🎉 Thank You!

This submission includes everything as per the assignment:

✔ React + TypeScript
✔ Form Validation
✔ MUI Design
✔ Redux Toolkit
✔ LocalStorage
✔ Mock API
✔ Vercel Deployment
✔ README Documentation
