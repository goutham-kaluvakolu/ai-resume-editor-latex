# AI Resume Editor Backend

A Node.js backend service that integrates with OpenAI API to generate resume descriptions and keywords.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the backend directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

3. **Get OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an account or sign in
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key to your `.env` file

4. **Run the server:**
   ```bash
   npm start
   ```

## API Endpoints

### POST `/api/generate-description`
Generates optimized resume descriptions based on job requirements.

**Request Body:**
```json
{
  "description": "Job description text",
  "resume": {
    "expArray": [...],
    "projectsArray": [...],
    "techObject": {...}
  }
}
```

### POST `/api/keywords-generator`
Extracts relevant keywords from job descriptions for ATS optimization.

**Request Body:**
```json
{
  "description": "Job description text"
}
```

### GET `/api/health`
Health check endpoint to verify server status and OpenAI configuration.

## Features

- ✅ Modern OpenAI API integration with proper error handling
- ✅ Environment variable validation
- ✅ Request validation and sanitization
- ✅ Comprehensive error responses
- ✅ Health check endpoint
- ✅ Timeout protection (30 seconds)
- ✅ JSON response parsing with fallback handling

## Error Handling

The API returns structured error responses:
```json
{
  "error": "Error description",
  "details": "Detailed error message"
}
```

## Development

- Uses ES6 modules
- Axios for HTTP requests
- Express.js for routing
- CORS enabled for frontend integration
- Body parser for JSON handling 