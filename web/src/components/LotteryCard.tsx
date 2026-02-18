import React from 'react';
import type { Lottery } from '../types';

interface LotteryCardProps {
    lottery: Lottery;
    selected?: boolean;
    onSelect?: () => void;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ lottery, selected = false, onSelect }) => {
    const baseClasses = 'rounded-lg p-4 shadow-md';
    const cardStyle: React.CSSProperties = {
        backgroundColor: '#000000',
        display: 'inline-block',
        width: '200px',
        height: '180px',
        boxSizing: 'border-box',
        border: selected ? '2px solid #2798F5' : '2px solid transparent',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        marginBottom: 16,
    };

    const titleStyle: React.CSSProperties = { color: '#ffffff', fontWeight: 700, fontSize: 18 };
    const prizeStyle: React.CSSProperties = { color: '#d1d5db', marginTop: 8, fontSize: 14 };

    return (
        <div role="button" onClick={onSelect} className={baseClasses} style={cardStyle}>
            <h2 style={titleStyle}>{lottery.name}</h2>
            <p style={prizeStyle}>Prize: {lottery.prize}</p>
        </div>
    );
};