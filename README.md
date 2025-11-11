# React User Account Management App

This is a simple React (v16+) application built for a technical test. It allows users to create, manage, and log into their accounts. The application uses `localStorage` to simulate a persistent database for demonstration purposes.

## ✨ Features

* User registration with name, email, and password.
* User login with email and password.
* A protected profile page where users can view and edit their account information.
* Persistent login state using `localStorage`.
* Client-side validation and error handling.

## 💻 Tech Stack

* **React (v18):** Core UI library (using Hooks and functional components).
* **React Router (v6):** For client-side routing and page navigation.
* **React Context API:** For global state management (authentication).
* **React Bootstrap & Bootstrap:** For styling and UI components.
* **LocalStorage:** To simulate a user database and session persistence.

## 🚀 How to Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ansari-aka/Account_Management.git
    cd Account_Management
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm start
    ```
    The application will open and run on `http://localhost:5173`.

## Important Note: Data Persistence

This application uses **`localStorage`** to store user data (including passwords in plain text) and manage sessions.

## Images 

![alt text](<Screenshot (1046).png>)

## Preview Link

[live app]()