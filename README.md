# 🚢 Cruise Travel Assistant

Welcome to **AI KB Assistant**, your friendly mini knowledge-base assistant for cruise travel! 🌊🛳️  

This project lets you ask questions about cruises and destinations. Answers come straight from curated ShermansTravel pages, with related citations, and everything is powered by OpenAI, Pinecone, and Supabase.  

The app includes a **backend API** and a **frontend web UI**, fully deployable on Railway.

## 🚀 Features

- Mobile-friendly **chat interface**  
- Answers questions **strictly from curated cruise content**  
- Clean, modern **UI/UX** with React + TailwindCSS  
- Fully deployable **backend + frontend** on Railway  


## ⚡ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Lucide icons  
- **Backend:** Node.js, Express, Axios, OpenAI, Pinecone, Supabase  
- **Database / Vector Search:** Supabase & Pinecone  
- **Deployment:** Railway (Free Tier)  

## 🔗 Live URLs

Backend API: https://ai-assistant-api-jaira.up.railway.app

Frontend UI: https://ai-assistant-jaira.up.railway.app

---
## 📂 Project Structure

Here's an overview of the main folders and files in this project:
<pre>
ai-kb-assistant/
├── backend/               # Node.js backend
│   ├── routes/            # API route handlers
│   │   ├── chat.js        # Handles /chat endpoint logic
│   │   ├── scrape.js      # Handles /scrape endpoint logic
│   │   └── history.js     # Handles /history endpoint logic
│   ├── index.js           # Entry point of the backend server
│   └── package.json       # Backend dependencies & scripts
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components (ChatMessages, ChatInput, Header, Loader, etc.)
│   │   ├── pages/         # Pages (like ChatPage)
│   │   ├── App.jsx        # Root React component
│   │   └── main.jsx       # Frontend entry point
│   ├── public/            # Static assets (favicon, screenshots)
│   └── package.json       # Frontend dependencies & scripts
│
└── scraper/               # Utilities for web scraping
</pre>

**Key Notes:**
- **backend/routes:** Handles API logic for scraping, chatting with AI, and storing history.  
- **frontend/src/components:** Contains reusable React components like `Header`, `ChatInput`, `ChatMessages`, and `Loader`.  
- **scraper/** contains helper scripts for gathering data from websites.  
___

## RAG Architecture (How the AI Works)

This project uses **Retrieval-Augmented Generation (RAG)** to provide accurate, source-backed cruise travel answers.

### 1. Scrape & Chunk
- Python scraper collects cruise pages and splits them into small chunks for easier processing.

### 2. Embeddings & Pinecone
- Each chunk is converted into a **vector embedding** and stored in **Pinecone**, a vector database for fast similarity search.

### 3. Parent-Aware Context
- Chunks from the same page are grouped by their URL.  
- This helps the AI provide **cohesive answers** without repeating content, while keeping source citations.

### 4. Query & Response
- User questions retrieve relevant chunks from Pinecone.  
- Context plus recent conversation history is sent to OpenAI, generating a **concise, friendly answer**.

### 5. Conversation Memory
- Page reload starts a **fresh conversation**, but all chats are logged in Supabase for `/history`.

---
## API Endpoints

The backend provides the following endpoints for interacting with the Cruise Travel Assistant:

### 1. `/scrape`  
**Method:** `POST`  
**Description:** Scrapes the predefined URLs, splits the content into chunks, generates embeddings, and upserts them into Pinecone.  
**Response Example:**
```json
{
  "success": true,
  "inserted": 120
}
```
### 2. `/chat`  
**Method:** `POST`  
**Description:** Send a user query to the assistant. Retrieves relevant context from Pinecone using RAG, generates an answer using OpenAI, and logs the conversation in Supabase.
**Request Body:**
```json
{
  "query": "What cruises are available in Alaska?",
}
```
### 2. `/history`  
**Method:** `GET`  
**Description:** Retrieves the last 50 chats stored in Supabase.
**Response Example:**
```json
[
  {
    "id": "5cdb16eb-27d1-4c8f-88de-084a0a8f059d",
    "question": "hi",
    "answer": "Oh! I don’t have that information right now, but I’d love to help if I find it!",
    "sources": [
      "https://www.shermanstravel.com/cruise-destinations/alaska-itineraries"
    ],
    "created_at": "2025-11-25T15:03:43.482004"
  }
]
```

---
## 🎬 Quick Start

Follow these steps to see Cruise Travel Assistant in action:

### 1. Clone the Repo
```bash
git clone https://github.com/jairamarimon/ai-kb-assistant.git
cd ai-kb-assistant
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env   # Add your API keys (OpenAI, Pinecone, Supabase)
npm run dev            # Start backend in dev mode
```

### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev            # Start frontend in dev mode
```

### 4. Access the UI
Open your browser at http://localhost:5173
