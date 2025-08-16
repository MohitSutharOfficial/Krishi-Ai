import express from 'express';
import GovtScheme from '../models/GovtScheme.model.js';

const router = express.Router();

// GET /api/schemes — all active schemes
router.get('/', async (req, res) => {
    try {
        const schemes = await GovtScheme.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(schemes);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/schemes/:id — single scheme by ID
router.get('/:id', async (req, res) => {
    try {
        const scheme = await GovtScheme.findById(req.params.id);
        if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
        res.status(200).json(scheme);
    } catch (error) {
        console.error('Error fetching scheme:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
