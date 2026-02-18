import React from 'react';
import type { Lottery } from '../types';
import { useTheme } from '@mui/material/styles';

interface LotteryCardProps {
    lottery: Lottery;
    selected?: boolean;
    onSelect?: () => void;
}

export const LotteryCard: React.FC<LotteryCardProps> = ({ lottery, selected = false, onSelect }) => {
    const theme = useTheme();
    const baseClasses = 'rounded-lg p-4 shadow-md';
    const cardStyle: React.CSSProperties = {
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block',
        width: '200px',
        height: '180px',
        boxSizing: 'border-box',
        border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        marginBottom: 16,
    };

    const titleStyle: React.CSSProperties = { color: theme.palette.text.primary, fontWeight: 700, fontSize: 18 };
    const prizeStyle: React.CSSProperties = { color: theme.palette.text.secondary, marginTop: 8, fontSize: 14 };

    return (
        <div role="button" onClick={onSelect} className={baseClasses} style={cardStyle}>
            <h2 style={titleStyle}>{lottery.name}</h2>
            <p style={prizeStyle}>Prize: {lottery.prize}</p>
        </div>
    );
};