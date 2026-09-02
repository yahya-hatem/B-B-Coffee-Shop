# ☕ B&B Coffee Shop

A modern and responsive coffee shop web application built with **ReactJS and Vite**.

The project was developed through multiple phases, starting with reusable React components and dynamic rendering, then adding state management, custom hooks, Firebase integration, React Router, forms, and API requests.

---

## 🌐 Live Demo

https://b-b-coffee-shop.vercel.app/

---

## 📂 GitHub Repository

https://github.com/yahya-hatem/B-B-Coffee-Shop

---

## 🚀 Features

### ☕ Coffee Shop Features

- Modern and responsive coffee shop UI
- Coffee menu with prices and sizes
- Best Seller products
- Reusable Coffee Cards
- Shopping Cart
- Cart item counter
- Customer Reviews
- Star Ratings
- Feedback Form
- Founder/About section
- Responsive design for different screen sizes

### ⚛️ React Features

- Functional React Components
- Reusable Components
- Props
- React State Management
- `useState`
- `useEffect`
- Conditional Rendering
- Ternary Operator
- `&&` Operator
- Dynamic Rendering using `.map()`
- Controlled Forms
- Custom Hooks

### 🧭 React Router

The application uses **React Router DOM** for multiple pages.

Available routes:

- `/` → Home
- `/about` → About
- `/contact` → Contact
- `*` → 404 Not Found

The navigation bar allows users to move between pages without refreshing the application.

### 📝 Contact Form

The Contact page includes a complete form with:

- Full Name
- Email Address
- Password
- Phone Number
- Message

Features include:

- React state management
- Controlled inputs
- Required field validation
- Email validation
- Password validation
- Success message
- Loading state
- Error handling
- Submit without page refresh

### 🔌 Axios API

Axios is used to send form data to a test API.

API used:

`https://jsonplaceholder.typicode.com/posts`

The application handles:

- API requests
- Loading state
- Successful submission
- Request errors

### 🔥 Firebase

Firebase Firestore is used to store customer reviews.

Features include:

- Add customer reviews
- Store reviews in Firestore
- Load reviews from Firebase
- Real-time review updates
- Star ratings
- Customer feedback persistence

### 🪝 Custom Hooks

The project includes reusable custom hooks such as:

- `useForm`
- `useLocalStorage`

`useForm` manages:

- Form values
- Input changes
- Validation
- Errors
- Submission state
- Success state

`useLocalStorage` is used to persist the shopping cart in the browser.

---

## 🛠️ Technologies

### Frontend

- ReactJS
- JavaScript
- Vite
- HTML5
- CSS3

### Libraries

- React Router DOM
- Axios
- Firebase
- Bootstrap

### Development Tools

- Git
- GitHub
- Vercel
- VS Code

---

## 📁 Project Structure

```text
B-B-Coffee-Shop/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── CoffeeCard.jsx
│   │   ├── FeedbackForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Founder.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ReviewCard.jsx
│   │   └── hooks/
│   │       └── useLocalStorage.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   │
│   ├── hooks/
│   │   └── useForm.jsx
│   │
│   ├── data/
│   │   └── coffees.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── firebase.js
│
├── package.json
├── package-lock.json
└── README.md
