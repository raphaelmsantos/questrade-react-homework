import { Box, Fab, Typography, Button, BottomNavigation, Paper, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import AddLotteryModal from './components/AddLotteryModal';
import LotteryList from './components/LotteryList';
import { Add, AppRegistration } from '@mui/icons-material';
import RegisterForTheLotteryModal from './components/RegisterForTheLotteryModal';
import useLotteries from './hooks/useLotteries';

function App() {
  const [addLotteryModalOpen, setAddLotteryModalOpen] = useState(false);
  const [registerForTheLotteryModalOpen, setRegisterForTheLotteryModalOpen] = useState(false);
  const { lotteries, loading, refreshLotteries } = useLotteries();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  

  const handleSelect = (lotteryId: string) => {
    setSelectedIds((ids) => {
      if (ids.includes(lotteryId)) {
        const index = ids.indexOf(lotteryId);
        return [...ids.slice(0, index), ...ids.slice(index + 1)];
      } else {
        return [...ids, lotteryId];
      }
    });
  };

    return (
    <div style={{ paddingTop: 72 }}>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
          zIndex: 1300,
        }}
      >
        <Typography variant="h6" sx={{ color: '#2798F5', fontWeight: 700 }}>
          Lotteries
        </Typography>        
        
      </Box>

      <Box sx={{ px: 2, width: '100%', maxWidth: 1200, mx: 'auto' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <LotteryList lotteries={lotteries} selectedIds={selectedIds} onSelect={handleSelect} />
        )}
      </Box>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
        <Fab variant="extended" size="medium" sx={{ backgroundColor: '#2798F5', color: '#000', '&:hover': { backgroundColor: '#1A6FB3' } }} onClick={() => setRegisterForTheLotteryModalOpen(true)} disabled={selectedIds.length === 0}>
          <AppRegistration sx={{ mr: 1 }} />
          Register for the Lottery
        </Fab>
        <Fab variant="extended" size="small" sx={{ backgroundColor: '#2798F5', color: '#000', '&:hover': { backgroundColor: '#1A6FB3' } }} onClick={() => setAddLotteryModalOpen(true)}>
          <Add sx={{ mr: 1 }} />
          Add Lottery
        </Fab>
      </Box>
      <AddLotteryModal
        open={addLotteryModalOpen}
        onClose={() => setAddLotteryModalOpen(false)}
        onSubmit={() => {
          // Refresh the lottery list after adding a new lottery
          refreshLotteries();
          setAddLotteryModalOpen(false);
        }}
      />
      {selectedIds.length > 0 && (
        <RegisterForTheLotteryModal
          open={registerForTheLotteryModalOpen}
          onClose={() => setRegisterForTheLotteryModalOpen(false)}
          lotteries={lotteries.filter((lottery) => selectedIds.includes(lottery.id))}
          onSubmit={() => {
            // handle submit logic here
            setRegisterForTheLotteryModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;