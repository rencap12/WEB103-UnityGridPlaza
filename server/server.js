import express from 'express';
import cors from 'cors';  // Import cors
import path from 'path';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import pool from './config/database.js'; // Your database connection
import eventsRouter from './routes/eventsRoutes.js';
import locationsRouter from './routes/locationsRoutes.js'; // Location routes

// Load environment variables
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());  // Enable CORS for all requests
app.use('/api/events', eventsRouter);   // Route for events
app.use('/api/locations', locationsRouter); // Route for locations

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')));
} else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')));
    app.use(express.static('public'));
}

// Test database connection endpoint
app.get('/api-test', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.status(200).json({ message: 'Connected to DB!', time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Catch-all route for production to serve frontend
if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    );
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
