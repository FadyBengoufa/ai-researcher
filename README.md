# AI Research Explorer - By Fady Ayoub Bengoufa

## Live Demo

https://airesearcherdev.netlify.app

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see .env.example)
4. Start development server: `npm run dev`

## API Configuration
- AI Provider: Cohere API (v2 Chat API)
- Create Account: Visit [dashboard.cohere.ai](http://dashboard.cohere.ai)
- API Key Setup:
  1. Sign up for a Cohere account
  2. Navigate to API Keys section
  3. Generate a new API key
  4. Add it to your `.env` file as `VITE_COHERE_API_KEY`
- Model Used: `command-a-03-2025` (modern chat-optimized model)

## Features Implemented
- [x] Mock research paper search with filters
  - Real-time search across titles
  - Advanced filtering by topics, years, authors, and paper types

- [x] AI-powered paper analysis
  - Paper summarization with Cohere API
  - Key topics extraction
  - Comparative analysis of multiple papers
  - Research trend insights

- [x] AI-powered chatbot
  - Floating chat window interface
  - Context-aware conversations about selected papers
  - Message history with timestamps
  - Copy and delete message functionality
  - Clear the conversation

## Features Not Yet Implemented
- Search history/recent queries (localStorage)
- View toggle works smoothly between grid/list
- Sorting feature
- Additional bonus features (data visualizations, etc.)

## Mock Data
- **Dataset Size**: 10 research papers across 4 main topics
- **Data Generation**: Manually created realistic academic paper data
- **Topics Covered**:
  - AI/ML (NLP, Transformer Networks, Computer Vision)
  - Climate Change and Sustainability
  - Blockchain and Financial Technology
  - Quantum Computing and Advanced Technologies

## Technical Decisions
- **State Management**:
  - Used React Context API for global state management
  - SearchContext for search results, filters, and selected papers
  - AIContext for AI analysis results
  - ChatContext for chat messages and window state

- **UI Library**: 
  - Material-UI with custom theming
  - Responsive grid system for mobile-friendly layout

- **AI API**: Cohere v2 Chat API, Chosen for generous free tier and excellent documentation

- **Custom Hooks**:
  - `useSearch`: Manages search and filtering logic
  - `useAI`: Handles all Cohere API interactions
  - `useChat`: Manages chat conversation state and messaging
  - `useDebounce`: Debounces the search query to prevent excessive API calls

- **Component Architecture**:
  - `components/`: Reusable UI components (SearchBar, PaperCard, etc.)
  - `pages/`: Page-level components (SearchPage)
  - `contexts/`: React Context providers
  - `hooks/`: Custom React hooks
  - `utils/`: Helper functions and mock data

- **Mock Data Strategy**: Created realistic academic papers with varied:
  - Titles and abstracts that sound like real research
  - Diverse author names and institutions
  - Realistic publication years and venues
  - Meaningful topic tags and citation counts

- **TypeScript Usage**: Strict typing throughout the application
  - Interfaces for all data structures (Paper, AIAnalysis, ChatMessage)
  - Type-safe API calls and context consumption
- **Performance Optimization**: [Any optimizations implemented]


## Time Breakdown
- Setup & Planning: 2 hours
- UI Development: 3 hours
- API Integration: 2 hours
- Testing & Polish: 2 hours
- Documenting & Improving responsivity: 2 hours

- **Total**: Around 12 hours

## Challenges & Solutions
The main challenges I faced are : 
- Typing correctly my states and interfaces so that Typescript stops yelling in my code editor.
- Implementing React Context correctly
- Responsivity and building a user friendly app without having a design just through intuition and based from what I seen before


## Future Improvements

- Implementing the features I haven't finished yet
- Use an Academic APIs for Real Research Papers
- Optimize the application by profiling the slow components and monitoring the memory tab
- Refactor the code using Enums for example