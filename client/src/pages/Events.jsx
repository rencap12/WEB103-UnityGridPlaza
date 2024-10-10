import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../services/eventsAPI.jsx'; // Adjust the path as necessary
import Event from '../components/Event.jsx'; // Adjust the path as necessary

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/api/events`);
                if (!response.ok) {
                    console.log('rip');
                }
                const eventsData = await response.json();
    
                console.log(eventsData);
                // Ensure the data is an array before setting it
                if (Array.isArray(eventsData)) {
                    setEvents(eventsData);
                    setLoading(false);
                } else {
                    console.error('Unexpected response format, expected an array');
                    setEvents([]); // Set to empty array to avoid map errors
                }  
            } catch (err) {
                setError('Failed to fetch events');
                setLoading(false);
                console.error(err);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Events</h1>
            <div className="events-list">
                {events.map((event) => (
                    <Event
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    image={event.pic}
                    desc={event.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Events;
