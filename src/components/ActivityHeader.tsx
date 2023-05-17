import React from 'react';
import './ActivityHeader.css';

export default function ActivityHeader({name, date}: { name: string, date: string }) {
    return (
        <div className="ActivityHeader">
            <span>{name}</span>
            <span className="ActivityHeaderDate">{new Intl.DateTimeFormat('fr-FR').format(Date.parse(date))}</span>
        </div>
    );
}