import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import '../css/LocationEvents.css';

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/events/location/${index}`);  // Use full backend URL
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    fetchEvents();
    }, [index]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/locations/${index}`);  // Use full backend URL
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setLocation(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
    
        fetchLocation();
        }, [index]);


  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.pic} alt={location.name} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
      </header>

      <main>
        {events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.pic}
              desc={event.description}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
            {'No events scheduled at this location yet!'}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
