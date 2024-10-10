import express from 'express';
import { getEventsByLocation, getEventById, getListEvents } from '../controllers/eventController.js'; // Correct path

const router = express.Router();

// Define routes
router.get('/location/:id', getEventsByLocation); // Events by location
router.get('/:id', getEventById); // (Optional) Event by ID
router.get('/', getListEvents);

export default router;
