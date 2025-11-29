# 📌 Profile Management Application

A fully functional Profile Management App built using **React**, **TypeScript**, **Redux Toolkit**, **React Router**, and **Material UI (MUI)**.  
This application allows users to **create, edit, view, and delete** their profile with complete form validation and persistent storage.

---

## 🚀 Tech Stack

- ⚛️ **React + TypeScript (Vite)**
- 🧰 **Redux Toolkit** for global state management
- 🧭 **React Router DOM** for page navigation
- 🎨 **Material UI (MUI)** for UI components
- 💾 **LocalStorage** for persistence
- 🧪 **Mock API (Promise-based)** simulation
- ⚙️ **Environment Variables** (`VITE_API_BASE_URL`)

---

## ✨ Features Overview

### 📝 Profile Form  
Includes:
- First Name (required, min 3 chars)
- Last Name (optional)
- Email (required & validated)
- Age (optional but numeric)

Includes **full validation**, helpful error messages, and clean UI.

---

### 📄 Profile Display
- Shows saved profile with all fields  
- If no profile exists → shows a helpful message  
- Includes **Delete Profile** option with confirmation pop-up  

---

### 🔄 Edit / Delete / Storage
✔ Edit with auto-prefill  
✔ Delete with popup confirmation  
✔ Redux global state  
✔ Persist profile in `localStorage`  
✔ Error handling for API failures  

---

## 🗂️ Project Structure

Below is the complete folder structure (placed in a single block to avoid splitting):

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
git clone https://github.com/akhileshnuth/profile-management-app
