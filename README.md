# LLM Translation App

A simple Node.js application that uses Google's Gemini AI model for text translation.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Google API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 3. Create Environment File
Create a `.env` file in the root directory with your API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
```

### 4. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

## Usage

### Web Interface
1. Open your browser and go to `http://localhost:3000`
2. Enter text to translate
3. Select target language
4. Click "Translate" or "Test LLM"

### API Endpoints

#### Test LLM
```bash
GET http://localhost:3000/test
```

#### Translate Text
```bash
POST http://localhost:3000/translate
Content-Type: application/json

{
  "text": "Hello, how are you?",
  "targetLanguage": "Italian"
}
```

## Troubleshooting

### Common Issues

1. **"GOOGLE_API_KEY is not set"**
   - Make sure you have created a `.env` file
   - Ensure the API key is correctly copied from Google AI Studio

2. **"Failed to process translation"**
   - Check if your API key is valid
   - Ensure you have sufficient quota/credits in your Google AI Studio account

3. **"Network error"**
   - Make sure the server is running on port 3000
   - Check if there are any firewall issues

4. **"Model not found"**
   - The app uses "gemini-2.0-flash" model
   - Ensure this model is available in your region

## File Structure

- `app.js` - Main Express application with LLM routes
- `server.js` - Server startup file
- `public/index.html` - Web interface for testing
- `package.json` - Dependencies and scripts

## Dependencies

- `express` - Web framework
- `@langchain/google-genai` - Google AI integration
- `@langchain/core` - LangChain core functionality
- `dotenv` - Environment variable management
- `@langchain/core/prompts` - Build prompt templates"# LLM-From-Scratch" 
