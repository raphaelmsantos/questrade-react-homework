import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { registerForTheLottery } from "../services/LotteryService";
import type { Lottery } from "../types";

const registerForTheLotterySchema = Yup.object({
  name: Yup.string().min(4).required(),
});

const baseBoxSx = (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
});

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
            <Box sx={baseBoxSx}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
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
                    sx={(theme) => ({
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: theme.palette.primary.main },
                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                        },
                        '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                        '& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
                        '& .MuiOutlinedInput-input': { color: theme.palette.primary.main },
                    })}
                    error={Boolean(formik.errors.name && formik.touched.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />                
                <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    fullWidth
                    sx={{ backgroundColor: 'primary.main', color: 'text.primary', '&:hover': { backgroundColor: 'primary.main' } }}
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