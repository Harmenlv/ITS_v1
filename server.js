// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const HUGGINGFACE_CONVERSATIONAL_API_KEY = 'YOUR_HUGGINGFACE_CONVERSATIONAL_API_KEY';

app.post('/generate-conversation', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
            inputs: prompt,
            parameters: {
                max_length: 50 // Adjust according to your needs
            }
        }, {
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_CONVERSATIONAL_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const generatedConversation = response.data[0].generated_text.trim();
        res.json({ generatedConversation });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

