import pool from '../config/database.js'; // Correct path

// Get all locations
export const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific location by ID
export const getLocationById = async (req, res) => {
    const locationId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching location:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
