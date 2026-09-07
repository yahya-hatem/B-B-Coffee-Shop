# ☕ B&B Coffee Shop

A modern and responsive coffee shop web application built with **ReactJS and Vite**.

The project was developed through multiple phases, starting with React fundamentals and reusable components, then adding hooks, state management, Firebase integration, React Router, forms, API requests, Context API, and Redux Toolkit.

---

## 🌐 Live Demo

https://b-b-coffee-shop.vercel.app/

---

## 📂 GitHub Repository

https://github.com/yahya-hatem/B-B-Coffee-Shop

---

# 🚀 Features

## ☕ Coffee Shop Features

- Modern and responsive coffee shop UI
- Coffee menu with prices and sizes
- Best Seller products
- Reusable Coffee Cards
- Shopping Cart
- Cart item counter
- Add and remove products from cart
- Clear cart
- Customer Reviews
- Star Ratings
- Feedback Form
- Founder/About section
- Responsive design for different screen sizes

---

## ⚛️ React Features

- Functional React Components
- Reusable Components
- Props
- React State Management
- `useState`
- `useEffect`
- `useContext`
- Conditional Rendering
- Ternary Operator
- `&&` Operator
- Dynamic Rendering using `.map()`
- Controlled Forms
- Custom Hooks

---

# 🧭 React Router

The application uses **React Router DOM** to provide multiple pages and client-side navigation.

### Available Routes

- `/` → Home
- `/about` → About
- `/contact` → Contact
- `*` → 404 Not Found

The navigation bar allows users to move between pages without refreshing the application.

---

# 📝 Contact Form

The Contact page includes a complete form with:

- Full Name
- Email Address
- Password
- Phone Number
- Message

### Form Features

- React state management
- Controlled inputs
- Required field validation
- Email validation
- Password validation
- Success message
- Loading state
- Error handling
- Submit without page refresh

---

# 🔌 Axios API

Axios is used to send form data to a test API.

### API

`https://jsonplaceholder.typicode.com/posts`

The application handles:

- API requests
- Loading state
- Successful submission
- Request errors

---

# 🔥 Firebase

Firebase Firestore is used to store customer reviews.

### Firebase Features

- Add customer reviews
- Store reviews in Firestore
- Load reviews from Firebase
- Real-time review updates
- Star ratings
- Customer feedback persistence

---

# 🪝 Custom Hooks

The project includes reusable custom hooks.

### `useForm`

Manages:

- Form values
- Input changes
- Validation
- Errors
- Submission state
- Success state

### `useLocalStorage`

Provides reusable Local Storage functionality for browser-based data persistence.

---

# 🎨 Context API

Context API is used to manage the application's global **Theme State**.

### Theme Features

- Light Mode ☀️
- Dark Mode 🌙
- Global theme state
- Theme switching without prop drilling

The `ThemeContext` provides the theme state and theme toggle function to multiple components.

🛠️ Technologies

Frontend

* ReactJS
* JavaScript
* Vite
* HTML5
* CSS3

Libraries

* React Router DOM
* Redux Toolkit
* React Redux
* Axios
* Firebase
* Bootstrap

Development Tools

* Git
* GitHub
* Vercel
* VS Code

📁 Project Structure

### Context Structure
B-B-Coffee-Shop/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── CartPanel.jsx
│   │   ├── CoffeeCard.jsx
│   │   ├── FeedbackForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Founder.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   │
│   │   └── hooks/
│   │       └── useLocalStorage.jsx
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── themeContext.js
│   │   └── useTheme.js
│   │
│   ├── redux/
│   │   ├── store.js
│   │   │
│   │   └── slices/
│   │       └── cartSlice.js
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

🏗️ Application Architecture:
                    B&B Coffee Shop
                           │
             ┌─────────────┴─────────────┐
             │                           │
        Context API                   Redux
             │                           │
           Theme                       Cart
             │                           │
       Light / Dark              Add / Remove / Clear
             │                           │
             └─────────────┬─────────────┘
                           │
                        React App
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
       Home              About             Contact
        │                                     │
   Coffee Menu                         Contact Form
   Reviews                              Axios API
   Feedback


   📚 Project Development Phases

Phase 1 — React Fundamentals

* ReactJS fundamentals
* Components
* Props
* Conditional rendering
* Ternary Operator
* && Operator
* .map()
* Coffee menu
* Product cards
* Responsive UI

⸻

Phase 2 — Hooks and Firebase

* React Hooks
* useState
* useEffect
* Custom Hooks
* Shopping Cart
* Local Storage
* Customer Reviews
* Firebase Firestore
* Bootstrap
* Multiple styling approaches
* Responsive design

⸻

Phase 3 — Routing, Forms and APIs

* React Router DOM
* Multiple pages
* Navigation
* Contact Form
* Form validation
* Custom useForm hook
* Axios API requests
* Loading state
* Error handling
* 404 Not Found page
* Vercel deployment

⸻

Phase 4 — Context API and Redux

* Context API
* Context Provider
* useContext
* Global Theme State
* Light / Dark Mode
* Redux Toolkit
* React Redux
* Redux Store
* Redux Slice
* Redux Reducers
* useSelector
* useDispatch
* Global Shopping Cart
* Add / Remove / Clear Cart
* Separation of Context and Redux state


```text
ThemeProvider
      │
      ├── Header
      │
      ├── ThemeToggle
      │
      └── Application Components

🛒 Redux Toolkit

Redux Toolkit is used to manage the application’s global Shopping Cart State.

Redux Features

* Global shopping cart state
* Add products to cart
* Remove products from cart
* Clear cart
* Cart item count
* Redux reducers
* useSelector
* useDispatch

Redux Structure
Redux Store
     │
     └── Cart Slice
           │
           ├── addToCart
           ├── removeFromCart
           └── clearCart
