import React, { useState } from 'react';
import { LotteryCard } from './LotteryCard';
import type { Lottery } from '../types';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

interface LotteryListProps {
    lotteries: Lottery[];
    selectedIds?: string[];
    onSelect: (id: string) => void;
}

const LotteryList: React.FC<LotteryListProps> = ({ lotteries, selectedIds = null, onSelect }) => {
    const [filter, setFilter] = useState('');
    const filteredLotteries = lotteries.filter((lottery) =>
        lottery.name.toLowerCase().includes(filter.toLowerCase()) ||
        lottery.prize.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                    <Box component="h2" sx={{ color: 'primary.main', fontWeight: 700, margin: 0 }}>Available Lotteries</Box>
                </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <TextField
                    value={filter}
                    onChange={(e) => setFilter(e.currentTarget.value)}
                    placeholder="Filter lotteries"
                    sx={{
                        width: 400,
                        borderRadius: 1,
                        backgroundColor: 'background.paper',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: (theme: any) => theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: (theme: any) => theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: (theme: any) => theme.palette.primary.main }
                        },
                        '& .MuiInputBase-input': { color: 'primary.main' },
                        '& .MuiInputBase-input::placeholder': { color: 'primary.main', opacity: 0.7 },
                        '& .MuiSvgIcon-root': { color: 'primary.main' }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {filteredLotteries.length === 0 && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <Box sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        No search results for "{filter}"
                    </Box>
                </Box>
            )}
        </Box>
        
        <Box 
            className="lottery-list"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}
        >
                {filteredLotteries.map((lottery) => (
                    <LotteryCard
                        key={lottery.id}
                        lottery={lottery}
                        selected={selectedIds?.includes(lottery.id)}
                        onSelect={() => onSelect(lottery.id)} />
                ))}
        </Box>
        </>
    );
};

export default LotteryList;