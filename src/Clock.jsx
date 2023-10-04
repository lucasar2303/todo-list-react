import React, { useState, useEffect } from 'react';
import './Clock.css'

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 60000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'});
    }

    return (
        <div className="clock-container">
            <h1 className="clock-time">{formatTime(time)}</h1>
            <h2 className="clock-date">{formatDate(time)}</h2>
        </div>
    );
    
}

export default Clock;
