# Real-Time Chat Application (COMP 3133 – Lab Test – 1)

**Student Name:** Patrick Millares  
**Student ID:** 101205106  
**Course:** COMP 3133 - Full Stack Development

## 📋 Project Description
This is a real-time chat application built using the **MEAN stack (MongoDB, Express, Angular/Node)** concepts. It allows users to sign up, log in, join specific chat rooms (e.g., DevOps, Cloud Computing), and exchange messages in real-time.

All user data and chat history are persisted using **MongoDB Atlas**. The application features a modern UI built with **Tailwind CSS**, including a fully functional **Dark Mode**.

## 🚀 Features implemented
* **User Authentication:** Signup and Login with persistent sessions (localStorage).
* **Real-Time Communication:** Instant messaging using **Socket.io**.
* **Room-Based Chat:** Users can only chat with others in the same room.
* **Data Persistence:** Users and Group Messages are stored in MongoDB.
* **Typing Indicator:** Shows when another user is typing.
* **Dark Mode:** Toggleable light/dark theme using Tailwind CSS.
* **System Notifications:** Alerts when users join or leave the room.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Real-Time Engine:** Socket.io
* **Frontend:** HTML5, Tailwind CSS 

## ⚙️ Installation & Setup

1.  **Unzip the project file.**
2.  **Open the terminal** in the project directory.
3.  **Install dependencies:**
    ```bash
    npm install
    ```

## 🔗 Configuration
The application is pre-configured to connect to **MongoDB Atlas**.
* **File:** `server.js`
* **Variable:** `MONGO_URI`

*Note: The IP Access List on MongoDB Atlas has been set to `0.0.0.0/0` (Allow from Anywhere) to ensure the application runs on any machine without connection errors.*

## 🏃‍♂️ How to Run

1.  **Start the Server:**
    ```bash
    node server.js
    ```
2.  **Access the App:**
    Open your browser and navigate to:
    `http://localhost:3000/login.html`

## 🧪 Usage Guide
1.  **Sign Up:** Create a new account via the "Sign up" link.
2.  **Login:** Enter your username/password and select a **Room** (e.g., DevOps).
3.  **Chat:** Type messages and send. Open a second browser window (Incognito) to test chat between two users.
4.  **Dark Mode:** Click the 🌓 icon in the top right corner to toggle themes.
5.  **Leave:** Click "Leave Room" to log out and return to the login screen.

## 📂 Project Structure
```text
/101205106_lab_test1_chat_app
│── server.js            # Main entry point (Express + Socket.io)
│── package.json         # Dependencies
│── /models
│    ├── User.js         # Mongoose Schema for Users
│    └── GroupMessage.js # Mongoose Schema for Messages
│── /views
│    ├── signup.html     # Registration Page
│    ├── login.html      # Login Page
│    └── chat.html       # Main Chat Interface
│── /public
│    ├── /css
│    │    └── style.css  # Custom Scrollbars & Animations
│    └── /js
│         ├── theme.js   # Dark Mode Logic
│         └── chat.js    # Client-side Socket.io Logic