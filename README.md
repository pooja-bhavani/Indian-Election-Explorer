# Indian Election Explorer

Welcome to the **Indian Election Explorer**! This project is an interactive, intelligent guide designed to help users understand the world's largest democratic exercise—the Indian Election process.

<img width="1024" height="900" alt="image" src="https://github.com/user-attachments/assets/6601fb33-9747-4387-8677-26ab6e4c628d" />

## 🏆 The Challenge

The challenge was to develop an interactive, user-friendly election guidance assistant and deploy it on Google Cloud Platform. The goal was to transform a legacy structure into a world-class, premium web application with a modern design using Tailwind CSS and Framer Motion. 

Key objectives included:
- Clarifying election processes and timelines through a guided, step-by-step experience.
- Implementing advanced interactive features such as gamification and simulations.
- Maintaining a professional, intuitive, and "official" UI/UX aesthetic that ensures high engagement and ease of use.
- Integrating an AI-powered assistant to provide context-aware help to users.

## 🚀 What We Built

To meet the challenge, we built a comprehensive, responsive React application with a robust Node.js/Express backend. 

### Key Features:
- **Interactive Timeline**: A step-by-step visual guide detailing the stages of the Indian election process, from the initial notification to the counting of votes.
- **Smart Flashcards**: A learning tool designed to help users memorize important election terminology (like EVM, VVPAT, NOTA) with ease.
- **Gamified Quiz System**: Test your knowledge of election facts with an engaging quiz component.
- **Election Simulation Engine**: Step into the shoes of a campaign manager and balance high-reach methods with high-conversion strategies to manage your budget and win elections.
- **AI-Powered Context-Aware Assistant**: A floating chat interface that provides instant, contextual answers based on the section of the app you are currently exploring.

### Technology Stack:
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Tools**: Concurrently (to run both client and server seamlessly)

## 🛠️ How to Run the App Locally

Follow these step-by-step instructions to get the application up and running on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Step 1: Navigate to the Project Directory
Open your terminal and navigate to the root directory of the project:
```bash
cd elec
```

### Step 2: Install Dependencies
Run the following command to install all required frontend and backend dependencies:
```bash
npm install
```

### Step 3: Start the Development Servers
The project is configured to run both the Vite development server (frontend) and the Express server (backend) concurrently. Start them by running:
```bash
npm run dev
```

### Step 4: Open the App
Once the servers start successfully, the terminal will display a local URL (usually `http://localhost:5173`). Open this URL in your web browser to interact with the Indian Election Explorer!

*Note: The backend API runs on port 8080 by default.*
