import React, { useState, useEffect } from 'react';
import '../css/Event.css';

const Event = (props) => {
    const [event, setEvent] = useState([]);
    const [time, setTime] = useState('');
    const [remaining, setRemaining] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/events/location/${props.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await response.json();
                setEvent(eventData); // Set the event data
                console.log(eventData); // Log the parsed data
            } catch (error) {
                console.error(error);
            }
        })();
    }, [props.id]);

    useEffect(() => {
        // Ensure props.date is a valid date string
        const eventDate = new Date(props.date);

        if (!isNaN(eventDate)) {
            // Format time using JavaScript's toLocaleTimeString
            const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTime(formattedTime);

            console.log('Formatted time:', formattedTime);
        } else {
            console.error('Invalid date:', props.date);
        }
    }, [props.date]);

    // useEffect(() => {
    //     const eventDate = new Date(props.date);
    //     const now = new Date();

    //     if (!isNaN(eventDate)) {
    //         // Calculate the remaining time in a human-readable format
    //         const timeDifference = eventDate - now;
    //         const remainingTime = timeDifference > 0 ? formatRemainingTime(timeDifference) : 'Event passed';

    //         setRemaining(remainingTime);
    //         console.log('Remaining time:', remainingTime);
    //     } else {
    //         console.error('Invalid date for remaining time:', props.date);
    //     }
    // }, [props.date]);

    // Helper function to format remaining time (in milliseconds) to a human-readable string
    const formatRemainingTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day(s) remaining`;
        } else if (hours > 0) {
            return `${hours} hour(s) remaining`;
        } else if (minutes > 0) {
            return `${minutes} minute(s) remaining`;
        } else {
            return `${seconds} second(s) remaining`;
        }
    };

    return (
        <article className='event-information'>
            <img src={props.image} alt="Event" />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {new Date(props.date).toLocaleDateString()} <br /> {props.desc}</p>
                    <p id={`time-${props.id}`}>{time}</p>
                    <p id={`remaining-${props.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    );
};

export default Event;
