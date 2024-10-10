import express from 'express';
import { getAllLocations, getLocationById } from '../controllers/locationsControllers.js'; // Correct path

const router = express.Router();

// Define routes
router.get('/', getAllLocations);
router.get('/:id', getLocationById);

export default router;
