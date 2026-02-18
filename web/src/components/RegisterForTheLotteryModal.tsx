import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { registerForTheLottery } from "../services/LotteryService";
import type { Lottery } from "../types";

const registerForTheLotterySchema = Yup.object({
  name: Yup.string().min(4).required(),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    border: '2px solid #2798F5',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    lotteries: Lottery[];
}

export default function RegisterForTheLotteryModal({ open, onClose, onSubmit, lotteries }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
     validationSchema: registerForTheLotterySchema,
     initialValues: {
       name: '',
     },     
      onSubmit: async (values) => {
          setLoading(true);
          Promise.all(lotteries.map((lottery) => registerForTheLottery(lottery.id, formik.values.name)))          
          setLoading(false);
          onSubmit();
      },
   });  

    function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown"): void {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            onClose();
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#2798F5', fontWeight: 700 }}>
                    Register for the lotteries
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#2798F5' },
                            '&:hover fieldset': { borderColor: '#2798F5' },
                            '&.Mui-focused fieldset': { borderColor: '#2798F5' },
                        },
                        '& .MuiInputLabel-root': { color: '#2798F5' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#2798F5' },
                        '& .MuiOutlinedInput-input': { color: '#2798F5  ' },
                    }}
                    error={Boolean(formik.errors.name && formik.touched.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />                
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    fullWidth
                    sx={{ backgroundColor: '#2798F5', color: '#000', '&:hover': { backgroundColor: '#cfef00' } }}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
                </form>
                {error && (
                    <Typography sx={{ color: 'red', mt: 1 }}>{error}</Typography>
                )}
            </Box>
        </Modal>
    );
}