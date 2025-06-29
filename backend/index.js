import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is required in environment variables');
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

// Modern OpenAI API client configuration
const openaiClient = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    timeout: 60000 //1 minute timeout
});

// Helper function for OpenAI API calls
const callOpenAI = async (messages, model = 'gpt-4o-mini') => {
    try {
        const response = await openaiClient.post('/chat/completions', {
            model,
            messages,
            temperature: 0.7,
            max_tokens: 10000
        });
        
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API Error:', {
            status: error.response?.status,
            message: error.response?.data?.error?.message || error.message
        });
        throw new Error(`OpenAI API call failed: ${error.response?.data?.error?.message || error.message}`);
    }
};

// Helper function to clean and parse JSON response
const parseJSONResponse = (responseText) => {
    try {
        // Remove markdown code blocks if present
        const cleanedText = responseText.replace(/```json\n?|```\n?/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error('Failed to parse JSON response:', error);
        throw new Error('Invalid JSON response from OpenAI');
    }
};

app.post('/api/generate-description', async (req, res) => {
    try {
        const { description, resume } = req.body;

        if (!description || !resume) {
            return res.status(400).json({ 
                error: 'Missing required fields: description and resume' 
            });
        }

        const prompt = `Analyze this job description: "${description}" and optimize this resume data: ${JSON.stringify(resume)} for ATS compatibility.

INSTRUCTIONS:

1. Identify key ATS keywords from the job description
for ATS, focus on:
• Technical skills & technologies
• Industry-specific terms  
• Soft skills & qualifications
• Tools & methodologies
• Certifications mentioned

2. For each resume point, create an optimized version that incorporates relevant keywords
3. Keep BOTH original and optimized versions in the response
4. Prefix optimized points with "**"
5. just try to add the keywords to the resume points, dont try too hard on other stuff

RESPONSE FORMAT (JSON only):
{
    "expArray": [
        {
            "role": "Software Developer Intern",
            "company": "Miq Digital", 
            "years": "Nov. 2020 -- Sep. 2021",
            "loc": "Bangalore, India",
            "points": [
                "Original point here",
                "** Optimized point with ATS keywords here",
                "Another original point",
                "** Another optimized point"
            ]
        }
    ],
    "projectsArray": [
        {
            "name": "Project Name",
            "tech": ["Tech1", "Tech2"],
            "years": "2024",
            "points": [
                "Original project point",
                "** Optimized project point with keywords"
            ]
        }
    ],
    "techObject": {}
}

Return only valid JSON.`;

        console.log('🔄 Generating description...');
        
        const responseText = await callOpenAI([
            { role: "user", content: prompt }
        ]);

        console.log('📝 Raw response received');
        console.log(responseText);
        const responseObject = parseJSONResponse(responseText);
        
        console.log('✅ Description generated successfully');
        
        res.json({ generatedDescription: responseObject });

    } catch (error) {
        console.error('❌ Error in /api/generate-description:', error.message);
        res.status(500).json({ 
            error: 'Failed to generate description',
            details: error.message 
        });
    }
});

app.post('/api/keywords-generator', async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ 
                error: 'Missing required field: description' 
            });
        }

        const prompt = `Extract ATS-relevant keywords from this job description: "${description}"

FOCUS ON:
• Technical skills & technologies
• Industry-specific terms  
• Soft skills & qualifications
• Tools & methodologies
• Certifications mentioned

Return keywords as a simple comma-separated list (no formatting, quotes, or special characters).`;

        console.log('🔍 Generating keywords...');
        
        const responseText = await callOpenAI([
            { role: "user", content: prompt }
        ]);

        console.log('📝 Keywords response received');
        
        // Convert the response text to an array of keywords
        const keywordsArray = responseText
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0); // Remove empty items

        console.log('✅ Keywords generated successfully');
        
        res.json({ keywords: keywordsArray });

    } catch (error) {
        console.error('❌ Error in /api/keywords-generator:', error.message);
        res.status(500).json({ 
            error: 'Failed to generate keywords',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        openaiConfigured: !!OPENAI_API_KEY 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 OpenAI API configured: ${OPENAI_API_KEY ? '✅' : '❌'}`);
});
