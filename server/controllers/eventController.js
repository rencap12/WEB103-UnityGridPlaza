import pool from '../config/database.js'; // Correct path

// Get all events for a specific location
export const getEventsByLocation = async (req, res) => {
    const locationId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No events found for this location' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Additional controllers (optional)
export const getEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getListEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
    }
    console.log(result);
    res.json(result.rows[0]);
} catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Internal server error' });
}
}