import express from 'express';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/gemini', protect, async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ error: 'Chat service unavailable' });
    }

    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an agricultural expert assistant for KrishiAi. You provide practical, actionable farming advice to Indian farmers. Be concise, helpful, and focus on sustainable farming practices. Provide specific recommendations for crops, soil, pests, weather, and market information. Keep responses under 300 words and use simple language.\n\nUser question: ${prompt}`
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: `Gemini API error: ${errorText}` });
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const text = data.candidates[0].content.parts[0].text;
            return res.json({ content: text });
        }
        return res.status(500).json({ error: 'Invalid response from Gemini API' });
    } catch (error) {
        return res.status(500).json({ error: 'Chat service error' });
    }
});

export default router;
